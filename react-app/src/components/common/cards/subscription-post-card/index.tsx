import React, { ReactNode, useState } from "react";
import {
  PostSlideshow,
  VideoLayout
} from "react-app/src/components/containers/celebrity-shared-post";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { CELEBRITY_PROFILE, SUBSCRIPTION } from "react-app/src/routing/Paths";
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
  PostText
} from "./styles";

type SubscriptionPostCardProps = {
  children?: ReactNode;
} & SubscriptionPostHeaderProps;

export const SubscriptionPostCard = ({
  children = null,
  avatar,
  username,
  fullName,
  date
}: SubscriptionPostCardProps) => {
  return (
    <PostCard>
      <SubscriptionPostHeader
        avatar={avatar}
        fullName={fullName}
        date={date}
        username={username}
      />
      <PostBody>{children}</PostBody>
      {/* <SubscriptionPostFooter /> Para un proximo release */}
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
  description
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

export const SubscriptionPostContent = ({ urls, description }) => (
  <>
    <Maybe it={urls.length > 0}>
      <PostMedia>
        <Maybe
          it={urls.length > 1}
          orElse={<PostSingleMedia media={urls[0]} />}
        >
          <PostSlideshow urls={urls} />
        </Maybe>
      </PostMedia>
    </Maybe>
    <Maybe it={description}>
      <PostText>{description}</PostText>
    </Maybe>
  </>
);

const PostSingleMedia = ({ media: { type, value } }) => {
  const [videoIsMuted, setVideoIsMuted] = useState(true);
  const [slideshowIsPlaying, setSlideshowIsPlaying] = useState(false);
  return (
    <Maybe
      it={type === "image"}
      orElse={
        <VideoLayout
          videoIsMuted={videoIsMuted}
          setVideoIsMuted={setVideoIsMuted}
          media={{ value }}
          classNameSlideLayoutVideo="celebrity-shared-post__media-files__item-video"
          setSlideshowIsPlaying={setSlideshowIsPlaying}
          /* <PostVideo src={value} preload="metadata" playsInline controls /> */
        />
      }
    >
      <PostImage src={value} />
    </Maybe>
  );
};

const SubscriptionPostFooter = () => {
  return (
    <PostFooter>
      <LikeButton
        width="20px"
        outlinedImageSource="/assets/img/heart-regular-outlined.svg"
      />{" "}
      <PostInteractionCount>0</PostInteractionCount>
      <img src="/assets/img/comment-icon.svg" alt="Comentarios" />
      <PostInteractionCount>0</PostInteractionCount>
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

const dateFormat = {
  day: "2-digit",
  month: "short",
  year: "numeric"
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
  date
}: SubscriptionPostHeaderProps) {
  const formattedDate = date ? formatDate(date) : null;

  if (formattedDate === "Invalid Date") {
    throw new TypeError("The 'date' props provided is invalid");
  }

  const profilePath = CELEBRITY_PROFILE.replace(
    ":celebrity_username",
    username
  );

  return (
    <PostHeader>
      <Link href={profilePath}>
        <ProfilePicture width="47px" avatar={avatar} />
      </Link>
      <Link href={profilePath} className="text-decoration-none">
        <h3 className="font-weight-bold h6 ml-3 mb-0">{fullName}</h3>
      </Link>
      <PostDate>{formattedDate}</PostDate>
    </PostHeader>
  );
}
