import axios from 'axios';

export const fetchUsersGateway = async ({ limit, page }) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/users`;
  const request = await axios.get(apiUrl, {
    headers: {
      'User-Id': process.env.REACT_APP_USER_ID,
    },
    params: {
      limit,
      page,
    },
  });

  return request.data.data;
}

export const fetchUserByIdGateway = async (userId) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/users/${userId}`;
  const request = await axios.get(apiUrl, {
    headers: {
      'User-Id': process.env.REACT_APP_USER_ID,
    },
  });

  return request.data;
}
