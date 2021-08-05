import axios from "axios";
import { ROOT_PATH } from "constants/paths";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SIGN_IN_PATH } from "react-app/src/routing/Paths";
import { Session } from "react-app/src/state/utils/session";
import debug from "react-app/src/utils/debug";
import useUserData from "./hooks/useUserData";
import getFormattedInputDateValue from "./utils/getFormattedInputDateValue";

function noop() {
  alert("Work in progress");
}
const OLD_SESSION_KEY = "_a0_";
const SESSION_NAME = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_SESSION_NAME;
const HAS_CONVERTED_SESSION = "HAS_CONVERTED_SESSION";

/* With additional properties to mock Auth0 */
export const AuthContext = createContext({
  isLoading: false,
  isAuthenticated: false,
  user: null,
  getAccessTokenSilently: noop,
  loginWithPopup: (options = {}) => {},
  loginWithRedirect: (options = {}) => {},
  logout: noop,
  setAuthenticated: (value = false) => {},
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
  const { push } = useRouter();
  const { user, fetchUserData, cleanUserData } = useUserData();

  function goToLoginPage({ returnTo = SIGN_IN_PATH }) {
    push({ pathname: returnTo }, returnTo);
  }

  const convertSession = useCallback(async () => {
    await axios
      .post("/api/convert-session", {
        token: localStorage.getItem(OLD_SESSION_KEY),
      })
      .then((res) => {
        debug("response from /api/convert-session", res);
        localStorage.setItem(HAS_CONVERTED_SESSION, HAS_CONVERTED_SESSION);
        setAuthenticated(true);
      })
      .catch((err) => {
        debug("Error from  /api/convert-session", err);
        setAuthenticated(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    // if exist new FamososAuth Cookie, set authenticated to true and loading to false
    if (Boolean(session.getSession())) {
      fetchUserData();
      setAuthenticated(true);
      setIsLoading(false);
      return;
    }

    // if doesn't exist new FamososAuth Cookie, and the user has OLD_SESSION_KEY and has not being converted his session before, call convertSession()
    if (
      !Boolean(session.getSession()) &&
      localStorage.getItem(OLD_SESSION_KEY) &&
      !localStorage.getItem(HAS_CONVERTED_SESSION)
    ) {
      convertSession();
      return;
    }
    // last case, the user doesn't has new FamososAuth Cookie
    else if (!Boolean(session.getSession())) {
      setAuthenticated(false);
      setIsLoading(false);
      cleanUserData();
      return;
    }
  }, []);

  async function logout({ returnTo } = {}) {
    session.removeSession();
    if (returnTo) await push(returnTo);
    setAuthenticated(false);
    cleanUserData();
  }

  return (
    <AuthContext.Provider
      value={{
        loginWithPopup: (options) => goToLoginPage(options),
        loginWithRedirect: (options) => goToLoginPage(options),
        logout,
        isLoading,
        isAuthenticated,
        setAuthenticated,
        user,
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
      returnTo: typeof returnTo === "function" ? returnTo() : returnTo,
    },
  };
}

export const withAuthenticationRequired = (Component, options = {}) =>
  function WithAuthenticationRequired(props) {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth();
    const {
      returnTo = () => {},
      onRedirecting = defaultOnRedirecting,
      loginOptions = {},
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

export async function signInWithEmailAndPassword({ email, password }) {
  const response = await axios.post("/api/email-password-sign-in", {
    email: email?.trim?.().toLocaleLowerCase?.(),
    password,
  });
  if (response.data.status !== "OK") {
    throw response?.data?.error;
  }
  const session = new Session();
  session.initSession();
}

const FALLBACK_LOCALE = "ES";

export async function signUpWithEmailAndPassword({
  email,
  birthDate,
  locale,
  ...signUpData
}) {
  const response = await axios.post("/api/email-password-sign-up", {
    email: email?.trim?.().toLocaleLowerCase?.(),
    birthDate: getFormattedInputDateValue(birthDate),
    locale: locale?.toUpperCase?.() || FALLBACK_LOCALE,
    ...signUpData,
  });
  if (response.data.status !== "OK") {
    throw response?.data?.error;
  }
}

export async function validateEmailSecurityCode({ email, securityCode }) {
  const response = await axios.post("/api/validate-security-code", {
    email: email?.trim?.().toLocaleLowerCase?.(),
    securityCode: securityCode?.trim?.()?.toLocaleLowerCase?.(),
  });
  if (response?.data?.status === "error") {
    throw response?.data?.error;
  }
}

export const sendSecurityCode = (email) =>
  axios.post("/api/generate-security-code", {
    email: email?.trim?.().toLocaleLowerCase?.(),
  });

export const redirectToAfterAuthPath = session.initSession;

export function useRedirectIfAuthenticatedOnMount({
  redirectTo = ROOT_PATH,
} = {}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const didRunRef = useRef(false);

  useEffect(() => {
    if (isLoading || didRunRef.current) return;
    didRunRef.current = true;
    if (!isAuthenticated) return;
    router.push(redirectTo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated]);
}
