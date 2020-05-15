import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {Session} from "../state/utils/session";
import * as PATHS from "./Paths"

const checkSession = (Component, props, groups, requireClientID) => {

    const session = new Session();

    const redirectToLogin = <Redirect to={{pathname: PATHS.SIGN_IN_PATH, state: {from: props.location}}}/>;
    // const redirectToNotFound = <Redirect to={{pathname: PATHS.NOT_FOUND_PATH, state: {from: props.location}}}/>;
    // const redirectToNotAuthorized = <Redirect to={{pathname: PATHS.NOT_AUTHORIZED_PATH, state: {from: props.location}}}/>;
    // const redirectToHome = <Redirect to={{pathname: PATHS.ROOT_PATH, state: {from: props.location}}}/>;
    const renderComponent = <Component {...props} />;

    if (!session.getSession() || session.tokenExpired()) {
        return redirectToLogin
    } else {
        return renderComponent
    }

};

export const PrivateRoute = ({component: Component, groups, requireClientID, ...rest}) => (
    <Route {...rest} render={props => (checkSession(Component, props, groups, requireClientID))}/>
);
