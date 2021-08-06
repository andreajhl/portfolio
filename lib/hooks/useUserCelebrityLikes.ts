import { toggleLikeFromList } from "react-app/src/state/ducks/celebrity-likes/actions";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";

const userCelebrityLikesSelector = ({ celebrityLikes }: RootState) =>
  celebrityLikes.fetchUserCelebrityLikesReducer.data.data;

function useUserCelebrityLikes() {
  const userCelebrityLikes = useSelector(userCelebrityLikesSelector);
  const dispatch = useDispatch();

  function dispatchToggleLikeFromList(celebrityId: number) {
    dispatch(toggleLikeFromList(celebrityId));
  }

  return [userCelebrityLikes as number[], dispatchToggleLikeFromList] as const;
}

export default useUserCelebrityLikes;
