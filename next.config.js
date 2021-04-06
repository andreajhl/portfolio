const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

module.exports = withBundleAnalyzer({
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
    locales: ["es", "en", "pt"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "es"
  }
});
