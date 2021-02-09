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
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
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

          <title key="title">
            Famosos.com - Videos personalizados de tus famosos favoritos.
          </title>
          <meta
            property="og:title"
            content="Famosos.com - Videos personalizados de tus famosos favoritos."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.famosos.com" />
          <meta
            property="og:image"
            content="/assets/img/famosos-share-icon.png"
          />
          <meta property="og:site_name" content="Famosos.com" />
          <meta
            property="og:description"
            content="Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas."
          />

          <meta
            property="og:video"
            content="https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
          />
          <meta
            property="og:video:url"
            content="https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
          />
          <meta
            property="og:video:secure_url"
            content="https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
          />
          <meta property="og:video:type" content="video/mp4" />
          <meta property="og:video:width" content="400" />
          <meta property="og:video:height" content="400" />

          <meta
            name="robots"
            content={isProdEnvironment ? "index" : "noindex"}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
