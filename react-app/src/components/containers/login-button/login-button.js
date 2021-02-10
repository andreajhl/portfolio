import React from "react";

const LoginButton = ({ children, className }) => {
  return (
    <button
      className={`btn btn-outline-primary  ${className ? className : ""}`}
    >
      {children}
    </button>
  );
};

export default LoginButton;
