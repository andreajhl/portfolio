import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Session } from "react-app/src/state/utils/session";
import { history } from "react-app/src/routing/History";
import { connect } from "react-redux";
import { setRedirectUnauthorized } from "react-app/src/state/ducks/authentication/actions";

const mapStateToProps = ({
  authentication: { setRedirectUnauthorizedReducer }
}) => ({ hasInvalidToken: setRedirectUnauthorizedReducer });

const mapDispatchToProps = {
  setRedirectUnauthorized
};

const Auth0UserHandler = ({
  children,
  hasInvalidToken,
  setRedirectUnauthorized
}) => {
  const session = new Session();
  const [tokenUser, setTokenUser] = useState(null);
  const { user, getIdTokenClaims, isLoading, logout } = useAuth0();

  useEffect(() => {
    const fetchToken = async () => {
      const result = await getIdTokenClaims();
      if (result) {
        setTokenUser(result.__raw);
      } else if (!isLoading) {
        setTokenUser(null);
        localStorage.removeItem(session.sessionName);
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

  useEffect(() => {
    if (!hasInvalidToken) return;
    setRedirectUnauthorized(false);
    localStorage.setItem("shouldAuthenticate", true);
    localStorage.setItem("finalRedirect", window.location.pathname);
    localStorage.removeItem(session.sessionName);
    logout();
  }, [hasInvalidToken, logout, session.sessionName, setRedirectUnauthorized]);

  return children;
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth0UserHandler);
