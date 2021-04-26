import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import setUserLocationCookie from "../lib/setUserLocationCookie";
import isMobile from "lib/utils/isMobile";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    await setUserLocationCookie(ctx);
    return {
      ...initialProps,
      isMobile: isMobile(ctx?.req?.headers?.["user-agent"]),
    };
  }

  render() {
    const isProdEnvironment =
      process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

    const { isMobile } = this.props as any;

    return (
      <Html className={isMobile ? "" : "desktop"}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="theme-color" content="#fff" />
          <meta
            name="google-site-verification"
            content="-rnH5_p9oxmohFsI8i9w1lE-A48k-AGGRWevPanUiKE"
          />
          {/* <!-- Facebook --> */}
          <meta
            name="facebook-domain-verification"
            content="ta1dz0xy5fjizha2ii49to5aw9dvfk"
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
          {/* Global Site Code Pixel - Facebook Pixel  */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', "430558828300567");fbq("track", "PageView");`,
            }}
          />
          <noscript>
            <img
              alt="Facebook Pixel"
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=430558828300567&ev=PageView
      &noscript=1"
            />
          </noscript>
          {/* END Global Site Code Pixel - Facebook Pixel  */}
          {/* Segment Code Start */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
          !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
          analytics.load("QFYr0foJEBPV2edPGtHTqT5dpsxAUAPa");
          analytics.page({
            ENV: "${String(process.env.NEXT_PUBLIC_ENVIRONMENT).toUpperCase()}",
            isReactRouting: false,
            path: window.location.pathname,
            userAgent: navigator.userAgent,
            vendor: navigator.vendor,
            receivedAt: new Date()
          });
          }}();`,
            }}
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
          />
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
