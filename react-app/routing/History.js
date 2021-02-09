// import { createBrowserHistory } from "history";
// import * as GTM from "../state/utils/gtm";

// const history = createBrowserHistory();
// history.listen((location) => {
//   window.scroll({ top: 0 });
//   const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT.toUpperCase();
//   window.analytics.page({
//     ...location,
//     path: location.pathname,
//     isReactRouting: true,
//     ENVIRONMENT,
//     userAgent: navigator.userAgent,
//     vendor: navigator.vendor,
//     receivedAt: new Date()
//   });
//   // GTM.tagManagerDataLayer("PAGE_VIEW", { , title: document.title });
// });

// history._pushRoute = (route) => {
//   GTM.tagManagerDataLayer("PAGE_VIEW", history.location);
//   history.push(route);
//   window.scroll({ top: 0 });
// };

const noOp = () => {};

const history = {
  _pushRoute: noOp,
  replace: noOp,
  push: noOp
};

export { history };
