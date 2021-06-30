import React from "react";
import { useAuth } from "lib/famosos-auth";
import * as GTM from "../../../state/utils/gtm";
import { ROOT_PATH } from "react-app/src/routing/Paths";

function LogoutButton({ children, className }) {
  const { logout } = useAuth();

  function handlerLogoutSession() {
    GTM.tagManagerDataLayer("CLICK_LOGOUT");
    logout({
      returnTo: ROOT_PATH
    });
  }

  return (
    <div className={className} onClick={handlerLogoutSession}>
      {children}
    </div>
  );
}

export default LogoutButton;
