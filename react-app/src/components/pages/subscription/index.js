import React, { Component, Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts";
import "./styles.scss";
import { Container, Row, Col } from "react-bootstrap";
import MetaTags from "react-meta-tags";
import  {PayPalCardForm} from '../../containers/paypal-card-form';
import {SubscriptionPayPalCardForm} from '../../containers/subscription-paypal-card-form';
import SubscriptionCheckoutSummary from "../../containers/subscription-checkout-summary";
const Subscription = (props) => {
 
  return (
    <Fragment>
      <MetaTags>
        <title>
          Famosos.com - Videos personalizados de tus famosos favoritos.
        </title>
        <meta
          name='description'
          content='Un blog acerca de tus famosos favoritos que forman parte de nuestra plataforma. Entérate con quien puedes conectarte'
        />
      </MetaTags>
      <PageContainer>
        <Container>
          <Row>
            <div className='container-subscription-payment col-12 my-3 mx-auto c f-rounded f-shadow'>
              <div className='container-subscription-payment__header'>
                <h6>Resumen de la contratación</h6>
              </div>
              <div className='container-subscription-payment__summary'>
                <SubscriptionCheckoutSummary celebrityFullName='Andres Cepeda' />
              </div>
              <div className='container-subscription-payment__paypalForm'>
                <h5>Paypal</h5>
                <SubscriptionPayPalCardForm
                  contractPrice={40}
                  planId='adsfasd222'
                />
              </div>
            </div>
          </Row>
        </Container>
      </PageContainer>
    </Fragment>
  );
};

// mapStateToProps
// const mapStateToProps = ({ anyState }) => ({

// });

// const mapDispatchToProps = {
//   //Dispatch
// };

// Set propTypes
Subscription.propTypes = {};

// Set defaultProps
Subscription.defaultProps = {
};


const _Subscription = connect(null, null)(Subscription);
export { _Subscription as Subscription };
