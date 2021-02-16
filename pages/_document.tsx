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
          {/* Global Site Code Pixel - Facebook Pixel  */}
          <script
            dangerouslySetInnerHTML={{
              __html: `!(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );
      fbq("init", "430558828300567");
      fbq("track", "PageView");`
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
          !(function () {
            var analytics = (window.analytics = window.analytics || []);
            if (!analytics.initialize)
              if (analytics.invoked)
                window.console &&
                  console.error &&
                  console.error("Segment snippet included twice.");
              else {
                analytics.invoked = !0;
                analytics.methods = [
                  "trackSubmit",
                  "trackClick",
                  "trackLink",
                  "trackForm",
                  "pageview",
                  "identify",
                  "reset",
                  "group",
                  "track",
                  "ready",
                  "alias",
                  "debug",
                  "page",
                  "once",
                  "off",
                  "on",
                  "addSourceMiddleware",
                  "addIntegrationMiddleware",
                  "setAnonymousId",
                  "addDestinationMiddleware"
                ];
                analytics.factory = function (e) {
                  return function () {
                    var t = Array.prototype.slice.call(arguments);
                    t.unshift(e);
                    analytics.push(t);
                    return analytics;
                  };
                };
                for (var e = 0; e < analytics.methods.length; e++) {
                  var key = analytics.methods[e];
                  analytics[key] = analytics.factory(key);
                }
                analytics.load = function (key, e) {
                  var t = document.createElement("script");
                  t.type = "text/javascript";
                  t.async = !0;
                  t.src =
                    "https://cdn.segment.com/analytics.js/v1/" +
                    key +
                    "/analytics.min.js";
                  var n = document.getElementsByTagName("script")[0];
                  n.parentNode.insertBefore(t, n);
                  analytics._loadOptions = e;
                };
                analytics.SNIPPET_VERSION = "4.13.1";
                analytics.load("QFYr0foJEBPV2edPGtHTqT5dpsxAUAPa");
                analytics.page({
                  ENV: "${String(
                    process.env.NEXT_PUBLIC_ENVIRONMENT
                  ).toUpperCase()}",
                  isReactRouting: false,
                  path: window.location.pathname,
                  userAgent: navigator.userAgent,
                  vendor: navigator.vendor,
                  receivedAt: new Date()
                });
              }
          })();
          `
            }}
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
