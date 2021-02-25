import React from "react";

import CelebritySharedPost from "../../containers/celebrity-shared-post/index";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoaderLayout } from "../../layouts/loader";

const CelebrityFeedPosts = (props) => {
  const { posts, celebrityData, onFetchMorePost, hasMorePost } = { ...props };
  const fetchMoreData = () => {
    onFetchMorePost();
  };
  return (
    <div className="celebrity-feed-posts">
      <div className="celebrity-feed-posts__result">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={hasMorePost}
          loader={<LoaderLayout />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>
                {`Al parecer ${celebrityData.celebrityFullName} no ha publicado nada mas por los momentos.`}{" "}
                <span role="img" aria-label="crying-face">
                  😢
                </span>
              </b>
            </p>
          }
        >
          {posts
            ? posts.map((post, index) => {
                return (
                  <CelebritySharedPost
                    key={`celebrity-shared-post-${index}`}
                    celebrityData={celebrityData}
                    {...post}
                  />
                );
              })
            : null}
        </InfiniteScroll>
      </div>
    </div>
  );
};

CelebritySharedPost.defaultProps = {
  posts: [],
  celebrityData: {},
  onFetchMorePost: () => {},
  hasMorePost: true
};

export { CelebrityFeedPosts };
