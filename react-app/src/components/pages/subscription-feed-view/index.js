import React, { useEffect, useState } from "react";
import { CelebrityFeedPosts } from "../../layouts/celebrity-feed-posts";
import { LoaderLayout } from "../../layouts/loader";
import { SubscriptionPostsSection } from "../../layouts/subscription-posts";
import { FormattedMessage } from "lib/custom-intl";
import * as firestoreService from "../../../firebase/firestoreService";
import { connect } from "react-redux";
import styles from "./styles.module.scss";

function NotPostsResults({ message }) {
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

const mapStateToProps = (state) => ({
  subscriptionList: state.subscriptions.fetchUserSubscriptionsListReducer.data,
  isSubscriptionListCompletedFetch:
    state.subscriptions.fetchUserSubscriptionsListReducer.completed,
});

function SubscriptionFeedView({
  isSubscriptionListCompletedFetch,
  subscriptionList,
  currentChoice,
}) {
  const [hasMorePost, setHasMorePost] = useState(true);
  const [indexFilter, setIndexFilter] = useState(null);
  const [postFetched, setPostFetched] = useState(false);
  const [posts, setPosts] = useState([]);
  const handlerUpdateFilterRange = (value) => {
    setIndexFilter(value);
  };
  const handlerUpdateHasMorePost = (value) => {
    setHasMorePost(value);
  };
  const fetchPosts = async (celebrityId, concat, indexFilter, isFirstQuery) => {
    let documents = [];
    const results = await firestoreService.getPostFromCelebrity(
      "dev_posts",
      celebrityId,
      indexFilter,
      handlerUpdateFilterRange,
      isFirstQuery,
      handlerUpdateHasMorePost
    );
    if (results) {
      documents = results;
    }

    setPostFetched(true);
    concat
      ? setPosts((prevState) => prevState.concat(documents))
      : setPosts(documents);
  };

  const subscriptionsIds = subscriptionList
    .map(({ celebrityId }) => celebrityId)
    .slice(0, 9);

  const handlerFetchMorePost = () => {
    fetchPosts(currentChoice || subscriptionsIds, true, indexFilter, false);
  };

  useEffect(() => {
    if (
      isSubscriptionListCompletedFetch &&
      subscriptionList.length > 0 &&
      posts.length === 0
    ) {
      fetchPosts(subscriptionsIds, false, indexFilter, true);
    }
  }, [isSubscriptionListCompletedFetch]);

  useEffect(() => {
    setIndexFilter(null);
    handlerUpdateHasMorePost(true);
    fetchPosts(currentChoice || subscriptionsIds, false, null, true);
  }, [currentChoice]);

  return (
    <SubscriptionPostsSection>
      {isSubscriptionListCompletedFetch && subscriptionList.length > 0 ? (
        posts.length > 0 ? (
          <CelebrityFeedPosts
            hasMorePost={hasMorePost}
            onFetchMorePost={handlerFetchMorePost}
            posts={posts}
            currentChoice={currentChoice}
            subscriptionList={subscriptionList}
          />
        ) : postFetched ? (
          <NotPostsResults message="Oops! Al parecer no hay publicaciones actualmente" />
        ) : (
          <LoaderLayout />
        )
      ) : isSubscriptionListCompletedFetch && subscriptionList.length === 0 ? (
        <NotPostsResults
          message={
            <FormattedMessage defaultMessage="Oops! Al parecer no estas suscrito actualmente a ningún Famoso Prime" />
          }
        />
      ) : null}
    </SubscriptionPostsSection>
  );
}

const _SubscriptionFeedView = connect(mapStateToProps)(SubscriptionFeedView);

export { _SubscriptionFeedView as SubscriptionFeedView };
