import { ReactNode } from "react";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { LikeButton } from "../../buttons/LikeButton";
import {
  PostCard,
  PostBody,
  PostHiddenImage,
  PostHiddenText,
  PostSubscribeButton,
  PostFooter,
  PostInteractionCount,
  PostHeader,
  PostDate,
  PostMedia
} from "./styles";

type SubscriptionPostCardProps = {
  children?: ReactNode;
} & SubscriptionPostHeaderProps;

export const SubscriptionPostCard = ({
  children = null,
  avatar,
  fullName,
  date
}: SubscriptionPostCardProps) => {
  return (
    <PostCard>
      <SubscriptionPostHeader avatar={avatar} fullName={fullName} date={date} />
      <PostBody>{children}</PostBody>
      <SubscriptionPostFooter />
    </PostCard>
  );
};

type SubscriptionPostHiddenContentProps = {
  imageSrc: string;
};

export const SubscriptionPostHiddenContent = ({
  imageSrc
}: SubscriptionPostHiddenContentProps) => {
  return (
    <PostMedia>
      <PostHiddenImage imageSrc={imageSrc}>
        <img src="/assets/img/lock.svg" alt="Cerradura" />
        <PostHiddenText>
          Únete al club de Mark para desbloquear este contenido
        </PostHiddenText>
        <PostSubscribeButton>
          Suscríbete ahora por 19.99 USD/mes
        </PostSubscribeButton>
      </PostHiddenImage>
    </PostMedia>
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

type SubscriptionPostHeaderProps = {
  avatar: string;
  fullName: string;
  date?: string | Date;
};

function SubscriptionPostHeader({
  avatar,
  fullName,
  date = "14 Ene 2021"
}: SubscriptionPostHeaderProps) {
  return (
    <PostHeader>
      <ProfilePicture width="47px" avatar={avatar} />
      <h3 className="font-weight-bold h6 ml-3 mb-0">{fullName}</h3>
      <PostDate>
        {String(
          new Date(date).toLocaleDateString("es-US", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })
        ).replace(/(de|\.)/g, "")}
      </PostDate>
    </PostHeader>
  );
}
