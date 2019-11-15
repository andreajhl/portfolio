import React, {Component} from 'react';
import {connect} from "react-redux";
import {Route, Router, Switch, Redirect} from 'react-router-dom';
// Paths
import * as PATHS from './Paths';
// Pages
import * as PAGES from "../components/pages";
import {PrivateRoute} from "./PrivateRoute";
import {history} from "./History";

class MyRoutes extends Component {

    render() {
        return (
            <>
                <Router history={history}>
                    <Redirect
                        from="/"
                        to={PATHS.ROOT_PATH}
                    />
                    <Redirect
                        from="/celebrities"
                        to={PATHS.ROOT_PATH}
                    />
                    <Switch>
                        {/* ############### */}
                        {/* GENERAL PATHS */}
                        {/* ############### */}
                        <Route
                            exact
                            strict
                            path={PATHS.ROOT_PATH}
                            component={PAGES.CelebritiesPage}
                        />
                        <Route
                            exact
                            path={PATHS.CELEBRITY_PROFILE}
                            component={PAGES.CelebrityProfilePage}
                        />
                        <Route
                            exact
                            path={PATHS.CONTRACT_CREATED}
                            component={PAGES.ContractCreatedPage}
                        />
                        <Route
                            exact
                            path={PATHS.SIGN_IN_PATH}
                            component={PAGES.SignInPage}
                        />
                        <Route
                            exact
                            path={PATHS.SIGN_IN_WITH_SPECIFIC_FORM_PATH}
                            component={PAGES.SignInPage}
                        />
                        <Route
                            exact
                            path={PATHS.SIGN_UP_PATH}
                            component={PAGES.SignUpPage}
                        />
                        <Route
                            exact
                            path={PATHS.SIGN_UP_WITH_SPECIFIC_FORM_PATH}
                            component={PAGES.SignUpPage}
                        />
                        <Route
                            exact
                            path={PATHS.VALIDATE_SECURITY_CODE}
                            component={PAGES.ValidateSecurityCodePage}
                        />
                        <Route
                            exact
                            path={PATHS.RESET_PASSWORD_PATH}
                            component={PAGES.ResetPasswordPage}
                        />
                        <Route
                            exact
                            path={PATHS.CHANGE_PASSWORD_PATH}
                            component={PAGES.ChangePasswordPage}
                        />
                        <PrivateRoute
                            exact
                            path={PATHS.CREATE_PASSWORD_PATH}
                            component={PAGES.CreatePasswordPage}
                        />
                        <PrivateRoute
                            exact
                            path={PATHS.COMPLETE_PROFILE_PATH}
                            component={PAGES.CompleteProfilePage}
                        />
                        <PrivateRoute
                            exact
                            path={PATHS.CLIENT_PROFILE}
                            component={PAGES.ClientProfilePage}
                        />
                        <PrivateRoute
                            exact
                            path={PATHS.CLIENT_HIRINGS}
                            component={PAGES.ClientHiringsPage}
                        />
                        <PrivateRoute
                            exact
                            path={PATHS.HIRING_PREVIEW}
                            component={PAGES.HiringPreviewPage}
                        />
                        <Route
                            exact
                            path={PATHS.HIRING_PREVIEW_WITHOUT_SESSION}
                            component={PAGES.HiringPreviewPage}
                        />
                        {/* ------- */}
                        <Route path="*" component={PAGES.NotFoundPage}/>
                    </Switch>
                </Router>
            </>
        );
    }
}

const mapStateToProps = (store) => {
    return {store};
};

const _MyRoutes = connect(mapStateToProps)(MyRoutes);

export {_MyRoutes as MyRoutes};
