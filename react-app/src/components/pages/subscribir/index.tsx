import React, { useEffect } from "react";
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
import { SubscriptionPostType } from "react-app/src/types/subscriptionPostType";
import { fetchUserSubscriptionsList } from "react-app/src/state/ducks/subscriptions/actions";
import { fetchCelebritySubscriptionPlans } from "react-app/src/state/ducks/celebrities/actions";
import isAlreadySubscribe from "react-app/src/utils/isAlreadySubscribe";
import Maybe from "../../common/helpers/maybe";
import LoadingPage from "../../layouts/loading-page";
import { PriceLayout } from "../../price-layout";
import { Link } from "../../common/routing/link";
import { SUBSCRIPTION } from "react-app/src/routing/Paths";

const mapStateToProps = ({
  celebrities: { getCelebrityReducer, fetchCelebritySubscriptionPlansReducer },
  subscriptions: { fetchUserSubscriptionsListReducer }
}) => ({
  subscriptionList: fetchUserSubscriptionsListReducer.data,
  isSubscribed: isAlreadySubscribe(
    fetchUserSubscriptionsListReducer.data,
    getCelebrityReducer.data.username
  ),
  isLoading:
    fetchCelebritySubscriptionPlansReducer.loading ||
    fetchUserSubscriptionsListReducer.loading ||
    !fetchUserSubscriptionsListReducer.completed,
  celebrity: getCelebrityReducer.data?.celebrity || {},
  celebritySubscriptionPlans: fetchCelebritySubscriptionPlansReducer.data
});

const mapDispatchToProps = {
  fetchUserSubscriptionsList,
  fetchCelebritySubscriptionPlans
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SubscribePageProps = {
  posts: SubscriptionPostType[];
} & StateProps &
  DispatchProps;

const SubscribePage = ({
  celebrity,
  isLoading,
  isSubscribed,
  subscriptionList,
  celebritySubscriptionPlans,
  fetchUserSubscriptionsList,
  fetchCelebritySubscriptionPlans,
  posts
}: SubscribePageProps) => {
  const { avatar, fullName, username } = celebrity;

  useEffect(() => {
    if (!username) return;
    fetchUserSubscriptionsList();
    fetchCelebritySubscriptionPlans(username);
  }, [username]);

  const monthlySubscription = celebritySubscriptionPlans?.find?.(
    (plan) => plan.frequencyType === "MONTH"
  );

  const priceLayout = (
    <PriceLayout price={monthlySubscription?.priceTier} showPrefix={false} />
  );

  return (
    <PageContainer>
      <Maybe it={!isLoading} orElse={<LoadingPage />}>
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
              Al ser parte del club de Fans de {fullName} tendrás acceso a
              contenido exclusivo, sesiones live, sorteos y/o eventos privados.
            </PlanInfoDescription>
            <PlanInfoPrice>{priceLayout} /mes</PlanInfoPrice>
            <Link href={SUBSCRIPTION.replace(":celebrity_username", username)}>
              <CallToActionButton width="100%">Subscribirse</CallToActionButton>
            </Link>
          </PlanInfoSection>
        </div>
        <SubscriptionPostsHeader>
          <LastsPostsTitle>Últimas publicaciones de {fullName}</LastsPostsTitle>
        </SubscriptionPostsHeader>
        <SubscriptionPostsSection>
          {posts.map((post) => (
            <SubscriptionPostCard
              avatar={avatar}
              fullName={fullName}
              username={username}
              date={post.created}
            >
              <SubscriptionPostHiddenContent
                imageSrc={post.urls[0].value}
                username={username}
                price={priceLayout}
                fullName={fullName}
              />
            </SubscriptionPostCard>
          ))}
        </SubscriptionPostsSection>
      </Maybe>
    </PageContainer>
  );
};

const _SubscribePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribePage);

export { _SubscribePage as SubscribePage };
