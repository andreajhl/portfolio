import React from 'react';
import './styles.scss';
import CelebritySharedPost from '../../containers/celebrity-shared-post/index';

const CelebrityFeedPosts = (props) => {
    const {posts} = props;
    return (
      <div className='celebrity-feed-posts'>
        <div className='celebrity-feed-posts__result'>
          {posts
            ? posts.map((post) => <CelebritySharedPost {...post} />)
            : null}
        </div>
      </div>
    );
}

export { CelebrityFeedPosts};
