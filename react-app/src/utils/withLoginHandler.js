import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { AUTH_SUCCESS } from "../routing/Paths";

const withLoginHandler = (Component) =>
  withAuth0(({ auth0: { loginWithPopup, loginWithRedirect }, ...props }) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const loginHandler = (redirectUrl = AUTH_SUCCESS) => {
      if (isMobile) {
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
