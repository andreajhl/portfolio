import { RootState } from "react-app/src/state/store";
import { useSelector } from "react-redux";

const userCelebrityLikesSelector = ({ celebrityLikes }: RootState) =>
  celebrityLikes.fetchUserCelebrityLikesReducer.data.data;

function useUserCelebrityLikes() {
  const userCelebrityLikes = useSelector(userCelebrityLikesSelector);
  return userCelebrityLikes as number[];
}

export default useUserCelebrityLikes;
