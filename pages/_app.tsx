import React from "react";
import { wrapper } from "react-app/state/store";
import "react-app/styles.scss";

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

// App.getInitialProps = async ({ Component, ctx }) => {
//   const pageProps = Component.getInitialProps
//     ? await Component.getInitialProps(ctx)
//     : {};
//   return { pageProps };
// };

export default wrapper.withRedux(App);
