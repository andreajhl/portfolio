import React, { useMemo } from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LoaderLayout } from "../components/layouts/loader";

const PrivateRoute = ({ component, ...rest }) => {
  const Comp = withAuthenticationRequired(component, {
    onRedirecting: () => <LoaderLayout />,
    returnTo: localStorage.getItem("redirectPath")
      ? localStorage.getItem("redirectPath")
      : window.location.href
  });
  return useMemo(
    () => <Route {...rest} render={(props) => <Comp {...props}></Comp>} />,
    [component, rest]
  );
};

export { PrivateRoute };
