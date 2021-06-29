import { useSelector } from "react-redux";

export const useUserHistory = () => {
  return useSelector(state => state.history);
}
