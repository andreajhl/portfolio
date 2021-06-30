import React from "react";
import { useAuth } from "lib/famosos-auth";
import * as GTM from "../../../state/utils/gtm";
import { Session } from "../../../state/utils/session";
const LogoutButton = (props) => {
  const session = new Session();
  const { children, className, redirectTo } = props;
  const handlerLogoutSession = () => {
    GTM.tagManagerDataLayer("CLICK_LOGOUT");
    session.removeSession();
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
