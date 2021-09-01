import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CelebritySharedPost from "../../containers/celebrity-shared-post/index";
import { LoaderLayout } from "../../layouts/loader";
import {
  SubscriptionPostCard,
  SubscriptionPostContent,
} from "../../common/cards/subscription-post-card";
import { PoweredByFamososBanner } from "../powered-by-famosos-banner";

const getCelebrity = (subscriptionList, celebrityId) =>
  subscriptionList.find((celebrity) => celebrity.celebrityId === celebrityId);

const CelebrityFeedPosts = ({
  posts,
  subscriptionList,
  onFetchMorePost,
  hasMorePost,
  currentChoice,
}) => {
  const celebrityData = getCelebrity(subscriptionList, currentChoice);

  return (
    <div className="celebrity-feed-posts">
      <div className="celebrity-feed-posts__result">
        <InfiniteScroll
          dataLength={posts.length}
          next={onFetchMorePost}
          hasMore={hasMorePost}
          loader={<LoaderLayout />}
          endMessage={<PoweredByFamososBanner />}
        >
          {posts
            ? posts.map((post) => {
                const {
                  celebrityAvatar,
                  celebrityFullName,
                  celebrityUsername,
                } =
                  celebrityData ||
                  getCelebrity(subscriptionList, post.celebrityId) ||
                  {};

                return (
                  <SubscriptionPostCard
                    avatar={celebrityAvatar}
                    fullName={celebrityFullName}
                    username={celebrityUsername}
                    post={post}
                    key={post.id}
                  >
                    <SubscriptionPostContent
                      items={post?.items}
                      description={post?.description}
                    />
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
  hasMorePost: true,
};

export { CelebrityFeedPosts };
