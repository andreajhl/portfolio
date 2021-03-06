import React, { useEffect, useState } from "react";
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
  SubscriptionPostContent,
  SubscriptionPostHiddenContent
} from "../../common/cards/subscription-post-card";
import { SubscriptionPostType } from "react-app/src/types/subscriptionPostType";
import { fetchUserSubscriptionsList } from "react-app/src/state/ducks/subscriptions/actions";
import { fetchCelebritySubscriptionPlans } from "react-app/src/state/ducks/celebrities/actions";
import isAlreadySubscribe from "react-app/src/utils/isAlreadySubscribe";
import Maybe from "../../common/helpers/maybe";
import LoadingPage from "../../layouts/loading-page";
import { PriceLayout } from "../../price-layout";
import { Link } from "../../common/routing/link";
import { CELEBRITY_PROFILE, SUBSCRIPTION } from "react-app/src/routing/Paths";
import { useRouter } from "next/router";
import { getPostsFromCelebrity } from "react-app/src/firebase/firestoreService";

const isTypeImage = ({ type }: { type: string }): boolean => type === "image";

const getOnlyPreviewPosts = (results: any[]) =>
  results
    .filter(({ urls }) => urls.some(isTypeImage))
    .map(({ urls, ...posts }) => ({
      ...posts,
      urls: urls.filter(isTypeImage).slice(0, 1)
    }));

const mapStateToProps = ({
  celebrities: { getCelebrityReducer, fetchCelebritySubscriptionPlansReducer },
  subscriptions: { fetchUserSubscriptionsListReducer }
}) => ({
  subscriptionList: fetchUserSubscriptionsListReducer.data,
  isSubscribed: isAlreadySubscribe(
    fetchUserSubscriptionsListReducer.data,
    getCelebrityReducer.data?.username
  ),
  isLoading:
    fetchCelebritySubscriptionPlansReducer.loading ||
    fetchUserSubscriptionsListReducer.loading ||
    !fetchUserSubscriptionsListReducer.completed,
  celebrity: getCelebrityReducer.data,
  celebritySubscriptionPlans: fetchCelebritySubscriptionPlansReducer.data
});

const mapDispatchToProps = {
  fetchUserSubscriptionsList,
  fetchCelebritySubscriptionPlans
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type SubscribePageProps = {} & StateProps & DispatchProps;

const SubscribePage = ({
  celebrity,
  isLoading,
  isSubscribed,
  subscriptionList,
  celebritySubscriptionPlans,
  fetchUserSubscriptionsList,
  fetchCelebritySubscriptionPlans
}: SubscribePageProps) => {
  const router = useRouter();
  const { avatar, fullName, username, availableForSubscriptions } = celebrity;
  const [posts, setPosts] = useState<SubscriptionPostType[]>([]);

  useEffect(() => {
    if (!username) return;
    if (availableForSubscriptions) {
      fetchUserSubscriptionsList();
      fetchCelebritySubscriptionPlans(username);
    } else {
      alert("Este famoso no esta disponible para suscripciones");
      router.push(CELEBRITY_PROFILE.replace(":celebrity_username", username));
    }
  }, [availableForSubscriptions, router, username]);

  useEffect(() => {
    if (isLoading) return;
    const fetchPosts = async () => {
      const posts = await getPostsFromCelebrity(
        "dev_posts",
        celebrity.id,
        !isSubscribed ? 10 : 3
      );
      setPosts(!isSubscribed ? getOnlyPreviewPosts(posts) : posts);
    };
    fetchPosts();
  }, [isLoading, isSubscribed, celebrity.id]);

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
          <div className="d-md-none">
            <ProfilePicture
              avatar={avatar}
              roundedCircle={false}
              width="100%"
            />
          </div>
          <div className="container d-none d-md-block">
            <ProfilePicture
              avatar={avatar}
              roundedCircle={false}
              width="100%"
            />
          </div>
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
              <Maybe
                it={isSubscribed}
                orElse={`Al ser parte del club de Fans de ${fullName} tendrás`}
              >
                Formas parte del Club de Fans de {fullName}. Ahora tienes
              </Maybe>{" "}
              acceso a contenido exclusivo, sesiones live, sorteos y/o eventos
              privados.
            </PlanInfoDescription>
            <Maybe it={!isSubscribed}>
              <PlanInfoPrice>{priceLayout} /mes</PlanInfoPrice>
              <Link
                href={SUBSCRIPTION.replace(":celebrity_username", username)}
              >
                <CallToActionButton width="100%">
                  Subscribirse
                </CallToActionButton>
              </Link>
            </Maybe>
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
              <Maybe
                it={isSubscribed}
                orElse={
                  <SubscriptionPostHiddenContent
                    imageSrc={post.urls[0].value}
                    username={username}
                    price={priceLayout}
                    fullName={fullName}
                  />
                }
              >
                <SubscriptionPostContent
                  urls={post.urls}
                  description={post.description}
                />
              </Maybe>
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
