import { useAuth } from "lib/famosos-auth";
import { history } from "react-app/src/routing/History";
import { tagManagerDataLayer } from "react-app/src/state/utils/gtm";
import { addPostComment } from "react-app/src/state/ducks/celebrity-subscription-posts/actions";
import usePromise from "./usePromise";
import { SIGN_IN_PATH } from "react-app/src/routing/Paths";

function useAddSubscriptionPostComment(postId: number) {
  const { isAuthenticated } = useAuth();
  const { handle, status } = usePromise();

  const analyticsData = {
    postId,
    widget: "useAddSubscriptionPostComment",
  };

  async function saveComment(comment: string) {
    try {
      const response = await handle(addPostComment({ postId, comment }));
      if (!response || response?.status === "ERROR") return;
      tagManagerDataLayer(`ADD_POST_COMMENT`, { ...analyticsData, comment });
    } catch (error) {
      console.warn(error);
    }
  }

  function redirectToLogin() {
    tagManagerDataLayer(`ADD_POST_COMMENT_UNAUTHENTICATED`, analyticsData);
    localStorage.setItem("finalRedirect", window.location.pathname);
    (history as any).push(SIGN_IN_PATH);
  }

  function addComment(comment: string) {
    if (isAuthenticated) {
      return saveComment(comment);
    }
    redirectToLogin();
  }

  return { addComment, status };
}

export default useAddSubscriptionPostComment;
