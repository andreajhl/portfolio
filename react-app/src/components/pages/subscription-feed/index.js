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
import index from '../../containers/ocassions-options';

const getCelebritySelected = (celebritiesList, currentChoice) =>
  celebritiesList.find((celebrity) => celebrity.celebrityId === currentChoice);

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
  const [hasMorePost, setHasMorePost] = useState(true);
  const [indexFilter, setIndexFilter] = useState(null);
  const [currentChoice, setCurrentChoice] = useState(null);
  const {getCelebritiesSubscribe, subscriptionList,isSubscriptionListCompletedFetch } = { ...props };
  const [postFetched, setPostFetched] = useState(false);
  const [posts, setPosts] = useState([]);
  const handlerUpdateFilterRange= (value) => {
    setIndexFilter(value);
  }
  const handlerUpdateHasMorePost = (value)=>{
    setHasMorePost(value);
  }
  const fetchPosts = async (celebrityId,concat, indexFilter,isFirstQuery) => {
    let documents = []
    const results = await firestoreService.getPostFromCelebrity(
      'dev_posts',
      celebrityId,
      indexFilter,
      handlerUpdateFilterRange,
      isFirstQuery,
      handlerUpdateHasMorePost
    );
    if(results){
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
    if(isSubscriptionListCompletedFetch && subscriptionList.length > 1 && posts.length === 0){
      fetchPosts(subscriptionList[0].celebrityId, false, indexFilter, true);
    }
  },[isSubscriptionListCompletedFetch]);

  const fetchPostFromCelebrity = (celebrityID) =>{
    setIndexFilter(null);
    handlerUpdateHasMorePost(true);
    fetchPosts(celebrityID, false, null, true);
  }

  const handlerFetchMorePost = () =>{
    fetchPosts(currentChoice, true, indexFilter, false);
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
                    currentChoice={currentChoice}
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
                    hasMorePost={hasMorePost}
                    onFetchMorePost={handlerFetchMorePost}
                    posts={posts}
                    celebrityData={getCelebritySelected(
                      subscriptionList,
                      currentChoice
                    )}
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

