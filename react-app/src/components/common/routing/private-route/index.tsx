import React, { ReactComponentElement, ReactElement } from "react";
import { withRouter, NextRouter } from "next/router";
import { SIGN_IN_PATH } from "constants/paths";
import { Session } from "utils/session";
import isBrowser from "utils/isBrowser";

export interface PrivateRouteProps {
  children: React.ReactNode;
  router: NextRouter;
}

const PrivateRoute = ({
  children,
  router
}: PrivateRouteProps): ReactElement => {
  if (!isBrowser()) return null;
  const session = new Session();
  if (!session.getSession() || session.tokenExpired()) {
    router.push(SIGN_IN_PATH);
    return null;
  }
  return <>{children}</>;
};

export default withRouter(PrivateRoute);

export const withProtection = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const enhanced = withRouter(
    ({ router, ...props }: { router: NextRouter; props: any }) => {
      if (!isBrowser()) return null;
      const session = new Session();
      if (!session.getSession() || session.tokenExpired()) {
        router.push(SIGN_IN_PATH);
        return null;
      }
      return <Component {...(props as P)} />;
    }
  );

  enhanced.displayName = `withProtection(${
    Component.displayName || Component.name || "Component"
  })`;

  return enhanced;
};
