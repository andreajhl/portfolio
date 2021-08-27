import { CommentCollection } from "desktop-app/components/common/comment-collection";
import { CommentCreator } from "desktop-app/components/common/comment-creator";
import { CommentIcon } from "desktop-app/components/common/icons";
import useAddSubscriptionPostComment from "lib/hooks/useAddSubscriptionPostComment";
import useListSubscriptionPostComments from "lib/hooks/useListSubscriptionPostComments";
import useSubscriptionPostLove from "lib/hooks/useSubscriptionPostLike";
import React, { ReactNode, useState } from "react";
import {
  PostSlideshow,
  VideoLayout,
} from "react-app/src/components/containers/celebrity-shared-post";
import { LoaderLayout } from "react-app/src/components/layouts/loader";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { CELEBRITY_PROFILE, SUBSCRIPTION } from "react-app/src/routing/Paths";
import {
  SubscriptionPostType,
  SubscriptionPostUrlType,
} from "react-app/src/types/subscriptionPostType";
import { getFirstName } from "react-app/src/utils/getFirstName";
import { FormattedMessage } from "react-intl";
import Maybe from "../../helpers/maybe";
import { Link } from "../../routing/link";
import {
  PostCard,
  PostBody,
  PostHiddenDiv,
  PostHiddenImage,
  PostHiddenText,
  PostSubscribeButton,
  PostFooter,
  PostInteractionCount,
  PostHeader,
  PostDate,
  PostMedia,
  PostImage,
  PostCounterSection,
  PostText,
  PostLikeIcon,
  PostReactionButton,
} from "./styles";
import { useAuth } from "lib/famosos-auth";

type SubscriptionPostCardProps = {
  className?: string;
  children?: ReactNode;
  post: SubscriptionPostType;
} & SubscriptionPostHeaderProps;

export const SubscriptionPostCard = ({
  className,
  children = null,
  avatar,
  username,
  fullName,
  post,
}: SubscriptionPostCardProps) => {
  return (
    <PostCard className={className}>
      <SubscriptionPostHeader
        avatar={avatar}
        fullName={fullName}
        date={post.processingDate}
        username={username}
      />
      <PostBody>{children}</PostBody>
      <SubscriptionPostFooter post={post} />
    </PostCard>
  );
};

type SubscriptionPostHiddenContentProps = {
  imageSrc: string;
  fullName: string;
  username: string;
  price?: ReactNode;
  description: string;
};

export const SubscriptionPostHiddenContent = ({
  imageSrc,
  fullName,
  username,
  price = 0,
  description,
}: SubscriptionPostHiddenContentProps) => {
  const firstName = getFirstName(fullName);

  const subscriptionPath = SUBSCRIPTION.replace(
    ":celebrity_username",
    username
  );

  return (
    <>
      <Maybe it={typeof imageSrc === "string"}>
        <PostMedia as={Link} href={subscriptionPath}>
          <PostHiddenImage src={imageSrc} />
          <PostHiddenDiv imageSrc={imageSrc}>
            <img src="/assets/img/lock.svg" alt="Cerradura" />
            <PostHiddenText>
              <FormattedMessage
                defaultMessage="Únete al club de {firstName} para desbloquear este contenido"
                values={{ firstName }}
              />
            </PostHiddenText>
            <PostSubscribeButton>
              <FormattedMessage
                defaultMessage="Suscríbete ahora por {price}/mes"
                values={{ price }}
              />
            </PostSubscribeButton>
          </PostHiddenDiv>
        </PostMedia>
      </Maybe>
      <Maybe it={Boolean(description)}>
        <PostText>{description}</PostText>
      </Maybe>
    </>
  );
};

export const SubscriptionPostContent = ({
  items,
  description,
}: Pick<SubscriptionPostType, "items" | "description">) => (
  <>
    <Maybe it={items.length > 0}>
      <PostMedia>
        <Maybe
          it={items.length > 1}
          orElse={<PostSingleMedia media={items[0]} />}
        >
          <PostSlideshow urls={items} />
        </Maybe>
      </PostMedia>
    </Maybe>
    <Maybe it={Boolean(description)}>
      <PostText>{description}</PostText>
    </Maybe>
  </>
);

export const PostSingleMedia = ({
  media: { mediaType, mediaUrl },
}: {
  media: SubscriptionPostUrlType;
}) => {
  const [videoIsMuted, setVideoIsMuted] = useState(true);
  const [slideshowIsPlaying, setSlideshowIsPlaying] = useState(false);
  return (
    <Maybe
      it={mediaType === "IMAGE"}
      orElse={
        <VideoLayout
          videoIsMuted={videoIsMuted}
          setVideoIsMuted={setVideoIsMuted}
          media={{ value: mediaUrl }}
          classNameSlideLayoutVideo="celebrity-shared-post__media-files__item-video"
          setSlideshowIsPlaying={setSlideshowIsPlaying}
        />
      }
    >
      <PostImage src={mediaUrl} />
    </Maybe>
  );
};

type SubscriptionPostFooterProps = {
  post: SubscriptionPostType;
};

const SubscriptionPostFooter = ({ post }: SubscriptionPostFooterProps) => {
  const [lovedCount, setLovedCount] = useState(post?.loved || 0);
  const [commentCount, setCommentCount] = useState(post?.comments || 0);
  const [isLoved, toggleIsLoved] = useSubscriptionPostLove(post);
  const [showCommentsSection, setShowCommentsSection] = useState(false);

  function displayCommentsSection() {
    setShowCommentsSection(true);
  }

  async function handleLikeClick() {
    if (!isLoved) displayCommentsSection();
    await toggleIsLoved();
    setLovedCount((previousLovedCount) =>
      isLoved ? previousLovedCount - 1 : previousLovedCount + 1
    );
  }

  function onCommentAdded() {
    setCommentCount((count) => count + 1);
  }

  return (
    <PostFooter>
      <PostCounterSection>
        <PostLikeIcon
          isFavoriteClassName="post-is-liked"
          color="black"
          isFavorite={isLoved}
          width="20px"
          onClick={handleLikeClick}
        />
        <PostInteractionCount>{lovedCount}</PostInteractionCount>
        <PostReactionButton onClick={displayCommentsSection}>
          <CommentIcon />
          <PostInteractionCount>{commentCount}</PostInteractionCount>
        </PostReactionButton>
      </PostCounterSection>
      <Maybe it={showCommentsSection}>
        <CommentsSection post={post} onCommentAdded={onCommentAdded} />
      </Maybe>
    </PostFooter>
  );
};

const commentsLimit = 3;

function CommentsSection({
  className,
  post,
  onCommentAdded,
}: {
  className?: string;
  post: SubscriptionPostType;
  onCommentAdded?: () => void;
}) {
  const { user } = useAuth();
  const [newComments, setNewComments] = useState([]);
  const { addComment, status } = useAddSubscriptionPostComment(post?.id);
  const [offset, setOffset] = useState(0);
  const {
    comments: commentsList,
    totalResults,
    status: commentsListStatus,
  } = useListSubscriptionPostComments({
    shouldFetch: post?.comments > 0,
    postId: post?.id,
    offset,
    limit: commentsLimit,
  });

  async function addNewComment(comment: string) {
    await addComment(comment);
    setNewComments((comments) => [
      { comment, avatar_url: user?.avatar, userFullName: user?.fullName },
      ...comments,
    ]);
    onCommentAdded?.();
  }

  function setNewCommentsOffset() {
    setOffset((offset) => {
      const nextOffset = offset + commentsLimit;
      const newOffset = nextOffset < totalResults ? nextOffset : totalResults;
      return newOffset;
    });
  }

  const isLoadingComment = status === "loading";
  const showCommentLoading = commentsListStatus === "loading";

  const comments = newComments.concat(
    ...commentsList.map((commentData) => ({
      avatar_url: commentData?.userAvatar,
      ...commentData,
    }))
  );

  const isFirstComment = comments?.length < 1;

  return (
    <section className={className}>
      <CommentCreator
        isLoading={isLoadingComment}
        error={false}
        firstComment={isFirstComment}
        onAddComment={addNewComment}
      />
      <Maybe it={!isFirstComment}>
        <CommentCollection
          displayShowMoreButton={totalResults > commentsList?.length}
          onShowMoreComments={setNewCommentsOffset}
          comments={comments}
        />
      </Maybe>
      <Maybe it={showCommentLoading}>
        <LoaderLayout />
      </Maybe>
    </section>
  );
}

type dateType = string | Date;

type SubscriptionPostHeaderProps = {
  avatar: string;
  fullName: string;
  username: string;
  date?: dateType;
};

const dateFormat: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};

const formatDate = (date: dateType) => {
  return String(new Date(date).toLocaleDateString("es-US", dateFormat)).replace(
    /(de|\.)/g,
    ""
  );
};

function SubscriptionPostHeader({
  avatar,
  fullName,
  username,
  date,
}: SubscriptionPostHeaderProps) {
  const formattedDate = date ? formatDate(date) : null;

  const profilePath = CELEBRITY_PROFILE.replace(
    ":celebrity_username",
    username
  );

  return (
    <PostHeader>
      {/* <Link href={profilePath}>
      </Link>
      <Link href={profilePath} className="text-decoration-none">
      </Link> */}
      <ProfilePicture width="47px" avatar={avatar} />
      <h3 className="font-weight-bold h6 ml-3 mb-0">{fullName}</h3>
      <PostDate>
        <Maybe it={formattedDate !== "Invalid Date"}>{formattedDate}</Maybe>
      </PostDate>
    </PostHeader>
  );
}
