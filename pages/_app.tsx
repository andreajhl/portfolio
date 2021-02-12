import Auth0ProviderWithHistory from "lib/auth0-provider-with-history";
import React, { useEffect } from "react";
import { wrapper } from "react-app/src/state/store";
import { useRouter } from "next/router";
import { initialize as gtmInitialize } from "react-app/src/state/utils/gtm";
import "react-app/src/styles.scss";

const handleRouteChange = (url: any, { shallow }: { shallow: boolean }) => {
  const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT.toUpperCase();
  (window as any)?.analytics.page({
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

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    gtmInitialize();
    router.events.on(ROUTE_CHANGE_START, handleRouteChange);
    return () => {
      router.events.off(ROUTE_CHANGE_START, handleRouteChange);
    };
  }, []);

  return (
    <Auth0ProviderWithHistory>
      <Component {...pageProps} />
    </Auth0ProviderWithHistory>
  );
};

export default wrapper.withRedux(App);

// App.getInitialProps = async ({ Component, ctx }) => {
//   const pageProps = Component.getInitialProps
//     ? await Component.getInitialProps(ctx)
//     : {};
//   return { pageProps };
// }
