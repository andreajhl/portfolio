import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { HOME_PATH } from "react-app/src/routing/Paths";

function useRedirectOnAuthenticated(redirectPath = HOME_PATH) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return;
    router.push(redirectPath);
  }, [isLoading, isAuthenticated, router, redirectPath]);
}

export default useRedirectOnAuthenticated;
