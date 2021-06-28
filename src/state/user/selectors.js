import { useSelector } from "react-redux";

export const useUsersSelector = () => {
  const userState = useSelector(state => state.user);

  return {
    data: userState.data,
    isLoading: userState.isLoading,
  };
}

export const useUserIndexes = () => {
  const userState = useSelector(state => state.user);
  const watchedIndex = userState.watchedIndex;
  const totalIndex = userState.totalIndex;

  return {
    watchedIndex,
    totalIndex,
  }
}