import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProfilePicture } from "../../containers/profile-picture";
import { CountryFlag } from "../../containers/celebrity-country-flag";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import { HireThisCelebrityButton } from "../hire-this-celebrity-button";
import { CelebrityContractPrice } from "../celebrity-contract-price";
import "./styles.scss";

const CelebrityDetails = ({
  fullName,
  username,
  avatar,
  countryCode,
  categoryTitle,
  celebrityId,
  contractTypes
}) => (
  <Container className="mx-auto CelebrityDetails">
    <Row className="justify-content-md-center align-items-center mb-3">
      <Col xs="auto">
        <ProfilePicture avatar={avatar} width="139px" />
      </Col>
      <Col>
        <h4 className="CelebrityDetails__full-name">{fullName}</h4>
        <div className="d-flex align-items-center mb-2">
          <CountryFlag countryCode={countryCode} />
          <span className="ml-3 CelebrityDetails__category">
            {categoryTitle}
          </span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <CelebrityContractPrice contractTypes={contractTypes} />
          <CelebrityFavoriteButton celebrityId={celebrityId} />
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <HireThisCelebrityButton
          celebrityFullName={fullName}
          celebrityUsername={username}
          text="Quiero un video de"
          width="100%"
          fontSize="1.25em"
        />
      </Col>
    </Row>
  </Container>
);

export { CelebrityDetails };
