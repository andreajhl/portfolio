import React, { useEffect, useState } from "react";
import { CelebrityFeedPosts } from "../../layouts/celebrity-feed-posts";
import { LoaderLayout } from "../../layouts/loader";
import { SubscriptionPostsSection } from "../../layouts/subscription-posts";
import { FormattedMessage } from "lib/custom-intl";
import { connect } from "react-redux";
import { listSubscriptionPosts } from "react-app/src/state/ducks/subscriptions/actions";
import Maybe from "../../common/helpers/maybe";
import { NotResults } from "../../layouts/not-results";

const offsetInitialValue = 0;
const resultsLimit = 5;

function mapStateToProps({ subscriptions }) {
  const subscriptionList = subscriptions.fetchUserSubscriptionsListReducer.data;

  const { loading, data } = subscriptions.listSubscriptionPostsReducer;

  return {
    subscriptionList,
    postFetchIsLoading: loading,
    subscriptionPosts: data?.results || [],
    totalResults: data?.totalResults,
  };
}

const mapDispatchToProps = { listSubscriptionPosts };

function SubscriptionFeedView({
  listSubscriptionPosts,
  subscriptionList,
  subscriptionPosts,
  postFetchIsLoading,
  totalResults,
  currentChoice,
}) {
  const [offset, setOffset] = useState(offsetInitialValue);
  const celebrityId = currentChoice?.toString?.();

  useEffect(() => {
    listSubscriptionPosts({
      offset,
      limit: resultsLimit,
      celebrityId,
    });
  }, [celebrityId, listSubscriptionPosts, offset]);

  useEffect(() => {
    setOffset(offsetInitialValue);
  }, [celebrityId]);

  function fetchMoreData() {
    setOffset((offset) => {
      const nextOffset = offset + resultsLimit;
      const newOffset = nextOffset < totalResults ? nextOffset : totalResults;
      return newOffset;
    });
  }

  const hasPosts = subscriptionPosts?.length > 0;
  const showLoading = offset <= 0 && postFetchIsLoading;

  return (
    <SubscriptionPostsSection>
      <Maybe it={!showLoading} orElse={<LoaderLayout />}>
        <Maybe
          it={hasPosts}
          orElse={
            <NotResults
              message={
                <FormattedMessage defaultMessage="Al parecer no hay publicaciones actualmente" />
              }
            />
          }
        >
          <CelebrityFeedPosts
            hasMorePost={subscriptionPosts?.length < totalResults}
            onFetchMorePost={fetchMoreData}
            posts={subscriptionPosts}
            currentChoice={currentChoice}
            subscriptionList={subscriptionList}
          />
        </Maybe>
      </Maybe>
    </SubscriptionPostsSection>
  );
}

const _SubscriptionFeedView = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionFeedView);

export { _SubscriptionFeedView as SubscriptionFeedView };
