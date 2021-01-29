import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = (props) => {
  const { className, redirectUrl } = props;
  const { loginWithPopup, isLoading, isAuthenticated } = useAuth0();
  // const handlerClickToLogin = () => {
  //   loginWithRedirect();
  // };
  return (
    <button
      className={`btn btn-outline-primary  ${className ? className : ""}`}
      onClick={() => loginWithPopup()}
    >
      Ingresar
    </button>
  );
};

export default LoginButton;
