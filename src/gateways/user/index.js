import axios from 'axios';

export const fetchUsersGateway = async ({ limit, offset }) => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/user`;
  const request = await axios.get(apiUrl, {
    headers: {
      'app-id': process.env.REACT_APP_API_ID, // Should not store like this. Only for testing
    },
    params: {
      limit,
      offset,
    },
  });

  return request.data.data;
}