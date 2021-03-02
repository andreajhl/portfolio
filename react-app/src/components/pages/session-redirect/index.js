import React, { useEffect } from "react";
import { LoadingOverlay } from "../../layouts/loading-overlay";
import { HOME_PATH } from "../../../routing/Paths";
import { useAuth0 } from "@auth0/auth0-react";
import { useLoginHandler } from "react-app/src/utils/useLoginHandler";
import { useRouter } from "next/router";
import { FINAL_REDIRECT } from "constants/keys";

const SessionRedirectPage = ({ query: { r: redirectUrl } }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();
  const loginHandler = useLoginHandler();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      router.push(redirectUrl || HOME_PATH);
    } else {
      localStorage.setItem(FINAL_REDIRECT, redirectUrl);
      loginHandler();
    }
  }, [isAuthenticated, isLoading, redirectUrl, router]);

  return <LoadingOverlay />;
};

export { SessionRedirectPage };
