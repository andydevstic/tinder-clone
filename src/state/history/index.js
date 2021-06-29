import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    data: {
      liked: [],
      passed: [],
    },
    pagination: {
      limit: 10,
      page: -1,
    },
    isLoading: false,
  },
  reducers: {
    updateHistory: (state, action) => {
      const { data, pagination } = action.payload;

      if (data && data.length) {
        state.data = data.concat(state.data);
      }

      if (pagination) {
        state.pagination = pagination;
      }
    },
    updateLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    pushLiked: (state, action) => {
      state.data.liked = state.data.liked.concat([action.payload.liked]);
    },
    pushPassed: (state, action) => {
      state.data.passed = state.data.passed.concat([action.payload.passed]);
    },
  },
});

export default historySlice.reducer;

export const historyActions = historySlice.actions;