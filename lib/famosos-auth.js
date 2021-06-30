import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { SIGN_IN_PATH } from "react-app/src/routing/Paths";
import { Session } from "react-app/src/state/utils/session";

function noop() {
  alert("Work in progress");
}

/* With additional properties to mock Auth0 */
export const AuthContext = createContext({
  isLoading: false,
  isAuthenticated: false,
  user: null,
  getAccessTokenSilently: noop,
  loginWithPopup: noop,
  loginWithRedirect: noop,
  logout: noop,
  setAuthenticated: noop
});

const session = new Session();

/**
 * The initial value of `isAuthenticated` comes from the `authenticated`
 * prop which gets set by _app. We store that value in state and ignore
 * the prop from then on. The value can be changed by calling the
 * `setAuthenticated()` method in the context.
 */
export const FamososAuthProvider = ({ children, authenticated }) => {
  const [isAuthenticated, setAuthenticated] = useState(authenticated);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  function goToLoginPage() {
    router.push(SIGN_IN_PATH);
  }

  useEffect(() => {
    setAuthenticated(Boolean(session.getSession()));
    setIsLoading(false);
  }, []);

  async function logout({ returnTo } = {}) {
    session.removeSession();
    if (returnTo) await router.push(returnTo);
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        loginWithPopup: goToLoginPage,
        loginWithRedirect: goToLoginPage,
        logout,
        isLoading,
        isAuthenticated,
        setAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an FamososAuthProvider");
  }
  return context;
}

export function useIsAuthenticated() {
  const context = useAuth();
  return context.isAuthenticated;
}

const defaultOnRedirecting = () => null;

function getOptions(loginOptions, returnTo) {
  return {
    ...loginOptions,
    appState: {
      ...loginOptions.appState,
      returnTo: typeof returnTo === "function" ? returnTo() : returnTo
    }
  };
}

export const withAuthenticationRequired = (Component, options = {}) =>
  function WithAuthenticationRequired(props) {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth();
    const {
      returnTo = () => {},
      onRedirecting = defaultOnRedirecting,
      loginOptions = {}
    } = options;

    useEffect(() => {
      if (isLoading || isAuthenticated) return;
      const opts = getOptions(loginOptions, returnTo);
      (async () => {
        await loginWithRedirect(opts);
      })();
    }, [isLoading, isAuthenticated, loginWithRedirect, loginOptions, returnTo]);

    return isAuthenticated ? <Component {...props} /> : onRedirecting();
  };

export const withAuth = (Component) => (props) => (
  <AuthContext.Consumer>
    {(auth) => <Component auth={auth} {...props} />}
  </AuthContext.Consumer>
);
