import { useAuth0 } from "@auth0/auth0-react";
import { AUTH_SUCCESS } from "../routing/Paths";

const useLoginHandler = (redirectUrl = AUTH_SUCCESS) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const { loginWithPopup, loginWithRedirect } = useAuth0();

  const loginHandler = () => {
    if (isMobile) {
      loginWithRedirect({
        redirectUri: window.location.origin + redirectUrl
      });
    } else {
      loginWithPopup();
    }
  };

  return loginHandler;
};

export { useLoginHandler };
