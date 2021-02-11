import Auth0ProviderWithHistory from "lib/auth0-provider-with-history";
import React from "react";
import { wrapper } from "react-app/src/state/store";
import "react-app/src/styles.scss";

const App = ({ Component, pageProps }) => {
  return (
    <Auth0ProviderWithHistory>
      <Component {...pageProps} />;
    </Auth0ProviderWithHistory>
  );
};

// App.getInitialProps = async ({ Component, ctx }) => {
//   const pageProps = Component.getInitialProps
//     ? await Component.getInitialProps(ctx)
//     : {};
//   return { pageProps };
// };

export default wrapper.withRedux(App);
