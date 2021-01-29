import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AUTH_SUCCESS } from "../../../routing/Paths";

const LoginButton = (props) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const { className, redirectUrl } = props;
  const {
    loginWithPopup,
    isLoading,
    isAuthenticated,
    loginWithRedirect
  } = useAuth0();
  const handlerClickToLogin = () => {
    if (isMobile) {
      loginWithRedirect({ redirectUri: window.location.origin + AUTH_SUCCESS });
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
