import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

const SubscriptionCard = ({ celebrity_data }) => {
  const { celebrityAvatar, celebrityFullName, celebrityId } = celebrity_data;
  return (
    <div className="subscription-card-item ">
      <div className="subscription-card-item__info card">
        <div className="subscription-card-item__celebrity_avatar">
          <Image width="100%" src={celebrityAvatar} rounded />
        </div>
        <div className="subscription-card-item__celebrity_info">
          <h5 className="font-weight-bold">{celebrityFullName}</h5>
        </div>
      </div>
    </div>
  );
};

const index = ({ subscriptionList }) => {
  console.log(subscriptionList);
  return (
    <div className="container-subscription-card-section">
      <Row className="justify-content-center">
        <Col lg="8" xl="8" md="12" sm="12">
          <Row>
            <Col
              xl="8"
              className="mx-0"
              className="f-main-padding mt-5 f-shadow rounded f-rounded"
              style={{ backgroundColor: "white", margin: "0 auto" }}
            >
              <div className="col-12 text-center">
                <h6 className="mt-3 font-weight-bold border-bottom pb-3">
                  <FormattedMessage defaultMessage="Mis Suscripciones" />
                </h6>
              </div>
              <div>
                {subscriptionList.map((subscription, index) => (
                  <SubscriptionCard key={index} celebrity_data={subscription} />
                ))}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default index;
