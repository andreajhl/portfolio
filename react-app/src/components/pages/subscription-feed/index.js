import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import { PageContainer } from "../../layouts";
import MetaTags from "react-meta-tags";
import {CarouselAvailableSubscriptions, CelebrityFeedPosts} from '../../layouts';
import * as firestoreService from "../../../firebase/firestoreService";
import { subscriptionsOperations } from "../../../state/ducks/subscriptions";
const SubscriptionFeed = (props) => {
  const { getCelebritiesSubscribe, subscriptionList,isSubscriptionListCompletedFetch } = { ...props };
  const [posts, setPosts] = useState([]);
  const fetchPosts = async (celebrityId,concat = true) => {
    const documents = await firestoreService.getPostFromCelebrity('dev_posts',celebrityId)
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
        <Container>
          <Row>
            <Col md='9' className='mx-auto'>
              <CarouselAvailableSubscriptions handlerSelectCelebrity={fetchPostFromCelebrity} celebrities={subscriptionList} />
              {posts.length > 0  && isSubscriptionListCompletedFetch ? <CelebrityFeedPosts posts={posts} subscriptionList={subscriptionList} /> : null}
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

