import { useAuth0 } from "@auth0/auth0-react";
import { SIGN_IN_WITH_SPECIFIC_FORM_PATH } from "constants/paths";
import { useEffect, useState } from "react";
import { history } from "react-app/src/routing/History";
import { toggleContractLike } from "react-app/src/state/ducks/account/actions";
import useUserLikesContractsWithReference from "./useUserLikesContractsWithReference";

function useContractLike(contract_reference: string) {
  const [
    userContractsLikes,
    toggleLikeFromList,
  ] = useUserLikesContractsWithReference();
  const { isAuthenticated } = useAuth0();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!userContractsLikes) return;
    console.log(userContractsLikes);
    setIsFavorite(
      Boolean(
        userContractsLikes.find(
          (likeCelebrityId) => likeCelebrityId === contract_reference
        )
      )
    );
  }, [contract_reference, userContractsLikes]);

  async function changeFavorite() {
    const response = await toggleContractLike(contract_reference).catch(
      console.warn
    );
    if (response.status !== "OK") return;
    toggleLikeFromList(contract_reference);
    setIsFavorite((isFavorite) => !isFavorite);
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
