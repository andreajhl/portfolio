import React, { useCallback, useEffect } from "react";
import { wrapper } from "react-app/src/state/store";
import { useRouter } from "next/router";
import {
  analytics,
  initialize as gtmInitialize,
} from "react-app/src/state/utils/gtm";
import "react-app/src/styles.scss";
import "desktop-app/styles.scss";
import Auth0UserHandler from "lib/auth0UserHandler";
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
  "pt-BR": ptMessages,
};

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
    receivedAt: new Date(),
  });
};

const ROUTE_CHANGE_START = "routeChangeStart";

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
