import axios from 'axios';

export const fetchUsersGateway = async ({ limit, page }) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/user`;
  const request = await axios.get(apiUrl, {
    headers: {
      'app-id': process.env.REACT_APP_API_ID, // Should not store like this. Only for testing
    },
    params: {
      limit,
      page,
    },
  });

  return request.data.data;
}

export const fetchUserByIdGateway = async (userId) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/user/${userId}`;
  const request = await axios.get(apiUrl, {
    headers: {
      'app-id': process.env.REACT_APP_API_ID, // Should not store like this. Only for testing
    },
  });

  return request.data;
}
