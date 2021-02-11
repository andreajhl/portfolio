import React, { Component, Fragment, useState, useEffect } from "react";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts/page-container";

import { Container, Row, Col } from "react-bootstrap";
import MetaTags from "react-meta-tags";
import { PayPalCardForm } from "../../containers/paypal-card-form";
import { SubscriptionPayPalCardForm } from "../../containers/subscription-paypal-card-form";
import SubscriptionCheckoutSummary from "../../containers/subscription-checkout-summary";
import SubscriptionPlansOptions from "../../layouts/subscription-plans-options";
import { subscriptionsOperations } from "../../../state/ducks/subscriptions";
import { FEED_SUBSCRIPTION } from "../../../routing/Paths";

const isAlreadySubscribe = (subscriptionList, celebrityUsername) => {
  if (subscriptionList.length > 0) {
    const result = subscriptionList.filter(
      (subscription) => subscription.celebrityUsername === celebrityUsername
    );
    console.log(result);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

const Subscription = (props) => {
  const {
    getCelebrity,
    fetchCelebritySubscriptionPlans,
    celebrity,
    celebritySubscriptionPlans,
    isLoading,
    isLoadingPlans,
    getCelebritiesSubscribe,
    subscriptionList,
    isSubscriptionListCompletedFetch,
    history
  } = props;
  console.log(history);
  const [currentPlanSelected, setCurrentPlanSelected] = useState(null);
  const onSelectPlan = (planId) => {
    setCurrentPlanSelected(planId);
  };
  useEffect(() => {
    if (celebritySubscriptionPlans.length > 0) {
      setCurrentPlanSelected(celebritySubscriptionPlans[0].gatewayIdentifier);
    }
  }, [celebritySubscriptionPlans]);
  useEffect(() => {
    getCelebritiesSubscribe(props.match.params.celebrity_username);
    getCelebrity(props.match.params.celebrity_username, true);
    fetchCelebritySubscriptionPlans(props.match.params.celebrity_username);
  }, [props.match.params.celebrity_username]);

  return (
    <Fragment>
      <MetaTags>
        <title>
          Famosos.com - Videos personalizados de tus famosos favoritos.
        </title>
        <meta
          name="description"
          content="Un blog acerca de tus famosos favoritos que forman parte de nuestra plataforma. Entérate con quien puedes conectarte"
        />
      </MetaTags>
      <PageContainer>
        <Container>
          <Row>
            <div className="container-subscription-payment col-12 my-3 mx-auto c f-rounded f-shadow">
              <div className="container-subscription-payment__header">
                <h6>Resumen de la contratación</h6>
              </div>
              <div className="container-subscription-payment__summary">
                <SubscriptionCheckoutSummary
                  celebrityFullName={celebrity.fullName}
                  celebrityAvatar={celebrity.avatar}
                />
              </div>
              {isLoadingPlans ? null : celebritySubscriptionPlans.length > 0 ? (
                !isAlreadySubscribe(
                  subscriptionList,
                  props.match.params.celebrity_username
                ) ? (
                  <React.Fragment>
                    <div className="container-subscription-payment__options">
                      <SubscriptionPlansOptions
                        onOptionClicked={onSelectPlan}
                        currentPlanSelected={currentPlanSelected}
                        optionsList={celebritySubscriptionPlans}
                      />
                    </div>
                    <div
                      className={`container-subscription-payment__paypalForm ${
                        currentPlanSelected ? "" : "d-none"
                      }`}
                    >
                      {currentPlanSelected ? (
                        <React.Fragment>
                          <SubscriptionPayPalCardForm
                            planId={currentPlanSelected}
                          />
                        </React.Fragment>
                      ) : null}
                    </div>
                  </React.Fragment>
                ) : (
                  <div className="container-subscription-payment__not-available">
                    <h5>
                      Ya estas suscrito a este famoso
                      <span role="img" aria-label="smile-face">
                        😄
                      </span>
                    </h5>
                    <button
                      className="btn btn-primary"
                      onClick={() => props.history.push(FEED_SUBSCRIPTION)}
                    >
                      Ver mis suscripciones
                    </button>
                  </div>
                )
              ) : (
                <div className="container-subscription-payment__not-available">
                  <h5>
                    Actualmente este famoso no tiene planes habilitados
                    <span role="img" aria-label="crying-face">
                      😢
                    </span>
                  </h5>
                </div>
              )}
            </div>
          </Row>
        </Container>
      </PageContainer>
    </Fragment>
  );
};

// mapStateToProps
const mapStateToProps = (state) => ({
  subscriptionList: state.subscriptions.fetchUserSubscriptionsListReducer.data,
  isSubscriptionListCompletedFetch:
    state.subscriptions.fetchUserSubscriptionsListReducer.completed,
  isLoading: state.celebrities.getCelebrityReducer.loading,
  isLoadingPlans:
    state.celebrities.fetchCelebritySubscriptionPlansReducer.loading,
  celebrity: state.celebrities.getCelebrityReducer.data,
  celebritySubscriptionPlans:
    state.celebrities.fetchCelebritySubscriptionPlansReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  getCelebritiesSubscribe: subscriptionsOperations.fetchUserSubscriptionsList,
  getCelebrity: celebrityOperations.get,
  fetchCelebritySubscriptionPlans:
    celebrityOperations.fetchCelebritySubscriptionPlans
};
// Set propTypes
Subscription.propTypes = {};

// Set defaultProps
Subscription.defaultProps = {};

const _Subscription = connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscription);
export { _Subscription as Subscription };
