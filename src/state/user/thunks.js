import { userActions } from '.';
import { fetchUsersGateway, userPreferenceUpdateGateway, fetchUserByIdGateway } from '../../gateways/user';
import { MAX_USER_CACHE, USER_PREFETCH_LIMIT } from '../../shared/constants';
import { openAlertNoti } from '../../shared/notification';

function shouldFetchNewUsers(userState) {
  const { watchedIndex, data } = userState;

  const fetchedDataLength = data.length;

  return fetchedDataLength - watchedIndex <= USER_PREFETCH_LIMIT;
}

export const advanceNextUser = (userPreferenceData) => async (dispatch, getState) => {
  let appState = getState();
  let userState = appState.user;
  const nextWatchedIndex = userState.watchedIndex + 1;

  if (userPreferenceData) {
    await userPreferenceUpdateGateway(userPreferenceData);
  }

  if (shouldFetchNewUsers(userState)) {
    await fetchNextUserPage()(dispatch, getState);

    appState = getState();
    userState = appState.user;
  }

  const nextUser = userState.data[nextWatchedIndex];

  if (!nextUser) {
    openAlertNoti('An error occurred');

    return;
  }

  const nextUserId = nextUser.id;
  
  const nextUserDetail = await fetchUserByIdGateway(nextUserId);

  dispatch(userActions.advanceNextUser({ currentUser: nextUserDetail }));
}

export const fetchUserById = userId => async dispatch => {
  const userDetail = await fetchUserByIdGateway(userId);

  dispatch(userActions.updateCurrentUser({ currentUser: userDetail }));
}

export const fetchNextUserPage = () => async (dispatch, getState) => {
  const appState = getState();
  const userState = appState.user;
  const currentUsers = userState.data;

  try {
    const { offset, limit } = userState.pagination;

    dispatch(userActions.updateLoading({ isLoading: true }));
    
    const newUsers = await fetchUsersGateway({ limit, offset: offset + limit });

    const isUserCacheLimitPassed = currentUsers.length && currentUsers.length > MAX_USER_CACHE;

    if (isUserCacheLimitPassed) {
      dispatch(userActions.fetchUsers({ data: currentUsers.slice(MAX_USER_CACHE, currentUsers.length) }));

      return;
    }

    dispatch(userActions.fetchUsers({ data: newUsers }));
  } finally {
    dispatch(userActions.updateLoading({ isLoading: false })); 
  }
}

