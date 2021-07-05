import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { fetchUserCelebrityLikes } from "react-app/src/state/ducks/celebrity-likes/actions";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";
import onCanUseSessionToken from "../utils/onCanUseSessionToken";

const hasFetchedLikesSelector = ({ celebrityLikes }: RootState) =>
  celebrityLikes.fetchUserCelebrityLikesReducer.completed;

function useFetchUserCelebrityLikes(shouldFetchUserCelebrityLikes: boolean) {
  const hasFetchedLikes = useSelector(hasFetchedLikesSelector);
  const { isAuthenticated } = useAuth0();
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
    shouldFetchUserCelebrityLikes,
  ]);
}

export default useFetchUserCelebrityLikes;
