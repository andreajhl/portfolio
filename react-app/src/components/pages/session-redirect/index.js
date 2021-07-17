import React, { useEffect } from "react";
import { LoadingOverlay } from "../../layouts/loading-overlay";
import { AUTH_SUCCESS, HOME_PATH } from "../../../routing/Paths";
import { useAuth } from "lib/famosos-auth";
import { useRouter } from "next/router";
import { FINAL_REDIRECT } from "constants/keys";

const SessionRedirectPage = ({ query: { r: redirectUrl } }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      router.push(redirectUrl || HOME_PATH);
    } else {
      localStorage.setItem(FINAL_REDIRECT, redirectUrl);
      loginWithRedirect({
        redirectUri: window.location.origin + AUTH_SUCCESS,
      });
    }
  }, [isAuthenticated, isLoading, redirectUrl]);

  return <LoadingOverlay />;
};

export { SessionRedirectPage };
