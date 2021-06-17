import { useAuth0 } from "@auth0/auth0-react";
import { SIGN_IN_WITH_SPECIFIC_FORM_PATH } from "constants/paths";
import { useEffect, useState } from "react";
import { history } from "react-app/src/routing/History";
import { addOrRemoveLike } from "react-app/src/state/ducks/celebrity-likes/actions";
import { tagManagerDataLayer } from "react-app/src/state/utils/gtm";
import useUserCelebrityLikes from "./useUserCelebrityLikes";

function useCelebrityFavorite(celebrityId: number) {
  const userCelebrityLikes = useUserCelebrityLikes();
  const { isAuthenticated } = useAuth0();
  const [isFavorite, setIsFavorite] = useState(false);
  const analyticsData = { celebrityId, widget: "useCelebrityFavorite" };

  useEffect(() => {
    if (!userCelebrityLikes) return;
    setIsFavorite(
      Boolean(
        userCelebrityLikes.find(
          (likeCelebrityId) => likeCelebrityId === celebrityId
        )
      )
    );
  }, [celebrityId, userCelebrityLikes]);

  async function toggleFavorite() {
    if (isAuthenticated) {
      const response = await addOrRemoveLike(celebrityId);
      if (response.status === "OK") {
        tagManagerDataLayer(
          `CLICK_${!isFavorite ? "" : "UN"}LIKE_CELEBRITY`,
          analyticsData
        );
        setIsFavorite((isFavorite) => !isFavorite);
      }
    } else {
      tagManagerDataLayer(
        `CLICK_LIKE_CELEBRITY_UNAUTHENTICATED`,
        analyticsData
      );
      localStorage.setItem("finalRedirect", window.location.pathname);
      (history as any).push(
        SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(":form", "email-form")
      );
    }
  }

  return { isFavorite, toggleFavorite };
}

export default useCelebrityFavorite;
