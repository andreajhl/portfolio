import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { fetchUserCelebrityLikes } from "react-app/src/state/ducks/celebrity-likes/actions";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";

const userCelebrityLikesSelector = ({ celebrityLikes }: RootState) => {
  return {
    userCelebrityLikes: celebrityLikes.fetchUserCelebrityLikesReducer.data.data,
    shouldFetchLikes: !celebrityLikes.fetchUserCelebrityLikesReducer.completed,
  };
};

function useUserCelebrityLikes() {
  const { userCelebrityLikes, shouldFetchLikes } = useSelector(
    userCelebrityLikesSelector
  );
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!shouldFetchLikes) return;
    dispatch(fetchUserCelebrityLikes());
  }, []);

  return userCelebrityLikes as number[];
}

export default useUserCelebrityLikes;
