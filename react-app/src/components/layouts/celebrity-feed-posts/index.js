import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CelebritySharedPost from "../../containers/celebrity-shared-post/index";
import { LoaderLayout } from "../../layouts/loader";
import {
  SubscriptionPostCard,
  SubscriptionPostContent
} from "../../common/cards/subscription-post-card";

const getCelebrity = (subscriptionList, celebrityId) =>
  subscriptionList.find((celebrity) => celebrity.celebrityId === celebrityId);

const CelebrityFeedPosts = ({
  posts,
  subscriptionList,
  onFetchMorePost,
  hasMorePost,
  currentChoice
}) => {
  const celebrityData = getCelebrity(subscriptionList, currentChoice);
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
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              <b>
                Por ahora no hay más publicaciones
                {celebrityData?.celebrityFullName
                  ? ` de ${celebrityData?.celebrityFullName}`
                  : ""}
                .
              </b>
            </p>
          }
        >
          {posts
            ? posts.map(({ id, created, description, urls, celebrityId }) => {
                const {
                  celebrityAvatar,
                  celebrityFullName,
                  celebrityUsername
                } =
                  celebrityData || getCelebrity(subscriptionList, celebrityId);

                return (
                  <SubscriptionPostCard
                    avatar={celebrityAvatar}
                    fullName={celebrityFullName}
                    username={celebrityUsername}
                    date={created}
                    key={id}
                  >
                    <SubscriptionPostContent
                      urls={urls}
                      description={description}
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
  hasMorePost: true
};

export { CelebrityFeedPosts };
