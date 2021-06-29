import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import userReducer from './user';
import historyReducer from './user';

export default configureStore({
  reducer: {
    user: userReducer,
    history: historyReducer,
  },
});

export const useAppDispatch = () => useDispatch();