import { CommentCollection } from "desktop-app/components/common/comment-collection";
import { CommentCreator } from "desktop-app/components/common/comment-creator";
import React, { ReactNode, useState } from "react";
import {
  PostSlideshow,
  VideoLayout,
} from "react-app/src/components/containers/celebrity-shared-post";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { CELEBRITY_PROFILE, SUBSCRIPTION } from "react-app/src/routing/Paths";
import {
  SubscriptionPostType,
  SubscriptionPostUrlType,
} from "react-app/src/types/subscriptionPostType";
import { getFirstName } from "react-app/src/utils/getFirstName";
import { LikeButton } from "../../buttons/LikeButton";
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
} from "./styles";

type SubscriptionPostCardProps = {
  className?: string;
  children?: ReactNode;
} & SubscriptionPostHeaderProps;

export const SubscriptionPostCard = ({
  className,
  children = null,
  avatar,
  username,
  fullName,
  date,
}: SubscriptionPostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentsSection, setShowCommentsSection] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(true);
    setShowCommentsSection(true);
  };
  const handleShowCommentsSection = () => {
    setShowCommentsSection((prevState) => !prevState);
  };

  return (
    <PostCard className={className}>
      <SubscriptionPostHeader
        avatar={avatar}
        fullName={fullName}
        date={date}
        username={username}
      />
      <PostBody>{children}</PostBody>
      <SubscriptionPostFooter
        commentCount={200}
        likeCount={200}
        isLiked={isLiked}
        onShowCommentsClick={handleShowCommentsSection}
        onLikeClick={handleLikeClick}
        showCommentsSection={showCommentsSection}
      />
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
      <Maybe it={Boolean(imageSrc)}>
        <PostMedia as={Link} href={subscriptionPath}>
          <PostHiddenImage src={imageSrc} />
          <PostHiddenDiv imageSrc={imageSrc}>
            <img src="/assets/img/lock.svg" alt="Cerradura" />
            <PostHiddenText>
              Únete al club de {firstName} para desbloquear este contenido
            </PostHiddenText>
            <PostSubscribeButton>
              Suscríbete ahora por {price}/mes
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
}: SubscriptionPostType) => (
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
          /* <PostVideo src={value} preload="metadata" playsInline controls /> */
        />
      }
    >
      <PostImage src={mediaUrl} />
    </Maybe>
  );
};

type SubscriptionPostFooterProps = {
  onLikeClick: () => void;
  isLiked: boolean;
  onShowCommentsClick: () => void;
  commentCount: number;
  likeCount: number;
  showCommentsSection: boolean;
};

type contractComments = {
  avatar_url: string;
  userFullName: string;
  comment: string;
}[];
const contractComments: contractComments = [
  {
    avatar_url: "asd",
    comment: "Me ha encantado chaval!",
    userFullName: "Juan",
  },
  {
    avatar_url: "asd",
    comment: "Me ha encantado chaval!",
    userFullName: "Juan",
  },
  {
    avatar_url: "asd",
    comment: "Me ha encantado chaval!",
    userFullName: "Juan",
  },
  {
    avatar_url: "asd",
    comment: "Me ha encantado chaval!",
    userFullName: "Juan",
  },
];
const SubscriptionPostFooter = ({
  onShowCommentsClick,
  onLikeClick,
  isLiked,
  showCommentsSection,
  commentCount,
  likeCount,
}: SubscriptionPostFooterProps) => {
  return (
    <PostFooter>
      <PostCounterSection>
        <LikeButton
          isFavorite={isLiked}
          width="20px"
          onClick={onLikeClick}
          outlinedImageSource="/assets/img/heart-regular-outlined.svg"
        />{" "}
        <PostInteractionCount>0</PostInteractionCount>
        <img src="/assets/img/comment-icon.svg" alt="Comentarios" />
        <PostInteractionCount>0</PostInteractionCount>
      </PostCounterSection>
      <CommentCreator
        isLoading={false}
        error={false}
        firstComment={true}
        onAddComment={(text) => console.log(text)}
      />
      <CommentCollection
        displayShowMoreButton={true}
        onShowMoreComments={() => {}}
        comments={contractComments}
      />
    </PostFooter>
  );
};

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
