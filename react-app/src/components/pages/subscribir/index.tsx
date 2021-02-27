import React from "react";
import { PageContainer } from "../../layouts/page-container";
import { ProfilePicture } from "../../layouts/profile-picture";
import { connect } from "react-redux";
import { CallToActionButton } from "../../layouts/call-to-action-button";
import {
  Hero,
  CelebrityInfoSection,
  CelebrityInfoTitle,
  CelebrityInfoSubtitle,
  PlanInfoSection,
  PlanInfoStar,
  PlanInfoDescription,
  PlanInfoPrice,
  LastsPostsTitle
} from "./styles";

import {
  SubscriptionPostsHeader,
  SubscriptionPostsSection
} from "../../layouts/subscription-posts";
import {
  SubscriptionPostCard,
  SubscriptionPostHiddenContent
} from "../../common/cards/subscription-posts-card";
import {
  PostMedia,
  PostImage,
  PostText,
  PostSubscribeButton
} from "../../common/cards/subscription-posts-card/styles";
import { SubscriptionPostType } from "react-app/src/types/subscriptionPostType";

const mapStateToProps = ({ celebrities }) => ({
  celebrity: celebrities.getCelebrityReducer.data.celebrity
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SubscribePageProps = {
  posts: SubscriptionPostType[];
};

const SubscribePage = ({
  celebrity,
  posts
}: SubscribePageProps & StateProps & DispatchProps) => {
  const { avatar, fullName } = celebrity;
  return (
    <PageContainer>
      <Hero>
        <ProfilePicture avatar={avatar} roundedCircle={false} width="100%" />
      </Hero>
      <div className="container">
        <CelebrityInfoSection>
          <ProfilePicture avatar={avatar} width="126px" />
          <CelebrityInfoTitle>{fullName}</CelebrityInfoTitle>
          <CelebrityInfoSubtitle>Club de Fans</CelebrityInfoSubtitle>
        </CelebrityInfoSection>
        <PlanInfoSection as="section">
          <PlanInfoStar />
          <PlanInfoDescription>
            Al ser parte del club de Fans de Mark Tacher tendrás acceso a
            contenido exclusivo, sesiones live, sorteos y/o eventos privados.
          </PlanInfoDescription>
          <PlanInfoPrice>19.99 USD /mes</PlanInfoPrice>
          <CallToActionButton width="100%">Subscribirse</CallToActionButton>
        </PlanInfoSection>
      </div>
      <SubscriptionPostsHeader>
        <LastsPostsTitle>Últimas publicaciones de {fullName}</LastsPostsTitle>
      </SubscriptionPostsHeader>
      <SubscriptionPostsSection>
        {posts.map((post) => (
          <SubscriptionPostCard avatar={avatar} fullName={fullName}>
            <SubscriptionPostHiddenContent imageSrc={post.urls[0].value} />
          </SubscriptionPostCard>
        ))}
      </SubscriptionPostsSection>
    </PageContainer>
  );
};

const _SubscribePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribePage);

export { _SubscribePage as SubscribePage };
