import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const auth0HOC = (Component) => {
  return function WrappedComponent(props) {
    const auth0 = useAuth0();
    return <Component {...props} auth0={auth0} />;
  };
};

export default auth0HOC;
