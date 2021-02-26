import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts/page-container";
import { LoaderLayout } from "../../layouts/loader";
import { subscriptionsOperations } from "../../../state/ducks/subscriptions";
import SubscriptionCardSection from "../../layouts/subscription-card-section/index";
import Maybe from "../../common/helpers/maybe";
import {
  SubscriptionPostsHeader,
  SubscriptionPostsSection
} from "../../layouts/subscription-posts";

import styled from "styled-components";
import SubscriptionsFilter from "./SubscriptionsFilter";

const MySubscriptionsTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 19px;
  font-weight: bold;
`;

const ClientSubscriptions = ({
  getCelebritiesSubscribe,
  subscriptionList,
  isSubscriptionListCompletedFetch
}) => {
  useEffect(() => {
    getCelebritiesSubscribe();
  }, []);

  return (
    <PageContainer>
      <SubscriptionPostsHeader>
        <MySubscriptionsTitle>Mis suscripciones</MySubscriptionsTitle>
        <SubscriptionsFilter />
      </SubscriptionPostsHeader>
      <SubscriptionPostsSection></SubscriptionPostsSection>
      {/* <div className="container-client-subscriptions">
        <Maybe it={isSubscriptionListCompletedFetch} orElse={<LoaderLayout />}>
          <SubscriptionCardSection subscriptionList={subscriptionList} />
        </Maybe>
      </div> */}
    </PageContainer>
  );
};

// mapStateToProps
const mapStateToProps = (state) => ({
  subscriptionList: state.subscriptions.fetchUserSubscriptionsListReducer.data,
  isSubscriptionListCompletedFetch:
    state.subscriptions.fetchUserSubscriptionsListReducer.completed
});

// mapDispatchToProps
const mapDispatchToProps = {
  getCelebritiesSubscribe: subscriptionsOperations.fetchUserSubscriptionsList
};
const _ClientSubscriptions = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientSubscriptions);
export { _ClientSubscriptions as ClientSubscriptions };
