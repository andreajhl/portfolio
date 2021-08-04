import { useAuth } from "lib/famosos-auth";
import React from "react";
import { Session } from "react-app/src/state/utils/session";

type LogoutButtonHOCProps = {
  children: React.ReactNode;
  className?: string;
};

function LogoutButtonHOC({ children, className }: LogoutButtonHOCProps) {
  const { logout } = useAuth();
  const session = new Session();

  const handlerLogoutSession = () => {
    session.removeSession();
    logout();
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
