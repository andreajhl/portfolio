import { useAuth } from "lib/famosos-auth";
import { SIGN_IN_WITH_SPECIFIC_FORM_PATH } from "constants/paths";
import { useEffect, useState } from "react";
import { history } from "react-app/src/routing/History";
import { toggleContractLike } from "react-app/src/state/ducks/account/actions";
import useUserLikesContractsWithReference from "./useUserLikesContractsWithReference";

function useContractLike(contract_reference: string) {
  const [
    userContractsLikes,
    toggleLikeFromList
  ] = useUserLikesContractsWithReference();
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (!userContractsLikes) return;
    setIsFavorite(
      Boolean(
        userContractsLikes.find(
          (contractData) => contractData.reference === contract_reference
        )
      )
    );
  }, [contract_reference, userContractsLikes]);

  async function changeFavorite() {
    try {
      await toggleContractLike(contract_reference);
      toggleLikeFromList(contract_reference);
      setIsFavorite((isFavorite) => !isFavorite);
    } catch (e) {
      console.warn(e);
    }
  }

  function redirectToLogin() {
    localStorage.setItem("finalRedirect", window.location.pathname);
    (history as any).push(
      SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(":form", "email-form")
    );
  }

  function toggleFavorite() {
    if (isAuthenticated) {
      return changeFavorite();
    }
    redirectToLogin();
  }

  return { isFavorite, toggleFavorite };
}

export { useContractLike };
