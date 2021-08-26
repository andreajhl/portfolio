import React, { useEffect, useState } from "react";
import { CelebrityFeedPosts } from "../../layouts/celebrity-feed-posts";
import { LoaderLayout } from "../../layouts/loader";
import { SubscriptionPostsSection } from "../../layouts/subscription-posts";
import { FormattedMessage } from "lib/custom-intl";
import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { listSubscriptionPosts } from "react-app/src/state/ducks/subscriptions/actions";
import Maybe from "../../common/helpers/maybe";

const offsetInitialValue = 0;
const resultsLimit = 2;

export function NotPostsResults({ message }) {
  return (
    <div className={styles.ContainerNotPostResults}>
      <h4>
        {message}
        <span role="img" aria-label="crying-face">
          😢
        </span>
      </h4>
    </div>
  );
}

function mapStateToProps({ subscriptions }) {
  const isSubscriptionListCompletedFetch =
    subscriptions.fetchUserSubscriptionsListReducer.completed;
  const subscriptionList = subscriptions.fetchUserSubscriptionsListReducer.data;

  const { loading, data } = subscriptions.listSubscriptionPostsReducer;

  return {
    isSubscriptionListCompletedFetch,
    subscriptionList,
    postFetchIsLoading: loading,
    subscriptionPosts: data?.results || [],
    totalResults: data?.totalResults,
  };
}

const mapDispatchToProps = { listSubscriptionPosts };

function SubscriptionFeedView({
  listSubscriptionPosts,
  isSubscriptionListCompletedFetch,
  subscriptionList,
  subscriptionPosts,
  postFetchIsLoading,
  totalResults,
  currentChoice,
}) {
  const [offset, setOffset] = useState(offsetInitialValue);
  const hasSubscriptions =
    isSubscriptionListCompletedFetch && subscriptionList?.length > 0;
  const canFetchPosts = isSubscriptionListCompletedFetch && hasSubscriptions;

  useEffect(() => {
    if (!canFetchPosts) return;
    listSubscriptionPosts({
      offset,
      limit: resultsLimit,
      celebrityId: currentChoice?.join?.(","),
    });
  }, [canFetchPosts, currentChoice, offset]);

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
      <Maybe it={isSubscriptionListCompletedFetch} orElse={<LoaderLayout />}>
        <Maybe
          it={hasSubscriptions}
          orElse={
            <NotPostsResults
              message={
                <FormattedMessage defaultMessage="Oops! Al parecer no estas suscrito actualmente a ningún Famoso Prime" />
              }
            />
          }
        >
          <Maybe it={!showLoading} orElse={<LoaderLayout />}>
            <Maybe
              it={hasPosts}
              orElse={
                <NotPostsResults message="Oops! Al parecer no hay publicaciones actualmente" />
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
