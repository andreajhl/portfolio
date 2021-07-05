import { useAuth0 } from "@auth0/auth0-react";
import onCanUseSessionToken from "lib/utils/onCanUseSessionToken";
import { useEffect } from "react";
import { fetchUserLikesContractsWithReference } from "react-app/src/state/ducks/account/actions";
import { RootState } from "react-app/src/state/store";
import { useDispatch, useSelector } from "react-redux";

const hasFetchedLikesContracts = ({ account }: RootState) =>
  account.fetchUserFavoritesContractsWithReferenceReducer.completed;

function useFetchUserContractsLikes(
  shouldFetchUserCelebrityContracts: boolean
) {
  const hasFetchedLikes = useSelector(hasFetchedLikesContracts);
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldFetchUserCelebrityContracts) return;
    if (!isAuthenticated) return;
    if (hasFetchedLikes) return;
    onCanUseSessionToken(() =>
      dispatch(fetchUserLikesContractsWithReference())
    );
  }, [
    dispatch,
    hasFetchedLikes,
    isAuthenticated,
    shouldFetchUserCelebrityContracts,
  ]);
}

export default useFetchUserContractsLikes;
