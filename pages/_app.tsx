import React, { useEffect } from "react";
import App, { AppContext } from "next/app";
import { wrapper } from "react-app/src/state/store";
import { useRouter } from "next/router";
import {
  analytics,
  initialize as gtmInitialize,
} from "react-app/src/state/utils/gtm";
import "react-app/src/styles.scss";
import "desktop-app/styles.scss";
import { IntlProvider } from "react-intl";
import esMessages from "../compiled-lang/es.json";
import enMessages from "../compiled-lang/en.json";
import { FamososAuthProvider } from "lib/famosos-auth";
import ptMessages from "../compiled-lang/pt.json";
import { IsOnMobileScreenProvider } from "lib/is-on-mobile-screen";
import isMobile from "lib/utils/isMobile";

const languages = {
  en: enMessages,
  es: esMessages,
  pt: ptMessages,
  por: ptMessages,
  "pt-BR": ptMessages,
};

const handleRouteChange = (url: any, { shallow }: { shallow: boolean }) => {
  analytics.page({
    path: url,
    url,
    shallow,
    isReactRouting: true,
  });
};

const ROUTE_CHANGE_START = "routeChangeStart";

CustomApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      isMobileDevice: isMobile(appContext?.ctx?.req?.headers?.["user-agent"]),
    },
  };
};

function CustomApp({ Component, pageProps }) {
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
  const tokenExpired = true; /* While SS token validation is not available, using Session.tokenExpired gives a different value when the app is hydrating, this causes bugs.  */

  return (
    <FamososAuthProvider authenticated={!tokenExpired}>
      <IntlProvider
        messages={messages}
        locale={locale}
        defaultLocale={defaultLocale}
      >
        <IsOnMobileScreenProvider
          initialIsOnMobileScreen={pageProps.isMobileDevice}
        >
          <Component {...pageProps} />
        </IsOnMobileScreenProvider>
      </IntlProvider>
    </FamososAuthProvider>
  );
}

export default wrapper.withRedux(CustomApp);
