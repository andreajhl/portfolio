import { useAuth } from "lib/famosos-auth";
import { SIGN_IN_WITH_SPECIFIC_FORM_PATH } from "constants/paths";
import { useState } from "react";
import { history } from "react-app/src/routing/History";
import { tagManagerDataLayer } from "react-app/src/state/utils/gtm";
import { SubscriptionPostType } from "react-app/src/types/subscriptionPostType";
import { togglePostReaction } from "react-app/src/state/ducks/celebrity-subscription-posts/actions";

function useSubscriptionPostLove({
  id: postId,
  reactions: { post_love: initialIsLoved },
}: SubscriptionPostType) {
  const { isAuthenticated } = useAuth();
  const [isLoved, setIsLoved] = useState(initialIsLoved);

  const analyticsData = {
    postId,
    widget: "useSubscriptionPostLike",
  };

  async function changeIsLoved() {
    const response = await togglePostReaction(postId).catch(console.warn);
    if (!response || response?.status === "ERROR") return;
    tagManagerDataLayer(
      `CLICK_${!isLoved ? "" : "UN"}LOVE_POST`,
      analyticsData
    );
    setIsLoved(response?.markedByMe);
  }

  function redirectToLogin() {
    tagManagerDataLayer(`CLICK_LOVE_POST_UNAUTHENTICATED`, analyticsData);
    localStorage.setItem("finalRedirect", window.location.pathname);
    (history as any).push(
      SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(":form", "email-form")
    );
  }

  function toggleIsLoved() {
    if (isAuthenticated) {
      return changeIsLoved();
    }
    redirectToLogin();
  }

  return [isLoved, toggleIsLoved] as const;
}

export default useSubscriptionPostLove;
