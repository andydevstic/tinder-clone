import { useSelector } from "react-redux";

export const useUsers = () => {
  const userState = useSelector(state => state.user);

  return {
    data: userState.data,
    isLoading: userState.isLoading,
  };
}

export const useCurrentUser = () => {
  return useSelector(state => state.user.currentUser);
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