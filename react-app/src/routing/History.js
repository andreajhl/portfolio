import * as GTM from "../state/utils/gtm";

// history.listen((location) => {
//   window.scroll({ top: 0 });
//   const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT.toUpperCase();
//   window.analytics.page({
//     ...location,
//     path: location.pathname,
//     isReactRouting: true,
//     ENVIRONMENT,
//     userAgent: navigator.userAgent,
//     vendor: navigator.vendor,
//     receivedAt: new Date()
//   });
// });

import Router from "next/router";

Router._pushRoute = function (route) {
  GTM.tagManagerDataLayer("PAGE_VIEW", this.asPath);
  this.push(route);
};

export { Router as history };
