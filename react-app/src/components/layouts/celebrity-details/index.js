import React, { Component, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProfilePicture } from "../../containers/profile-picture";
import { CountryFlag } from "../../containers/celebrity-country-flag";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import CTA from "../../containers/cta-celebrity-profile";
import { CelebrityContractPrice } from "../celebrity-contract-price";

const CelebrityDetails = ({
  fullName,
  avatar,
  countryCode,
  categoryTitle,
  celebrityId,
  contractTypes
}) => (
  <Container className="mx-auto">
    <Row className="justify-content-md-center">
      <Col xs="auto">
        <ProfilePicture avatar={avatar} width="162px" />
      </Col>
      <Col>
        <h4 className="font-weight-bold">{fullName}</h4>
        <CountryFlag countryCode={countryCode} />
        <span className="ml-2">{categoryTitle}</span>
        <CelebrityContractPrice contractTypes={contractTypes} />
        <CelebrityFavoriteButton celebrityId={celebrityId} />
        <CTA />
      </Col>
    </Row>
  </Container>
);

export { CelebrityDetails };
