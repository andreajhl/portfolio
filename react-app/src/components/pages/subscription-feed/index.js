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

const NotPostsResults= ({message}) => {
  return (
    <div className='container-not-post-results'>
      <h4>
        {message}
        <span role='img' aria-label='crying-face'>
          😢
        </span>
      </h4>
    </div>
  );
}

const SubscriptionFeed = (props) => {
  const [filterRange, setFilterRange] = useState(null);
  const [currenChoice, setCurrenChoice] = useState(null);
  const {getCelebritiesSubscribe, subscriptionList,isSubscriptionListCompletedFetch } = { ...props };
  const [postFetched, setPostFetched] = useState(false);
  const [posts, setPosts] = useState([]);
  const handlerUpdateFilterRange= (value) => {
    setFilterRange(value);
  }
  const fetchPosts = async (celebrityId,concat = true) => {
    let documents = []
    const results = await firestoreService.getPostFromCelebrity(
      'dev_posts',
      celebrityId,
      filterRange,
      handlerUpdateFilterRange,
      posts.length === 0
    );
    if(results){
      documents = results;
    }
    console.log(results);
    setCurrenChoice(celebrityId);
    setPostFetched(true);
    concat
      ? setPosts((prevState) => prevState.concat(documents))
      : setPosts(documents); 
  };
  
  useEffect(() => {
    getCelebritiesSubscribe();
  }, []);

  // useEffect(() => {
  //   if(isSubscriptionListCompletedFetch && subscriptionList.length > 1 && posts.length === 0){
  //     subscriptionList.forEach((celebrityData) =>
  //       fetchPosts(celebrityData.celebrityId, false)
  //     );
  //   }
  // },[isSubscriptionListCompletedFetch]);

  const fetchPostFromCelebrity = (celebrityID) =>{
    console.log('clicked')
    fetchPosts(celebrityID, false);
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
                subscriptionList.length > 0 ? (
                  <CarouselAvailableSubscriptions
                    currentChoice={currenChoice}
                    handlerSelectCelebrity={fetchPostFromCelebrity}
                    celebrities={subscriptionList}
                  />
                ) : null
              ) : (
                <LoaderLayout />
              )}
              {isSubscriptionListCompletedFetch &&
              subscriptionList.length > 0 ? (
                posts.length > 0 ? (
                  <CelebrityFeedPosts
                    posts={posts}
                    subscriptionList={subscriptionList}
                  />
                ) : postFetched ? (
                  <NotPostsResults message='Oops! Al parecer no hay publicaciones actualmente' />
                ) : (
                  <LoaderLayout />
                )
              ) : isSubscriptionListCompletedFetch &&
                subscriptionList.length === 0 ? (
                <NotPostsResults message='Oops! Al parecer no estas suscrito actualmente a ningún Famoso Prime' />
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

