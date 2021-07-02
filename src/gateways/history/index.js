// import axios from 'axios';

import axios from "axios";
import { USER_PREFERENCE_TYPES } from "../../shared/constants";

export const fetchUserHistoryGateway = async ({ preferenceType, limit, page }) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/users/history`;

  const response = await axios.get(
    apiUrl,
    {
      headers: {
        'User-Id': process.env.REACT_APP_USER_ID,
      },
      params: {
        actionId: preferenceType === USER_PREFERENCE_TYPES.LIKE ? 1 : 2,
        limit,
        page,
      }
    },
  );

  return response.data.data;
}

export const userHistoryUpdateGateway = async ({ preferenceType, user }) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/users/action`;

  return axios.post(
    apiUrl,
    {
      actionId: preferenceType === USER_PREFERENCE_TYPES.LIKE ? 1 : 2,
      targetUserIndex: user.userIndex,
    },
    {
      headers: {
        'User-Id': process.env.REACT_APP_USER_ID,
      },
    },
  );
}