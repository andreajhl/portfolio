import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import { PageContainer } from "../../layouts";
import MetaTags from "react-meta-tags";
import {CarouselAvailableSubscriptions, CelebrityFeedPosts} from '../../layouts';
import * as firestoreService from "../../../firebase/firestoreService";
import { LoaderLayout } from "../../layouts/loader";
import { subscriptionsOperations } from "../../../state/ducks/subscriptions";
import './styles.scss';

const NotPostsResults= () => {
  return (
    <div className='container-not-post-results'>
      <h4>
        Oops! Al parecer no hay publicaciones actualmente
        <span role='img' aria-label='crying-face'>
          😢
        </span>
      </h4>
    </div>
  );
}

const SubscriptionFeed = (props) => {
  const { getCelebritiesSubscribe, subscriptionList,isSubscriptionListCompletedFetch } = { ...props };
  const [postFetched, setPostFetched] = useState(false);
  const [posts, setPosts] = useState([]);
  const fetchPosts = async (celebrityId,concat = true) => {
    const documents = await firestoreService.getPostFromCelebrity('dev_posts',celebrityId)
    setPostFetched(true);
    concat
      ? setPosts((prevState) => prevState.concat(documents))
      : setPosts(documents); 
  };
  
  useEffect(() => {
    getCelebritiesSubscribe();
  }, []);

  useEffect(() => {
    if(isSubscriptionListCompletedFetch && subscriptionList.length > 1 && posts.length === 0){
      subscriptionList.forEach((celebrityData) =>
        fetchPosts(celebrityData.celebrityId)
      );
    }
  },[isSubscriptionListCompletedFetch]);

  const fetchPostFromCelebrity = (celebrityID) =>{
    fetchPosts(celebrityID,false)
  }

  return (
    <Fragment>
      <MetaTags>
        <title>
          Famosos.com - Videos personalizados de tus famosos favoritos.
        </title>
        <meta
          name='description'
          content='Las ultimas publicaciones de tus famosos favoritos.'
        />
      </MetaTags>
      <PageContainer>
        <Container className='container-subscription-feed'>
          <Row>
            <Col md='9' className='mx-auto'>
              {isSubscriptionListCompletedFetch ? (
                <CarouselAvailableSubscriptions
                  handlerSelectCelebrity={fetchPostFromCelebrity}
                  celebrities={subscriptionList}
                />
              ) : (
                <LoaderLayout />
              )}
              {isSubscriptionListCompletedFetch ? (
                posts.length > 0 ? (
                  <CelebrityFeedPosts
                    posts={posts}
                    subscriptionList={subscriptionList}
                  />
                ) : postFetched ? (
                  <NotPostsResults />
                ) : (
                  <LoaderLayout />
                )
              ) : null}
            </Col>
          </Row>
        </Container>
      </PageContainer>
    </Fragment>
  );
}

// mapStateToProps
const mapStateToProps = (state) => ({
  subscriptionList: state.subscriptions.fetchUserSubscriptionsListReducer.data,
  isSubscriptionListCompletedFetch: state.subscriptions.fetchUserSubscriptionsListReducer.completed
});


// mapDispatchToProps
const mapDispatchToProps = {
  getCelebritiesSubscribe: subscriptionsOperations.fetchUserSubscriptionsList
};
const _SubscriptionFeed = connect(mapStateToProps, mapDispatchToProps)(SubscriptionFeed);
export { _SubscriptionFeed as SubscriptionFeed };

