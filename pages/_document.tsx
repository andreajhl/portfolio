import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const isProdEnvironment =
      process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="theme-color" content="#fff" />
          <meta
            name="google-site-verification"
            content="-rnH5_p9oxmohFsI8i9w1lE-A48k-AGGRWevPanUiKE"
          />
          <link rel="canonical" href="https://famosos.com/" />
          <link
            rel="shortcut icon"
            href="/assets/img/favicon.png"
            type="image/ico"
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Famosos.com" />
          <meta property="og:video:type" content="video/mp4" />
          <meta property="og:video:width" content="400" />
          <meta property="og:video:height" content="400" />
          <meta
            name="robots"
            content={isProdEnvironment ? "index" : "noindex"}
          />
          <script src="https://js.stripe.com/v3/" />
        </Head>
        <body className="f-main-body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
