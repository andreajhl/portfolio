import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.scss";
import configureStore from "./state";
import * as SENTRY from "./state/utils/sentry";
import {MyRoutes} from "./routing/Routes";
const reduxStore = configureStore( window.REDUX_INITIAL_DATA );

// Initialize Sentry
SENTRY.initialize();


ReactDOM.render(
    <Provider store={reduxStore}>
        <MyRoutes/>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
