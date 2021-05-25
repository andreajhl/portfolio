const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const { withSentryConfig } = require("@sentry/nextjs");
const { version } = require("./package.json");
const TRACK_SENTRY_ERRORS = process.env.TRACK_SENTRY_ERRORS || process.env.NEXT_PUBLIC_TRACK_SENTRY_ERRORS;

const nextConfig = {
  compress: true,
  images: {
    domains: [
      "famosos-media.s3.amazonaws.com",
      "famosos-output-media-testing.s3.amazonaws.com",
      "firebasestorage.googleapis.com",
      "d3dxo4xx2lwk55.cloudfront.net",
      "dqb0851cl2gjs.cloudfront.net",
      "restcountries.eu",
      "development.famosos.com",
      "via.placeholder.com"
    ]
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["es", "en"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "es"
  }
};

const withAnalyzerConfig = withBundleAnalyzer(nextConfig);

module.exports =
  TRACK_SENTRY_ERRORS === "true"
    ? withSentryConfig(withAnalyzerConfig, {
      release: `FamososFrontend-v${version}`
    })
    : withAnalyzerConfig;
