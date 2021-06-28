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
  // const { watchedIndex, totalUsersFetched } = userState;
  // const currentUserIndex = watchedIndex - totalUsersFetched;

  // return userState.data[currentUserIndex];
}
