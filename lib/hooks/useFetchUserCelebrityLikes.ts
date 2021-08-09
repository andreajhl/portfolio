import { useAuth } from "lib/famosos-auth";
import { useEffect } from "react";
import { fetchUserCelebrityLikes } from "react-app/src/state/ducks/celebrity-likes/actions";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";
import onCanUseSessionToken from "../utils/onCanUseSessionToken";

const hasFetchedLikesSelector = ({ celebrityLikes }: RootState) =>
  celebrityLikes.fetchUserCelebrityLikesReducer.completed;

function useFetchUserCelebrityLikes(shouldFetchUserCelebrityLikes: boolean) {
  const hasFetchedLikes = useSelector(hasFetchedLikesSelector);
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldFetchUserCelebrityLikes) return;
    if (!isAuthenticated) return;
    if (hasFetchedLikes) return;
    onCanUseSessionToken(() => dispatch(fetchUserCelebrityLikes()));
  }, [
    dispatch,
    hasFetchedLikes,
    isAuthenticated,
    shouldFetchUserCelebrityLikes
  ]);
}

export default useFetchUserCelebrityLikes;
