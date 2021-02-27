import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts/page-container";
import { LoaderLayout } from "../../layouts/loader";
import { subscriptionsOperations } from "../../../state/ducks/subscriptions";
import SubscriptionCardSection from "../../layouts/subscription-card-section/index";
import Maybe from "../../common/helpers/maybe";

const ClientSubscriptions = ({
  getCelebritiesSubscribe,
  subscriptionList,
  isSubscriptionListCompletedFetch
}) => {
  useEffect(() => {
    getCelebritiesSubscribe();
  }, []);

  return (
    <PageContainer>
      <div className="container-client-subscriptions">
        <Maybe it={isSubscriptionListCompletedFetch} orElse={<LoaderLayout />}>
          <SubscriptionCardSection subscriptionList={subscriptionList} />
        </Maybe>
      </div>
    </PageContainer>
  );
};

// mapStateToProps
const mapStateToProps = (state) => ({
  subscriptionList: state.subscriptions.fetchUserSubscriptionsListReducer.data,
  isSubscriptionListCompletedFetch:
    state.subscriptions.fetchUserSubscriptionsListReducer.completed
});

// mapDispatchToProps
const mapDispatchToProps = {
  getCelebritiesSubscribe: subscriptionsOperations.fetchUserSubscriptionsList
};
const _ClientSubscriptions = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientSubscriptions);
export { _ClientSubscriptions as ClientSubscriptions };
