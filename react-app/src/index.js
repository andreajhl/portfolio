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
import { Session } from "./state/utils/session";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const session = new Session();
session.isDummy();

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
