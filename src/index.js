import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import {Routes} from "./routing/Routes";
import {Provider} from "react-redux";

import configureStore from "./state";

const reduxStore = configureStore( window.REDUX_INITIAL_DATA );

ReactDOM.render(
    <Provider store={reduxStore}>
        <Routes/>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
