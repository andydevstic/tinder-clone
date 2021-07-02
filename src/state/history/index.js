import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    data: {
      liked: [],
      passed: [],
    },
    pagination: {
      liked: {
        limit: 10,
        page: -1,
      },
      passed: {
        limit: 10,
        page: -1,
      },
    },
    isLoading: false,
  },
  reducers: {
    updateHistory: (state, action) => {
      const { data, pagination, preferenceType } = action.payload;

      if (data && data.length) {
        state.data[preferenceType] = data;
      }

      if (pagination) {
        state.pagination[preferenceType] = pagination;
      }
    },
    updateLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    pushLiked: (state, action) => {
      const likedUser = action.payload.user;
      const slicedLikedUsers = state.data.liked.slice();

      slicedLikedUsers.push(likedUser);

      state.data.liked = slicedLikedUsers;
    },
    pushPassed: (state, action) => {
      const passedUser = action.payload.user;
      const slicedPassedUsers = state.data.passed.slice();

      slicedPassedUsers.push(passedUser);

      state.data.passed = slicedPassedUsers;
    },
  },
});

export default historySlice.reducer;

export const historyActions = historySlice.actions;