import React from 'react';
import './styles.scss';
import CelebritySharedPost from '../../containers/celebrity-shared-post/index';

const CelebrityFeedPosts = (props) => {
    const {posts,subscriptionList} = {...props};
    const getCelebrityDataFromSubscriptionList = (idCelebrity) =>{      
     return subscriptionList.filter(
       (celebrity) => celebrity.celebrityId === idCelebrity
     )[0];  
      
    }
    return (
      <div className='celebrity-feed-posts'>
        <div className='celebrity-feed-posts__result'>
          {posts
            ? posts.map((post,index) => {
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
        </div>
      </div>
    );
}

export { CelebrityFeedPosts};
