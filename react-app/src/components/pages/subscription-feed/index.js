import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { PageContainer } from "../../layouts/page-container";
import { CarouselAvailableSubscriptions } from "../../layouts/carousel-available-subscriptions";
import { CelebrityFeedPosts } from "../../layouts/celebrity-feed-posts";
import * as firestoreService from "../../../firebase/firestoreService";
import { LoaderLayout } from "../../layouts/loader";
import { subscriptionsOperations } from "../../../state/ducks/subscriptions";
import Maybe from "../../common/helpers/maybe";
import SubscriptionsFilter from "../../subscription-feed/subscription-filter";

import {
  SubscriptionPostsHeader,
  SubscriptionPostsSection
} from "../../layouts/subscription-posts";

import styled from "styled-components";

const MySubscriptionsTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 19px;
  font-weight: bold;
`;

const getCelebritySelected = (celebritiesList, currentChoice) =>
  celebritiesList.find((celebrity) => celebrity.celebrityId === currentChoice);

const NotPostsResults = ({ message }) => {
  return (
    <div className="container-not-post-results">
      <h4>
        {message}
        <span role="img" aria-label="crying-face">
          😢
        </span>
      </h4>
    </div>
  );
};

const SubscriptionFeed = (props) => {
  const [hasMorePost, setHasMorePost] = useState(true);
  const [indexFilter, setIndexFilter] = useState(null);
  const [currentChoice, setCurrentChoice] = useState(null);
  const {
    getCelebritiesSubscribe,
    subscriptionList,
    isSubscriptionListCompletedFetch
  } = { ...props };
  const [postFetched, setPostFetched] = useState(false);
  const [posts, setPosts] = useState([]);
  const handlerUpdateFilterRange = (value) => {
    setIndexFilter(value);
  };
  const handlerUpdateHasMorePost = (value) => {
    setHasMorePost(value);
  };
  const fetchPosts = async (celebrityId, concat, indexFilter, isFirstQuery) => {
    console.log(celebrityId);
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
    setCurrentChoice(celebrityId);
    setPostFetched(true);
    concat
      ? setPosts((prevState) => prevState.concat(documents))
      : setPosts(documents);
  };

  useEffect(() => {
    getCelebritiesSubscribe();
  }, []);

  useEffect(() => {
    if (
      isSubscriptionListCompletedFetch &&
      subscriptionList.length > 0 &&
      posts.length === 0
    ) {
      fetchPosts(subscriptionList[0].celebrityId, false, indexFilter, true);
    }
  }, [isSubscriptionListCompletedFetch]);

  const fetchPostFromCelebrity = (celebrityID) => {
    setIndexFilter(null);
    handlerUpdateHasMorePost(true);
    fetchPosts(celebrityID, false, null, true);
  };

  const handlerFetchMorePost = () => {
    fetchPosts(currentChoice, true, indexFilter, false);
  };

  return (
    <PageContainer>
      <Maybe it={isSubscriptionListCompletedFetch} orElse={<LoaderLayout />}>
        <SubscriptionPostsHeader>
          <MySubscriptionsTitle>Mis suscripciones</MySubscriptionsTitle>
          <Maybe it={subscriptionList.length > 0}>
            <SubscriptionsFilter
              currentChoice={currentChoice}
              handlerSelectCelebrity={fetchPostFromCelebrity}
              celebritiesSubscriptions={subscriptionList}
            />
          </Maybe>
        </SubscriptionPostsHeader>
      </Maybe>
      <SubscriptionPostsSection>
        {isSubscriptionListCompletedFetch && subscriptionList.length > 0 ? (
          posts.length > 0 ? (
            <CelebrityFeedPosts
              hasMorePost={hasMorePost}
              onFetchMorePost={handlerFetchMorePost}
              posts={posts}
              celebrityData={getCelebritySelected(
                subscriptionList,
                currentChoice
              )}
            />
          ) : postFetched ? (
            <NotPostsResults message="Oops! Al parecer no hay publicaciones actualmente" />
          ) : (
            <LoaderLayout />
          )
        ) : isSubscriptionListCompletedFetch &&
          subscriptionList.length === 0 ? (
          <NotPostsResults message="Oops! Al parecer no estas suscrito actualmente a ningún Famoso Prime" />
        ) : null}
      </SubscriptionPostsSection>
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
const _SubscriptionFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionFeed);
export { _SubscriptionFeed as SubscriptionFeed };
