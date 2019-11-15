import React, {Component} from 'react';
import {connect} from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {history} from "./History";
// Paths
import * as PATHS from './Paths';
// Pages
import * as PAGES from "../components/pages";
import {PrivateRoute} from "./PrivateRoute";


class Routes extends Component {

    render() {
        return (
            <>
                <BrowserRouter history={history}>
                    <Switch>
                        {/* ############### */}
                        {/* GENERAL PATHS */}
                        {/* ############### */}
                        <Route
                            exact
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
                </BrowserRouter>
            </>
        );
    }
}

const mapStateToProps = (store) => {
    return {store};
};

const _Routes = connect(mapStateToProps)(Routes);

export {_Routes as Routes};
