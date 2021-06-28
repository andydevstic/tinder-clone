const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    pagination: {
      limit: 10,
      offset: 0,
    },
    watchedIndex: 0,
    totalIndex: 0,
    isLoading: false,
  },
  reducers: {
    fetchUsers: (state, action) => {
      const { data, pagination } = action.payload;

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
    advanceNextUser: state => {
      state.watchedIndex++;
    },
  },
});

export default userSlice.reducer;

export const userActions = userSlice.actions;