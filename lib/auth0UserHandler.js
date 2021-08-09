import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Session } from "react-app/src/state/utils/session";
import { history } from "react-app/src/routing/History";
import { connect } from "react-redux";
import { setRedirectUnauthorized } from "react-app/src/state/ducks/authentication/actions";
import { configureScope, setUser } from "@sentry/nextjs";

function setSentryUser(user) {
  try {
    setUser(user);
  } catch (error) {
    console.log("Sentry.setUser() Error:", error);
  }
}

function removeSentryUser() {
  try {
    configureScope((scope) => scope.setUser(null));
  } catch (error) {
    console.log("Sentry.configureScope() Error:", error);
  }
}

const mapStateToProps = ({
                           authentication: { setRedirectUnauthorizedReducer }
                         }) => ({ hasInvalidToken: setRedirectUnauthorizedReducer });

const mapDispatchToProps = {
  setRedirectUnauthorized
};

function Auth0UserHandler({
                            children,
                            hasInvalidToken,
                            setRedirectUnauthorized
                          }) {
  const session = new Session();
  const [tokenUser, setTokenUser] = useState(null);
  const {
    user,
    getAccessTokenSilently,
    isLoading,
    logout,
    isAuthenticated
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchToken = async () => {
        const result = await getAccessTokenSilently();
        if (result) {
          setTokenUser(result);
          setSentryUser(user);
        } else if (!isLoading) {
          setTokenUser(null);
          removeSentryUser();
          localStorage.removeItem(session.sessionName);
        }
      };
      fetchToken();
    } else if (!isLoading & !isAuthenticated) {
      setTokenUser(null);
      removeSentryUser();
      localStorage.removeItem(session.sessionName);
    }
  }, [user, isAuthenticated, isLoading]);

  useEffect(() => {
    if (tokenUser) {
      if (localStorage.getItem("finalRedirect")) {
        history.push(localStorage.getItem("finalRedirect"));
        localStorage.removeItem("finalRedirect");
      }
      localStorage.setItem(session.sessionName, tokenUser);
    } else if (!isLoading) {
      removeSentryUser();
      localStorage.removeItem(session.sessionName);
    }
  }, [tokenUser]);

  useEffect(() => {
    if (!hasInvalidToken) return;
    setRedirectUnauthorized(false);
    localStorage.setItem("shouldAuthenticate", true);
    localStorage.setItem("finalRedirect", window.location.pathname);
    localStorage.removeItem(session.sessionName);
    removeSentryUser();
    logout();
  }, [hasInvalidToken, logout, session.sessionName, setRedirectUnauthorized]);

  return children;
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth0UserHandler);
