import React from 'react';
import './styles.scss';
import CelebritySharedPost from '../../containers/celebrity-shared-post/index';
import InfiniteScroll from "react-infinite-scroll-component";
import { LoaderLayout } from "../../layouts/loader";


const CelebrityFeedPosts = (props) => {
    const {posts,subscriptionList} = {...props};
    const getCelebrityDataFromSubscriptionList = (idCelebrity) =>{      
     return subscriptionList.filter(
       (celebrity) => celebrity.celebrityId === idCelebrity
     )[0];   
    }
    const fetchMoreData= () =>{
      console.log('fetch data')
    }
    return (
      <div className='celebrity-feed-posts'>
        <div className='celebrity-feed-posts__result'>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<LoaderLayout />}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {posts
              ? posts.map((post, index) => {
                  return (
                    <CelebritySharedPost
                      key={`celebrity-shared-post-${index}`}
                      celebrityData={getCelebrityDataFromSubscriptionList(
                        post.celebrityId
                      )}
                      {...post}
                    />
                  );
                })
              : null}
          </InfiniteScroll>
        </div>
      </div>
    );
}

export { CelebrityFeedPosts};
