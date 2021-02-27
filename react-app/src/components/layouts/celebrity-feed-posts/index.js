import React from "react";

import CelebritySharedPost from "../../containers/celebrity-shared-post/index";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoaderLayout } from "../../layouts/loader";

import Maybe from "../../common/helpers/maybe";
import { SubscriptionPostCard } from "../../common/cards/subscription-posts-card";
import {
  PostImage,
  PostMedia,
  PostText
} from "../../common/cards/subscription-posts-card/styles";

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
            ? posts.map(({ celebrityId, created, description, urls }) => {
                const { celebrityAvatar, celebrityFullName } =
                  celebrityData || {};

                const media = urls?.[0] || {};

                return (
                  <SubscriptionPostCard
                    avatar={celebrityAvatar}
                    fullName={celebrityFullName}
                    date={created}
                  >
                    <Maybe
                      it={media.index !== undefined && media.type === "image"}
                    >
                      <PostMedia>
                        <Maybe it={media.type === "image"}>
                          <PostImage src={media.value} />
                        </Maybe>
                      </PostMedia>
                    </Maybe>
                    <Maybe it={description}>
                      <PostText>{description}</PostText>
                    </Maybe>
                  </SubscriptionPostCard>
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
