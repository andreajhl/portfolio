import React, { useEffect } from "react";
import { PageContainer } from "../../layouts/page-container";
import { ProfilePicture } from "../../layouts/profile-picture";
import { connect, ConnectedProps } from "react-redux";
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
  SectionWrapper,
  LastsPostsTitle,
} from "./styles";
import { SubscriptionPostsSection } from "../../layouts/subscription-posts";
import {
  SubscriptionPostCard,
  SubscriptionPostContent,
  SubscriptionPostHiddenContent,
} from "../../common/cards/subscription-post-card";

import { fetchUserSubscriptionsList } from "react-app/src/state/ducks/subscriptions/actions";
import { fetchCelebritySubscriptionPlans } from "react-app/src/state/ducks/celebrities/actions";
import isAlreadySubscribe from "react-app/src/utils/isAlreadySubscribe";
import Maybe from "../../common/helpers/maybe";
import LoadingPage from "../../layouts/loading-page";
import { PriceLayout } from "../../price-layout";
import { Link } from "../../common/routing/link";
import { CELEBRITY_PROFILE, SUBSCRIPTION } from "react-app/src/routing/Paths";
import { useRouter } from "next/router";
import { NotResults } from "../../layouts/not-results";
import { ConvertedPriceCopy } from "../../layouts/converted-price-copy";
import { PoweredByFamososBanner } from "../../layouts/powered-by-famosos-banner";
import { listSubscriptionPosts } from "react-app/src/state/ducks/subscriptions/actions";
import { LoaderLayout } from "../../layouts/loader";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  noAvailableForSubscriptionAlertText: {
    defaultMessage: "Este famoso no esta disponible para suscripciones",
  },
});

const isTypeImage = ({ mediaType }: { mediaType: string }): boolean =>
  mediaType === "IMAGE";

const getOnlyPreviewPosts = (results: any[]) =>
  results
    .map(({ items, ...posts }) => ({
      ...posts,
      items: items.filter(isTypeImage).slice(0, 1),
    }))
    .filter(({ items, description }) => items.length > 0 || description);

const mapStateToProps = ({
  celebrities: { getCelebrityReducer, fetchCelebritySubscriptionPlansReducer },
  subscriptions: {
    fetchUserSubscriptionsListReducer,
    listSubscriptionPostsReducer,
  },
}) => {
  const subscriptionPosts = listSubscriptionPostsReducer?.data?.results || [];

  const isSubscribed = isAlreadySubscribe(
    fetchUserSubscriptionsListReducer.data,
    getCelebrityReducer.data?.username
  );
  return {
    subscriptionList: fetchUserSubscriptionsListReducer.data,
    isSubscribed,
    isLoading:
      fetchCelebritySubscriptionPlansReducer.loading ||
      fetchUserSubscriptionsListReducer.loading ||
      !fetchUserSubscriptionsListReducer.completed,
    celebrity: getCelebrityReducer.data,
    celebritySubscriptionPlans: fetchCelebritySubscriptionPlansReducer.data,
    isLoadingPosts: listSubscriptionPostsReducer.loading,
    posts: !isSubscribed
      ? getOnlyPreviewPosts(subscriptionPosts)
      : subscriptionPosts,
  };
};

const mapDispatchToProps = {
  fetchUserSubscriptionsList,
  fetchCelebritySubscriptionPlans,
  listSubscriptionPosts,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SubscribePageProps = {} & PropsFromRedux;

function SubscribePage({
  celebrity,
  isLoading,
  isSubscribed,
  listSubscriptionPosts,
  celebritySubscriptionPlans,
  fetchUserSubscriptionsList,
  fetchCelebritySubscriptionPlans,
  posts,
  isLoadingPosts,
}: SubscribePageProps) {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const { avatar, fullName, username, availableForSubscriptions } = celebrity;
  const noAvailableForSubscriptionAlertText = formatMessage(
    messages.noAvailableForSubscriptionAlertText
  );

  useEffect(() => {
    if (!username) return;
    if (availableForSubscriptions) {
      fetchUserSubscriptionsList();
      fetchCelebritySubscriptionPlans(username);
      listSubscriptionPosts({
        celebrityId: celebrity?.id,
        offset: 0,
        limit: 10,
      });
    } else {
      alert(noAvailableForSubscriptionAlertText);
      router.push(CELEBRITY_PROFILE.replace(":celebrity_username", username));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableForSubscriptions, celebrity?.id, username]);

  const monthlySubscription = celebritySubscriptionPlans?.find?.(
    (plan) => plan.frequencyType === "MONTH"
  );

  const priceLayout = (
    <PriceLayout
      price={monthlySubscription?.priceTier}
      rounding
      showPrefix={false}
    />
  );

  const hasPosts = posts?.length > 0;

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
        <SectionWrapper>
          <div className="container">
            <CelebrityInfoSection>
              <ProfilePicture avatar={avatar} width="176px" />
              <CelebrityInfoTitle>{fullName}</CelebrityInfoTitle>
              <CelebrityInfoSubtitle>
                <FormattedMessage defaultMessage="Club de Fans" />
              </CelebrityInfoSubtitle>
            </CelebrityInfoSection>
            <PlanInfoSection as="section">
              <PlanInfoStar />
              <PlanInfoDescription>
                <Maybe
                  it={isSubscribed}
                  orElse={
                    <FormattedMessage
                      defaultMessage="Al ser parte del club de Fans de {fullName} tendrás acceso a contenido exclusivo, sesiones live, sorteos y/o eventos privados."
                      values={{ fullName }}
                    />
                  }
                >
                  <FormattedMessage
                    defaultMessage="Formas parte del Club de Fans de {fullName}. Ahora tienes acceso a contenido exclusivo, sesiones live, sorteos y/o eventos privados."
                    values={{ fullName }}
                  />
                </Maybe>
              </PlanInfoDescription>
              <Maybe it={!isSubscribed}>
                <PlanInfoPrice>
                  <FormattedMessage
                    defaultMessage="{priceLayout} /mes"
                    values={{ priceLayout }}
                  />
                </PlanInfoPrice>
                <ConvertedPriceCopy price={monthlySubscription?.priceTier} />
                <Link
                  href={SUBSCRIPTION.replace(":celebrity_username", username)}
                >
                  <div style={{ marginTop: "20px" }}>
                    <CallToActionButton width="100%">
                      <FormattedMessage defaultMessage="Subscribirse" />
                    </CallToActionButton>
                  </div>
                </Link>
              </Maybe>
            </PlanInfoSection>
          </div>
        </SectionWrapper>
        <SubscriptionPostsSection>
          <Maybe it={!isLoadingPosts} orElse={<LoaderLayout />}>
            <LastsPostsTitle>
              <FormattedMessage
                defaultMessage="Últimas publicaciones de {fullName}"
                values={{ fullName }}
              />
            </LastsPostsTitle>
            <Maybe
              it={hasPosts}
              orElse={
                <NotResults
                  message={
                    <FormattedMessage defaultMessage="Oops! Al parecer no hay publicaciones actualmente" />
                  }
                />
              }
            >
              {posts.map((post) => (
                <SubscriptionPostCard
                  avatar={avatar}
                  fullName={fullName}
                  username={username}
                  post={post}
                  key={post?.id}
                >
                  <Maybe
                    it={isSubscribed}
                    orElse={
                      <SubscriptionPostHiddenContent
                        imageSrc={post?.items?.[0]?.mediaUrl}
                        username={username}
                        price={priceLayout}
                        fullName={fullName}
                        description={post?.description}
                      />
                    }
                  >
                    <SubscriptionPostContent
                      items={post?.items}
                      description={post?.description}
                    />
                  </Maybe>
                </SubscriptionPostCard>
              ))}
            </Maybe>
            <PoweredByFamososBanner />
          </Maybe>
        </SubscriptionPostsSection>
      </Maybe>
    </PageContainer>
  );
}

const _SubscribePage = connector(SubscribePage);

export { _SubscribePage as SubscribePage };
