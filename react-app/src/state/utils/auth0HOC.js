import React from "react";
import { useAuth } from "lib/famosos-auth";

const auth0HOC = (Component) => {
  return function WrappedComponent(props) {
    const auth0 = useAuth();
    return <Component {...props} auth0={auth0} />;
  };
};

export default auth0HOC;
