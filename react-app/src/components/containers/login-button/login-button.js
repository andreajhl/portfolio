import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className='btn btn-sm btn-outline-primary'
      onClick={() => loginWithRedirect()}
    >
      Ingresar
    </button>
  );
};

export default LoginButton;
