import { message } from 'antd';
import { userActions } from '.';
import { fetchUsersGateway, userPreferenceUpdateGateway, fetchUserByIdGateway } from '../../gateways/user';
import { MAX_USER_CACHE, RESET_USER_CACHE, USER_PREFERENCE_TYPES, USER_PREFETCH_LIMIT } from '../../shared/constants';
import { openAlertNoti } from '../../shared/notification';

function shouldFetchNewUsers(userState) {
  const { watchedIndex, data, totalUsersFetched } = userState;

  const fetchedDataLength = data.length;

  return fetchedDataLength + totalUsersFetched - watchedIndex <= USER_PREFETCH_LIMIT;
}

export const advanceNextUser = (userPreferenceData) => async (dispatch, getState) => {
  try {
    let appState = getState();
    let userState = appState.user;

    // dispatch(userActions.updateLoading({ isLoading: true }));

    if (userPreferenceData) {
      await userPreferenceUpdateGateway(userPreferenceData);

      switch (userPreferenceData.preferenceType) {
        case USER_PREFERENCE_TYPES.LIKE:
          message.success('What an awesome profile!');
          break;
        case USER_PREFERENCE_TYPES.PASS:
          message.error('Not my type');
          break;
        default:
          throw new Error('User preference type not defined');
      }
    }

    if (shouldFetchNewUsers(userState)) {
      const { page, limit } = userState.pagination;

      if (page > 0) {
        // It's not first page so don't wait.
        fetchNextUserPage({ limit, page })(dispatch, getState);
      } else {
        // Since it's first page, we'll wait
        await fetchNextUserPage({ limit, page })(dispatch, getState);
    
        appState = getState();
        userState = appState.user;
      }
    }

    const nextWatchedIndex = userState.watchedIndex - userState.totalUsersFetched + 1;

    const nextUser = userState.data[nextWatchedIndex];

    if (!nextUser) {
      throw new Error(`Can't not find next user for index: ${nextWatchedIndex}`);
    }

    const nextUserDetail = await fetchUserByIdGateway(nextUser.id);

    dispatch(userActions.advanceNextUser({ currentUser: nextUserDetail }));
  } catch (error) {
    openAlertNoti(`An error occurred: ${error.message}`);
  } 
  // finally {
  //   dispatch(userActions.updateLoading({ isLoading: false }));
  // }
}

export const fetchNextUserPage = ({ limit, page }) => async (dispatch, getState) => {
  const appState = getState();
  const userState = appState.user;
  const currentUsers = userState.data;

  try {
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
    openAlertNoti('An error occurred');
    console.log(error);
  }
}

