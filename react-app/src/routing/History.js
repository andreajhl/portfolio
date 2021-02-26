import * as GTM from "../state/utils/gtm";
import Router from "next/router";

Router._pushRoute = function (route) {
  GTM.tagManagerDataLayer("PAGE_VIEW", this.asPath);
  this.push(route);
};

// Router.location = {
//   search: String(Router.asPath).replace(Router.pathname, "")
// };

export { Router as history };
