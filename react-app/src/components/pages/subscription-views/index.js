import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts/page-container";
import { LoaderLayout } from "../../layouts/loader";
import { subscriptionsOperations } from "../../../state/ducks/subscriptions";
import Maybe from "../../common/helpers/maybe";
import SubscriptionsFilter from "../../subscription-feed/subscription-filter";
import { SubscriptionPostsHeader } from "../../layouts/subscription-posts";
import { SubscriptionFeedView } from "../subscription-feed-view";
import { SUBSCRIPTION_BENEFITS_VIEW_NAME } from "constants/paths";
import { SubscriptionBenefitsView } from "../subscription-benefits-view";
import { SubscriptionViewsNavTabs } from "../../layouts/subscription-views-nav-tabs";

function SubscriptionViews({
  isSubscriptionListCompletedFetch,
  subscriptionList,
  getCelebritiesSubscribe,
  currentView,
}) {
  const [currentChoice, setCurrentChoice] = useState(null);

  useEffect(() => {
    getCelebritiesSubscribe();
  }, []);

  return (
    <PageContainer>
      <Maybe it={isSubscriptionListCompletedFetch} orElse={<LoaderLayout />}>
        <SubscriptionViewsNavTabs />
        <SubscriptionPostsHeader>
          <Maybe it={subscriptionList.length > 0}>
            <SubscriptionsFilter
              currentChoice={currentChoice}
              onChangeCelebrity={setCurrentChoice}
              celebritiesSubscriptions={subscriptionList}
            />
          </Maybe>
        </SubscriptionPostsHeader>
      </Maybe>
      <Maybe
        it={currentView === SUBSCRIPTION_BENEFITS_VIEW_NAME}
        orElse={<SubscriptionFeedView currentChoice={currentChoice} />}
      >
        <SubscriptionBenefitsView />
      </Maybe>
    </PageContainer>
  );
}

const mapStateToProps = (state) => ({
  subscriptionList: state.subscriptions.fetchUserSubscriptionsListReducer.data,
  isSubscriptionListCompletedFetch:
    state.subscriptions.fetchUserSubscriptionsListReducer.completed,
});

const mapDispatchToProps = {
  getCelebritiesSubscribe: subscriptionsOperations.fetchUserSubscriptionsList,
};

const _SubscriptionViews = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionViews);

export { _SubscriptionViews as SubscriptionViews };
