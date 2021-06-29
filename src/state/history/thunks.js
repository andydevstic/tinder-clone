
import { historyActions } from '.';
import { fetchUserHistoryGateway } from '../../gateways/history';
import { USER_PREFERENCE_TYPES } from '../../shared/constants';
import { openAlertNoti } from '../../shared/notification';

export const advanceNextHistoryPage = (preferenceType) => async (dispatch, getState) => {
  const appState = getState();
  const historyState = appState.history;

  const { page, limit } = historyState.pagination[preferenceType];

  await fetchUserHistory({ limit, page: page + 1, preferenceType })(dispatch, getState);
}

export const fetchUserHistory = ({
  limit,
  page,
  preferenceType = USER_PREFERENCE_TYPES.LIKE,
}) => async (dispatch, getState) => {
  const appState = getState();
  const historyState = appState.history;
  const currentHistoryData = historyState.data[preferenceType];

  dispatch(historyActions.updateLoading({ isLoading: true }));
  try {
    const fetchedHistory = await fetchUserHistoryGateway({ limit, page, preferenceType });
    const aggregatedUserData = fetchedHistory.concat(currentHistoryData);

    dispatch(historyActions.updateHistory({
      data: aggregatedUserData,
      preferenceType,
      pagination: {
        limit,
        page,
      },
    }));

  } catch (error) {
    openAlertNoti(`An error occurred: ${error.message}`);
  } finally {
    dispatch(historyActions.updateLoading({ isLoading: false }));
  }
}