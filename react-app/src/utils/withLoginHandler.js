import React from "react";
import { withAuth } from "lib/famosos-auth";
import { AUTH_SUCCESS } from "../routing/Paths";

const withLoginHandler = (Component) =>
  withAuth(({ auth: { loginWithPopup, loginWithRedirect }, ...props }) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const loginHandler = (redirectUrl = AUTH_SUCCESS) => {
      if (isMobile | isSafari) {
        loginWithRedirect({
          redirectUri: window.location.origin + redirectUrl
        });
      } else {
        loginWithPopup();
      }
    };

    return <Component loginHandler={loginHandler} {...props} />;
  });

export { withLoginHandler };
