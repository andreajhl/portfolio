import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AUTH_SUCCESS } from "../../../routing/Paths";
import isBrowser from "react-app/src/utils/isBrowser";

const LoginButton = (props) => {
  let isMobile;
  let locationOrigin;
  if (isBrowser()) {
    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    locationOrigin = window.location.origin + AUTH_SUCCESS;
  }
  const { className, redirectUrl } = props;
  const {
    loginWithPopup,
    isLoading,
    isAuthenticated,
    loginWithRedirect
  } = useAuth0();
  const handlerClickToLogin = () => {
    if (isMobile) {
      loginWithRedirect({
        redirectUri: locationOrigin
      });
    } else {
      loginWithPopup();
    }
  };
  return (
    <button
      className={`btn btn-outline-primary  ${className ? className : ""}`}
      onClick={() => handlerClickToLogin()}
    >
      Ingresar
    </button>
  );
};

export default LoginButton;
