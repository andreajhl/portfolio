import React from 'react';
import './styles.scss';
import CelebritySharedPost from '../../containers/celebrity-shared-post/index';

const CelebrityFeedPosts = () => {
    return (
      <div className='celebrity-feed-posts'>
        <div className='celebrity-feed-posts__result'>
          <CelebritySharedPost />
        </div>
        <div className='celebrity-feed-posts__result'>
          <CelebritySharedPost />
        </div>
        <div className='celebrity-feed-posts__result'>
          <CelebritySharedPost />
        </div>
        <div className='celebrity-feed-posts__result'>
          <CelebritySharedPost />
        </div>
        <div className='celebrity-feed-posts__result'>
          <CelebritySharedPost />
        </div>
      </div>
    );
}

export { CelebrityFeedPosts};
