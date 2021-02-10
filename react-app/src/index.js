import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import configureStore from "./state";
import * as SENTRY from "./state/utils/sentry";
import * as GTM from "./state/utils/gtm";
import { MyRoutes } from "./routing/Routes";

const jwt_decode = require("jwt-decode");
const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

// OLD SESSIONS VALIDATION
const token = window.localStorage.getItem("_a0_");
if (token) {
  const email = jwt_decode(token).email;
  const status = jwt_decode(token).status;
  if (
    email?.includes("myemail@") ||
    (email?.includes("@famosos.com") && email?.includes("Anonymous"))
  ) {
    window.localStorage.removeItem("_a0_");
  }
}

// Initialize Sentry
SENTRY.initialize();

// Initialize GTM
GTM.initialize();

/*ReactDOM.render(
    <Provider store={reduxStore}>
        <MyRoutes/>
    </Provider>,
    document.getElementById("root")
);*/

serviceWorker.unregister();

const render = (Component) => {
  return ReactDOM.render(
    <Provider store={reduxStore}>
      <Component />
    </Provider>,
    document.getElementById("root")
  );
};

render(MyRoutes);

if (module.hot) {
  module.hot.accept("./routing/Routes", () => {
    const NextApp = require("./routing/Routes").MyRoutes;
    render(NextApp);
  });
}
