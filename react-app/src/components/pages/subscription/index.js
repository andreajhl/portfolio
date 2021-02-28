import React, { useState, useEffect } from "react";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts/page-container";
import { Container, Row } from "react-bootstrap";
import { SubscriptionPayPalCardForm } from "../../containers/subscription-paypal-card-form";
import SubscriptionCheckoutSummary from "../../containers/subscription-checkout-summary";
import SubscriptionPlansOptions from "../../layouts/subscription-plans-options";
import { subscriptionsOperations } from "../../../state/ducks/subscriptions";
import { FEED_SUBSCRIPTION } from "../../../routing/Paths";
import { useRouter } from "next/router";
import isAlreadySubscribe from "../../../utils/isAlreadySubscribe";

const Subscription = (props) => {
  const {
    query: { celebrity_username }
  } = useRouter();
  const {
    getCelebrity,
    fetchCelebritySubscriptionPlans,
    celebrity,
    celebritySubscriptionPlans,
    isLoadingPlans,
    getCelebritiesSubscribe,
    subscriptionList,
    history,
    router
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
    if (!celebrity_username) return;
    getCelebritiesSubscribe(celebrity_username);
    getCelebrity(celebrity_username, true);
    fetchCelebritySubscriptionPlans(celebrity_username);
  }, [celebrity_username]);

  return (
    <PageContainer>
      <Container>
        <Row>
          <div className="container-subscription-payment col-12 my-4 mx-auto f-rounded f-shadow">
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
              !isAlreadySubscribe(subscriptionList, celebrity_username) ? (
                <>
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
                      <>
                        <SubscriptionPayPalCardForm
                          planId={currentPlanSelected}
                        />
                      </>
                    ) : null}
                  </div>
                </>
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
