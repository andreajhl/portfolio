import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as GTM from "../../../state/utils/gtm";

const LogoutButton = (props) => {
  const { children, className, redirectTo } = props;

  const { logout } = useAuth0();

  const handlerLogoutSession = () => {
    GTM.tagManagerDataLayer("CLICK_LOGOUT");
    logout({
      returnTo: window.location.origin
    });
  };
  return (
    <div
      className={`${className ? className : ""} `}
      onClick={() => {
        handlerLogoutSession();
      }}
    >
      {children}
    </div>
  );
};

export default LogoutButton;
