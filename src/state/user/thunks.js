import { userActions } from '.';
import { userHistoryUpdateGateway } from '../../gateways/history';
import { fetchUsersGateway } from '../../gateways/user';
import { MAX_USER_CACHE, RESET_USER_CACHE, USER_PREFERENCE_TYPES, USER_PREFETCH_LIMIT } from '../../shared/constants';
import { openErrorMessage, openSuccessMessage } from '../../shared/message';
import { openAlertNoti } from '../../shared/notification';
import { historyActions } from '../history';

function shouldFetchNewUsers(userState) {
  const { watchedIndex, data, totalUsersFetched } = userState;

  const fetchedDataLength = data.length;

  return fetchedDataLength + totalUsersFetched - watchedIndex <= USER_PREFETCH_LIMIT;
}

export const advanceNextUser = (userPreferenceData) => async (dispatch, getState) => {
  try {
    let appState = getState();
    let userState = appState.user;

    if (userState.isLoading) {
      return;
    }

    const { page, limit } = userState.pagination;

    if (userPreferenceData) {
      const { preferenceType } = userPreferenceData;

      await userHistoryUpdateGateway({ preferenceType, user: userState.currentUser });

      switch (userPreferenceData.preferenceType) {
        case USER_PREFERENCE_TYPES.LIKE:
          dispatch(historyActions.pushLiked({ user: userState.currentUser }));
          openSuccessMessage('What an awesome profile!');
          break;
        case USER_PREFERENCE_TYPES.PASS:
          dispatch(historyActions.pushPassed({ user: userState.currentUser }));
          openErrorMessage('Not my type');
          break;
        default:
          throw new Error('User preference type not defined');
      }
    }

    if (shouldFetchNewUsers(userState) && page === 0) {
      // Since it's first page, we'll wait
      await fetchNextUserPage({ limit, page })(dispatch, getState);

      appState = getState();
      userState = appState.user;
    }

    const currentUserIndex = userState.watchedIndex - userState.totalUsersFetched + 1;
    const currentUser = userState.data[currentUserIndex];

    if (!currentUser) {
      throw new Error(`Can't not find next user for index: ${currentUserIndex}`);
    }

    dispatch(userActions.advanceNextUser({ currentUser }));

    // Fetch next page in background
    if (shouldFetchNewUsers(userState) && page > 0) {
      fetchNextUserPage({ limit, page })(dispatch, getState);
    }
  } catch (error) {
    openAlertNoti(`An error occurred: ${error.message}`);
  } finally {
    dispatch(userActions.updateLoading({ isLoading: false }));
  }
}

export const fetchNextUserPage = ({ limit, page }) => async (dispatch, getState) => {
  const appState = getState();
  const userState = appState.user;
  const currentUsers = userState.data;

  try {
    dispatch(userActions.updateLoading({ isLoading: true }));
    const newUsers = await fetchUsersGateway({ limit, page });

    const aggregatedUserData = currentUsers.concat(newUsers);

    const isUserCacheLimitPassed = aggregatedUserData.length && aggregatedUserData.length > MAX_USER_CACHE;

    if (isUserCacheLimitPassed) {
      const aggregatedUserLength = aggregatedUserData.length;
      const startIndexToSlice = aggregatedUserLength - RESET_USER_CACHE;

      dispatch(userActions.fetchUsers({
        data: aggregatedUserData.slice(startIndexToSlice, aggregatedUserData.length),
        pagination: {
          limit,
          page: page + 1,
        },
      }));
      dispatch(userActions.updateTotalUsersFetched({ skippedUsersCount: startIndexToSlice }));

      return;
    }

    dispatch(userActions.fetchUsers({
      data: aggregatedUserData,
      pagination: {
        limit,
        page: page + 1,
      },
    }));
  } catch (error) {
    openAlertNoti(`An error occurred: ${error.message}`);
  } finally {
    dispatch(userActions.updateLoading({ isLoading: false }));
  }
}

