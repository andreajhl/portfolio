import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Session } from "./session";
import { history } from "../../routing/History";

const Auth0UserHandler = ({ children }) => {
  const session = new Session();
  const [tokenUser, setTokenUser] = useState(null);
  const { user, getIdTokenClaims, isLoading } = useAuth0();
  useEffect(() => {
    const fetchToken = async () => {
      const result = await getIdTokenClaims();
      if (result) {
        setTokenUser(result.__raw);
      } else if (!isLoading) {
        console.log(isLoading);
        setTokenUser(null);
      }
    };
    fetchToken();
  }, [user]);
  useEffect(() => {
    if (tokenUser) {
      if (localStorage.getItem("finalRedirect")) {
        history.push(localStorage.getItem("finalRedirect"));
        localStorage.removeItem("finalRedirect");
      }
      localStorage.setItem(session.sessionName, tokenUser);
    } else if (!isLoading) {
      localStorage.removeItem(session.sessionName);
    }
  }, [tokenUser]);
  return children;
};

export default Auth0UserHandler;
