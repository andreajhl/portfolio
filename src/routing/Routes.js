import React, {Component} from 'react';
import {connect} from "react-redux";
import {HashRouter, Route, Switch} from 'react-router-dom';
import {history} from "./History";
// Paths
import * as PATHS from './Paths';
// Pages
import * as PAGES from "../components/pages";


class Routes extends Component {

    render() {
        return (
            <>
                <HashRouter history={history}>
                    <Switch>
                        {/* ############### */}
                        {/* GENERAL PATHS */}
                        {/* ############### */}
                        <Route
                            exact
                            path={PATHS.ROOT_PATH}
                            component={PAGES.LandingPage}
                        />
                        <Route
                            exact
                            path={PATHS.LOGIN_PATH}
                            component={PAGES.LoginPage}
                        />
                        {/* ------- */}
                        <Route path="*" component={PAGES.NotFoundPage}/>
                    </Switch>
                </HashRouter>
            </>
        );
    }
}

const mapStateToProps = (store) => {
    return {store};
};

const _Routes = connect(mapStateToProps)(Routes);

export {_Routes as Routes};
