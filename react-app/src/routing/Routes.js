import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router";
// Paths
import * as PATHS from "./Paths";
// Pages
import * as PAGES from "../components/pages";
import { PrivateRoute } from "./PrivateRoute";
import { history } from "./History";
import Auth0ProviderWithHistory from "../../../lib/auth0-provider-with-history";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";

class MyRoutes extends Component {
  render() {
    return (
      <>
        <Router history={history}>
          <Auth0ProviderWithHistory>
            <Switch>
              {/* ############### */}
              {/* GENERAL PATHS */}
              {/* ############### */}
              {/* DONE */}
              <Redirect from={PATHS.HOME_PATH} to={PATHS.ROOT_PATH} />
              {/* DONE */}
              <Route
                exact
                path={PATHS.ROOT_PATH}
                component={PAGES.CelebritiesPage}
              />
              {/* DONE */}
              <Route exact path={PATHS.BLOG} component={PAGES.BlogResults} />
              {/* DONE: */}
              <Route
                exact
                path={PATHS.BLOG_ENTRY}
                component={PAGES.BlogEntry}
              />
              {/* DONE */}
              <Route
                exact
                path={PATHS.SEARCH_PATH}
                component={PAGES.CelebritiesResultsPage}
              />
              {/* DONE: */}
              <Route
                exact
                path={PATHS.TRENDING}
                component={PAGES.TrendingPage}
              />
              {/* DONE */}
              <Route
                exact
                path={PATHS.CELEBRITY_PROFILE}
                component={PAGES.CelebrityProfilePage}
              />
              {/* DONE */}
              <Route
                exact
                path={PATHS.CELEBRITY_PROFILE_ERROR}
                component={PAGES.FourZeroFourCelebrityProfile}
              />
              {/* DONE: */}
              <Route
                exact
                path={PATHS.CELEBRITY_PROFILE_CONTRACT}
                component={PAGES.CreateContractPage}
              />
              {/* DONE: */}
              <PrivateRoute
                exact
                path={PATHS.HIRING_EDITOR}
                component={PAGES.EditContractPage}
              />
              {/* DONE: */}
              <Route
                exact
                path={PATHS.CONTRACT_CREATED}
                component={PAGES.ContractCreatedPage}
              />
              {/* DONE: */}
              <Route
                exact
                path={PATHS.CONTRACT_PENDING}
                component={PAGES.ContractCreatedPage}
              />
              {/* DONE: */}
              <PrivateRoute
                exact
                path={PATHS.PAYMENT_METHODS}
                component={PAGES.PaymentMethodsPage}
              />
              {/* TOBEFORE */}
              <Route
                exact
                path={PATHS.STRIPE_3D_SECURE_IFRAME}
                component={PAGES.ProcessStripe3DFormPage}
              />
              {/* TOBEFORE */}
              <Route
                exact
                path={PATHS.STRIPE_3D_SECURE_RESPONSE}
                component={PAGES.ProcessStripe3DResponsePage}
              />{" "}
              {/*AUTH*/}
              {/*DONE*/}
              <Route
                exact
                path={PATHS.SIGN_IN_PATH}
                component={PAGES.SignInPage}
              />
              {/* TODO: */}
              <Route
                exact
                path={PATHS.AUTH_SUCCESS}
                component={PAGES.AuthSuccess}
              />
              {/*END AUTH*/}
              {/*DOCS*/}
              {/*DONE*/}
              <Route
                exact
                path={PATHS.POLICIES_PATH}
                component={PAGES.PoliciesPage}
              />
              {/*DONE*/}
              <Route
                exact
                path={PATHS.TERMS_PATH}
                component={PAGES.TermsPage}
              />
              {/*DONE*/}
              <Route exact path={PATHS.FAQS_PATH} component={PAGES.FaqsPage} />
              {/*END DOCS*/}
              {/*FORMS*/}
              {/* DONE: */}
              <Route
                exact
                path={PATHS.CELEBRITY_REQUEST}
                component={PAGES.CelebrityRequestPage}
              />{" "}
              {/*END FORMS*/}
              {/* DONE: */}
              <PrivateRoute
                exact
                path={PATHS.CLIENT_PROFILE}
                component={PAGES.ClientProfilePage}
              />
              {/* DONE: */}
              <PrivateRoute
                exact
                path={PATHS.CLIENT_HIRINGS}
                component={PAGES.ClientHiringsPage}
              />
              {/* DONE: */}
              <PrivateRoute
                exact
                path={PATHS.CLIENT_SUBSCRIPTIONS}
                component={PAGES.ClientSubscriptions}
              />
              {/* DONE: */}
              <PrivateRoute
                exact
                path={PATHS.FEED_SUBSCRIPTION}
                component={PAGES.SubscriptionFeed}
              />
              {/* DONE: */}
              <PrivateRoute
                exact
                path={PATHS.SUBSCRIPTION}
                component={PAGES.Subscription}
              />
              {/* DONE: */}
              <PrivateRoute
                exact
                path={PATHS.SUBSCRIPTION_SUCCESS}
                component={PAGES.SubscriptionSuccess}
              />
              {/* DONE: */}
              <PrivateRoute
                exact
                path={PATHS.CLIENT_FAVORITES}
                component={PAGES.ClientFavorites}
              />
              {/* DONE: */}
              <Route
                exact
                path={PATHS.ACCOUNT_HIRING_PREVIEW}
                component={PAGES.ClientHiringPage}
              />
              {/* DONE: */}
              <Route
                exact
                path={PATHS.HIRING_PREVIEW}
                component={PAGES.HiringPreviewPage}
              />
              {/* DONE: */}
              <Route
                exact
                path={PATHS.HIRING_PREVIEW_WITHOUT_SESSION}
                component={PAGES.HiringPreviewPage}
              />
              {/* DONE */}
              {/* ------- */}
              <Route
                exact
                path="/page-not-found/404/"
                component={PAGES.FourZeroFour}
              />
              <Redirect from="*" to="/page-not-found/404/" />
            </Switch>
          </Auth0ProviderWithHistory>
        </Router>
      </>
    );
  }
}

// const mapStateToProps = (store) => {
//   return { store };
// };
const _MyRoutes = MyRoutes;
export { _MyRoutes as MyRoutes };
