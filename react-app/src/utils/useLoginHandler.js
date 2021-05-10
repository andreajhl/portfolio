import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { AUTH_SUCCESS } from "../routing/Paths";
import { useWindow } from "./useWindow";

const useLoginHandler = (redirectUrl = AUTH_SUCCESS) => {
  const { locale } = useRouter();
  const userAgent = useWindow()?.navigator?.userAgent;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

  const { loginWithPopup, loginWithRedirect } = useAuth0();

  const loginHandler = () => {
    if (isMobile | isSafari) {
      loginWithRedirect({
        redirectUri: window.location.origin + redirectUrl,
        ui_locales: locale
      });
    } else {
      loginWithPopup({ ui_locales: locale });
    }
  };

  return loginHandler;
};

export { useLoginHandler };
