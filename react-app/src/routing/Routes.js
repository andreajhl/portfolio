import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router";
// Paths
import * as PATHS from "./Paths";
// Pages
import * as PAGES from "../components/pages";
import { PrivateRoute } from "./PrivateRoute";
import { history } from "./History";

class MyRoutes extends Component {
  render() {
    return (
      <>
        <Router history={history}>
          <Switch>
            {/* ############### */}
            {/* GENERAL PATHS */}
            {/* ############### */}
            <Redirect from={PATHS.HOME_PATH} to={PATHS.ROOT_PATH} />
            <Route
              exact
              path={PATHS.ROOT_PATH}
              component={PAGES.CelebritiesPage}
            />
            <Route exact path={PATHS.BLOG} component={PAGES.BlogResults} />
            <Route exact path={PATHS.BLOG_ENTRY} component={PAGES.BlogEntry} />
            <Route
              exact
              path={PATHS.SEARCH_PATH}
              component={PAGES.CelebritiesResultsPage}
            />
            <Route exact path={PATHS.TRENDING} component={PAGES.TrendingPage} />
            <Route
              exact
              path={PATHS.CELEBRITY_PROFILE}
              component={PAGES.CelebrityProfilePage}
            />
            <Route
              exact
              path={PATHS.CELEBRITY_PROFILE_ERROR}
              component={PAGES.FourZeroFourCelebrityProfile}
            />
            <Route
              exact
              path={PATHS.CELEBRITY_PROFILE_CONTRACT}
              component={PAGES.CreateContractPage}
            />
            <PrivateRoute
              exact
              path={PATHS.HIRING_EDITOR}
              component={PAGES.EditContractPage}
            />
            <Route
              exact
              path={PATHS.CONTRACT_CREATED}
              component={PAGES.ContractCreatedPage}
            />
            <Route
              exact
              path={PATHS.CONTRACT_PENDING}
              component={PAGES.ContractCreatedPage}
            />
            <Route
              exact
              path={PATHS.PAYMENT_METHODS}
              component={PAGES.PaymentMethodsPage}
            />
            <Route
              exact
              path={PATHS.STRIPE_3D_SECURE_IFRAME}
              component={PAGES.ProcessStripe3DFormPage}
            />
            <Route
              exact
              path={PATHS.STRIPE_3D_SECURE_RESPONSE}
              component={PAGES.ProcessStripe3DResponsePage}
            />

            {/*AUTH*/}
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
            {/*END AUTH*/}
            {/*DOCS*/}
            <Route
              exact
              path={PATHS.POLICIES_PATH}
              component={PAGES.PoliciesPage}
            />
            <Route exact path={PATHS.TERMS_PATH} component={PAGES.TermsPage} />
            <Route exact path={PATHS.FAQS_PATH} component={PAGES.FaqsPage} />
            {/*END DOCS*/}
            {/*FORMS*/}
            <Route
              exact
              path={PATHS.CELEBRITY_REQUEST}
              component={PAGES.CelebrityRequestPage}
            />
            {/*END FORMS*/}
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
              path={PATHS.FEED_SUBSCRIPTION}
              component={PAGES.SubscriptionFeed}
            />
            <PrivateRoute
              exact
              path={PATHS.SUBSCRIPTION}
              component={PAGES.Subscription}
            />
            <PrivateRoute
              exact
              path={PATHS.SUBSCRIPTION_SUCCESS}
              component={PAGES.SubscriptionSuccess}
            />
            <PrivateRoute
              exact
              path={PATHS.CLIENT_FAVORITES}
              component={PAGES.ClientFavorites}
            />
            <Route
              exact
              path={PATHS.ACCOUNT_HIRING_PREVIEW}
              component={PAGES.ClientHiringPage}
            />
            <Route
              exact
              path={PATHS.HIRING_PREVIEW}
              component={PAGES.HiringPreviewPage}
            />
            <Route
              exact
              path={PATHS.HIRING_PREVIEW_WITHOUT_SESSION}
              component={PAGES.HiringPreviewPage}
            />
            <Route
              exact
              path={PATHS.AUTH_FLOW}
              component={PAGES.AuthFlowPage}
            />

            <Route
                exact
                path={PATHS.SESSION_REDIRECT}
                component={PAGES.SessionRedirectPage}
            />
            {/* ------- */}
            <Route
              exact
              path="/page-not-found/404/"
              component={PAGES.FourZeroFour}
            />
            <Redirect from="*" to="/page-not-found/404/" />
          </Switch>
        </Router>
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return { store };
};
const _MyRoutes = connect(mapStateToProps)(MyRoutes);
export { _MyRoutes as MyRoutes };
