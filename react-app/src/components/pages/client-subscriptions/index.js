import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import { PageContainer } from "../../layouts";
import MetaTags from 'react-meta-tags';
import { LoaderLayout } from "../../layouts/loader";
import { subscriptionsOperations } from "../../../state/ducks/subscriptions";
import './styles.scss';
import SubscriptionCardSection from '../../layouts/subscription-card-section/index';

const ClientSubscriptions = (props) => {
 const {
   getCelebritiesSubscribe,
   subscriptionList,
   isSubscriptionListCompletedFetch,
 } = { ...props };
  useEffect(() => {
    getCelebritiesSubscribe();
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>
          Famosos.com - Videos personalizados de tus famosos favoritos.
        </title>
        <meta
          name='description'
          content='Las ultimas publicaciones de tus famosos favoritos.'
        />
      </MetaTags>
      <PageContainer>
        <div className='container-client-subscriptions'>
          {isSubscriptionListCompletedFetch ? (
            <SubscriptionCardSection subscriptionList={subscriptionList}/>
          ) : (
            <LoaderLayout />
          )}
        </div>
      </PageContainer>
    </Fragment>
  );
};

// mapStateToProps
const mapStateToProps = (state) => ({
  subscriptionList: state.subscriptions.fetchUserSubscriptionsListReducer.data,
  isSubscriptionListCompletedFetch: state.subscriptions.fetchUserSubscriptionsListReducer.completed
});


// mapDispatchToProps
const mapDispatchToProps = {
  getCelebritiesSubscribe: subscriptionsOperations.fetchUserSubscriptionsList
};
const _ClientSubscriptions = connect(mapStateToProps, mapDispatchToProps)(ClientSubscriptions);
export { _ClientSubscriptions as ClientSubscriptions };

