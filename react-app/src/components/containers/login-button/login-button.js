import React from "react";
import { useLoginHandler } from "../../../utils/useLoginHandler";

const LoginButton = (props) => {
  const { className, text } = props;
  const handlerClickToLogin = useLoginHandler();

  return (
    <button
      className={`btn btn-outline-primary  ${className ? className : ""}`}
      onClick={() => handlerClickToLogin()}
    >
      {text ? text : "Ingresar"}
    </button>
  );
};

export default LoginButton;
