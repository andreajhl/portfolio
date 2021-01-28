import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = (props) => {
  const { className, redirectUrl } = props;
  const { loginWithRedirect } = useAuth0();
  const handlerClickToLogin = () => {
    loginWithRedirect();
  };
  return (
    <button
      className={`btn btn-outline-primary  btn-sm ${
        className ? className : ""
      }`}
      onClick={() => handlerClickToLogin()}
    >
      Ingresar
    </button>
  );
};

export default LoginButton;
