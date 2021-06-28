import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    pagination: {
      limit: 10,
      page: 0,
    },
    currentUser: null,
    watchedIndex: -1,
    totalUsersFetched: 0,
    isLoading: false,
  },
  reducers: {
    fetchUsers: (state, action) => {
      const { data, pagination } = action.payload;

      console.log('Fetch users called', action.payload);

      if (data) {
        state.data = data;
      }

      if (pagination) {
        state.pagination = pagination;
      }
    },
    updateLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    updateTotalUsersFetched: (state, action) => {
      console.log('Update watched index called', action.payload);
      state.totalUsersFetched += action.payload.skippedUsersCount;
    },
    advanceNextUser: (state, action) => {
      state.watchedIndex++;
      state.currentUser = action.payload.currentUser;
    },
  },
});

export default userSlice.reducer;

export const userActions = userSlice.actions;