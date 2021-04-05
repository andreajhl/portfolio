import React from "react";
import { FormattedMessage } from "react-intl";
import { useLoginHandler } from "../../../utils/useLoginHandler";

const LoginButton = (props) => {
  const { className, text } = props;
  const handlerClickToLogin = useLoginHandler();

  return (
    <button
      className={`btn btn-outline-primary  ${className ? className : ""}`}
      onClick={() => handlerClickToLogin()}
    >
      {text ? (
        text
      ) : (
        <FormattedMessage defaultMessage="Ingresar" description="" />
      )}
    </button>
  );
};

export default LoginButton;
