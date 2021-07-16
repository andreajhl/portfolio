import { useEffect } from "react";
import { useAuth } from "lib/famosos-auth";
import { useRouter } from "next/router";
import { HOME_PATH } from "react-app/src/routing/Paths";

function useRedirectOnAuthenticated(redirectPath = HOME_PATH) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return;
    router.push(redirectPath);
  }, [isLoading, isAuthenticated, router, redirectPath]);
}

export default useRedirectOnAuthenticated;
