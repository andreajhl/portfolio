import React, { Component, Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts";
import "./styles.scss";
import { Container, Row, Col } from "react-bootstrap";
import MetaTags from "react-meta-tags";
import  {PayPalCardForm} from '../../containers/paypal-card-form';
import {SubscriptionPayPalCardForm} from '../../containers/subscription-paypal-card-form';
const Subscription = (props) => {
 
  return (
    <Fragment>
      <MetaTags>
        <title>
          Famosos.com - Videos personalizados de tus famosos favoritos.
        </title>
        <meta
          name="description"
          content="Un blog acerca de tus famosos favoritos que forman parte de nuestra plataforma. Entérate con quien puedes conectarte"
        />
      </MetaTags>
      <PageContainer>
        <Container>
          <Row>
            <Col md="9" className="mx-auto">
             <h1>Compra tu suscripción especial!</h1>
             <SubscriptionPayPalCardForm contractPrice={40} contractReference='adsfasd222'/>
            </Col>
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

const _Subscription = connect(null, null)(Subscription);
export { _Subscription as Subscription };
