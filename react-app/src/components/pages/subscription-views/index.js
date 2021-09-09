import React, { useEffect } from "react";
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
import { NotResults } from "../../layouts/not-results";
import { FormattedMessage } from "react-intl";
import useSubscriptionCurrentCelebrity from "lib/hooks/useSubscriptionCurrentCelebrity";
import { SubscriptionNextBenefitBanner } from "react-app/src/components/layouts/subscription-next-benefit-banner";
import { analytics } from "react-app/src/state/utils/gtm";

const byCelebrityId = (celebrityId) => (celebrity) =>
  celebrityId === celebrity.celebrityId;

const toOnlyCelebrityInfo = ({
  celebrityFullName,
  celebrityId,
  celebrityUsername,
}) => ({
  celebrityFullName,
  celebrityId,
  celebrityUsername,
});

function SubscriptionViews({
  isSubscriptionListCompletedFetch,
  subscriptionList,
  getCelebritiesSubscribe,
  currentView,
}) {
  const [currentChoice, setCurrentChoice] = useSubscriptionCurrentCelebrity();

  useEffect(() => {
    getCelebritiesSubscribe();
  }, []);

  const hasSubscriptions = subscriptionList.length > 0;

  function trackFilterChange(newChoice) {
    const viewName =
      currentView === SUBSCRIPTION_BENEFITS_VIEW_NAME ? "BENEFITS" : "FEED";
    analytics.track(`BACKSTAGE_${viewName}_CHANGE_FILTER`, {
      currentChoice,
      newChoice,
      filteredCelebrity: toOnlyCelebrityInfo(
        subscriptionList.find(byCelebrityId(newChoice))
      ),
      subscriptionList: subscriptionList.map(toOnlyCelebrityInfo),
    });
  }

  function changeCurrentChoice(newChoice) {
    trackFilterChange(newChoice);
    setCurrentChoice(newChoice);
  }

  return (
    <PageContainer showSearch={false}>
      <Maybe
        it={isSubscriptionListCompletedFetch}
        orElse={
          <div
            className="d-flex flex-column justify-content-center"
            style={{ minHeight: "40vh" }}
          >
            <LoaderLayout />
          </div>
        }
      >
        <SubscriptionViewsNavTabs />
        <Maybe it={currentView === SUBSCRIPTION_BENEFITS_VIEW_NAME}>
          <SubscriptionNextBenefitBanner />
        </Maybe>
        <SubscriptionPostsHeader>
          <Maybe it={hasSubscriptions}>
            <SubscriptionsFilter
              currentChoice={currentChoice}
              onChangeCelebrity={changeCurrentChoice}
              celebritiesSubscriptions={subscriptionList}
            />
          </Maybe>
        </SubscriptionPostsHeader>
      </Maybe>
      <Maybe
        it={isSubscriptionListCompletedFetch}
        orElse={
          <div
            className="d-flex flex-column justify-content-center"
            style={{ minHeight: "40vh" }}
          >
            <LoaderLayout />
          </div>
        }
      >
        <Maybe
          it={hasSubscriptions}
          orElse={
            <NotResults
              message={
                <FormattedMessage defaultMessage="Al parecer no estas suscrito actualmente a ningún Famosos Backstage" />
              }
            />
          }
        >
          <Maybe
            it={currentView === SUBSCRIPTION_BENEFITS_VIEW_NAME}
            orElse={<SubscriptionFeedView currentChoice={currentChoice} />}
          >
            <SubscriptionBenefitsView currentChoice={currentChoice} />
          </Maybe>
        </Maybe>
      </Maybe>
    </PageContainer>
  );
}

const mapStateToProps = (state) => ({
  subscriptionList:
    state.subscriptions.fetchUserSubscriptionsListReducer.data || [],
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
