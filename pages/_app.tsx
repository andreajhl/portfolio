import React, { useCallback, useEffect } from "react";
import { wrapper } from "react-app/src/state/store";
import { useRouter } from "next/router";
import {
  analytics,
  initialize as gtmInitialize
} from "react-app/src/state/utils/gtm";
import "react-app/src/styles.scss";
import { IntlProvider } from "react-intl";
import esMessages from "../compiled-lang/es.json";
import enMessages from "../compiled-lang/en.json";
import { FamososAuthProvider } from "lib/famosos-auth";
import { Session } from "../react-app/src/state/utils/session";
import getWindow from "react-app/src/utils/getWindow";
import axios from "axios";
import getCookie from "react-app/src/utils/getCookie";
import ptMessages from "../compiled-lang/pt.json";
const OLD_SESSION_KEY = "_a0_";

const languages = {
  en: enMessages,
  es: esMessages,
  pt: ptMessages,
  por: ptMessages,
  "pt-BR": ptMessages
};
const SESSION_NAME = process.env.NEXT_PUBLIC_FAMOSOS_AUTH_SESSION_NAME;

const handleRouteChange = (url: any, { shallow }: { shallow: boolean }) => {
  const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT.toUpperCase();
  analytics.page({
    path: url,
    url,
    shallow,
    isReactRouting: true,
    ENVIRONMENT,
    userAgent: navigator?.userAgent,
    vendor: navigator?.vendor,
    receivedAt: new Date()
  });
};

const ROUTE_CHANGE_START = "routeChangeStart";
const HAS_CONVERTED_SESSION = "HAS_CONVERTED_SESSION";

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    gtmInitialize();
    analytics.trackFirstPageLoad();
    router.events.on(ROUTE_CHANGE_START, handleRouteChange);
    return () => {
      router.events.off(ROUTE_CHANGE_START, handleRouteChange);
    };
  }, []);

  const convertSession = useCallback(async () => {
    await axios
      .post("/api/convert-session", {
        token: localStorage.getItem(OLD_SESSION_KEY)
      })
      .then((res) => {
        console.log("response from /api/convert-session", res);
        localStorage.setItem(HAS_CONVERTED_SESSION, HAS_CONVERTED_SESSION);
        localStorage.setItem("finalRedirect", window?.location?.pathname);
        const session = new Session();
        session.initSession();
        // localStorage.removeItem(OLD_SESSION_KEY);
      })
      .catch((err) => {
        console.log("Error from  /api/convert-session", err);
      });
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem(OLD_SESSION_KEY) &&
      !getCookie(SESSION_NAME) &&
      !localStorage.getItem(HAS_CONVERTED_SESSION)
    ) {
      console.log("convertSession() call");
      convertSession();
    }
  }, []);

  const { locale, defaultLocale } = router;
  const messages = languages[locale];
  const tokenExpired = true; /* While SS token validation is not available, using Session.tokenExpired gives a different value when the app is hydrating, this cause bugs.  */

  return (
    <FamososAuthProvider authenticated={!tokenExpired}>
      <IntlProvider
        messages={messages}
        locale={locale}
        defaultLocale={defaultLocale}
      >
        <Component {...pageProps} />
      </IntlProvider>
    </FamososAuthProvider>
  );
}

export default wrapper.withRedux(App);
