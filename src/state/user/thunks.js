import { userActions } from '.';
import { fetchUsersGateway } from '../../gateways/user';
import { MAX_USER_CACHE, USER_PREFETCH_LIMIT } from '../../shared/constants';

function shouldFetchNewUsers(userState) {
  const { watchedIndex, data } = userState;

  const fetchedDataLength = data.length;

  return fetchedDataLength - watchedIndex <= USER_PREFETCH_LIMIT;
}

export const advanceNextUserThunk = () => async (dispatch, getState) => {
  const appState = getState();
  const userState = appState.user;
  const currentUsers = userState.data;

  if (!shouldFetchNewUsers(userState)) {
    dispatch(userActions.advanceNextUser());

    return;
  }

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
    dispatch(userActions.advanceNextUser());
  } finally {
    dispatch(userActions.updateLoading({ isLoading: false })); 
  }
}

