import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import userReducer from './user';

export default configureStore({
  reducer: {
    user: userReducer
  },
});

export const useAppDispatch = () => useDispatch();