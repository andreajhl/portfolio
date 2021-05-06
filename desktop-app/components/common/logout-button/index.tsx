import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Session } from "react-app/src/state/utils/session";

type LogoutButtonHOCProps = {
  children: React.ReactNode;
  className?: string;
};

function LogoutButtonHOC({ children, className }: LogoutButtonHOCProps) {
  const { logout } = useAuth0();
  const session = new Session();

  const handlerLogoutSession = () => {
    session.removeSession();
    logout({
      returnTo: window.location.origin,
    });
  };
  return (
    <div
      className={className}
      onClick={() => {
        handlerLogoutSession();
      }}
    >
      {children}
    </div>
  );
}

export default LogoutButtonHOC;
