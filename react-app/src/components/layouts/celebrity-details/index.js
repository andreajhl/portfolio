import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProfilePicture } from "../profile-picture";
import { CountryFlag } from "../../containers/celebrity-country-flag";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import { HireThisCelebrityButton } from "../hire-this-celebrity-button";
import { CelebrityContractPrice } from "../celebrity-contract-price";
import "./styles.scss";

const CelebrityInfo = ({
  fullName,
  countryCode,
  categoryTitle,
  celebrityId,
  contractTypes,
  variant
}) => {
  switch (variant) {
    case "1":
      return (
        <>
          <h4 className="CelebrityDetails__full-name">{fullName}</h4>
          <div className="d-flex align-items-center mb-2">
            <CountryFlag countryCode={countryCode} />
            <span className="ml-3 mt-1 CelebrityDetails__category">
              {categoryTitle}
            </span>
            <CelebrityFavoriteButton
              className="d-none d-md-block CelebrityDetails__fav-button-desktop"
              celebrityId={celebrityId}
              outlinedImageSource="assets/img/heart-regular-outlined.svg"
              width="2.5rem"
            />
          </div>
          <div className="d-flex justify-content-between mb-2 mb-md-4 align-items-center">
            <CelebrityContractPrice contractTypes={contractTypes} />
            <CelebrityFavoriteButton
              className="d-md-none"
              celebrityId={celebrityId}
              outlinedImageSource="assets/img/heart-regular-outlined.svg"
              width="1.5rem"
            />
          </div>
        </>
      );

    case "1.1":
      return (
        <>
          <CelebrityFavoriteButton
            className="mb-3"
            celebrityId={celebrityId}
            outlinedImageSource="assets/img/heart-regular-outlined.svg"
            width="1.25rem"
          />
          <h4 className="CelebrityDetails__full-name">{fullName}</h4>
          <div className="d-flex align-items-center mb-2 mb-md-3">
            <CountryFlag countryCode={countryCode} />
            <span className="ml-3 mt-1 CelebrityDetails__category">
              {categoryTitle}
            </span>
          </div>
        </>
      );

    case "2":
      return (
        <>
          <div className="text-right mb-2">
            <CelebrityFavoriteButton
              className="d-md-none"
              celebrityId={celebrityId}
              outlinedImageSource="assets/img/heart-regular-outlined.svg"
              width="1.25rem"
            />
          </div>
          <h4 className="CelebrityDetails__full-name">{fullName}</h4>
          <div className="d-flex align-items-center mb-2">
            <CountryFlag countryCode={countryCode} />
            <span className="ml-3 mt-1 CelebrityDetails__category">
              {categoryTitle}
            </span>
            <CelebrityFavoriteButton
              className="d-none d-md-inline ml-auto"
              celebrityId={celebrityId}
              outlinedImageSource="assets/img/heart-regular-outlined.svg"
              width="2.5rem"
            />
          </div>
          <div className="d-flex justify-content-between mb-2 mb-md-4 align-items-center">
            <CelebrityContractPrice contractTypes={contractTypes} />
          </div>
        </>
      );

    default:
      break;
  }
};

const CelebrityDetails = ({
  fullName,
  username,
  avatar,
  countryCode,
  categoryTitle,
  celebrityId,
  contractTypes,
  variant
}) => {
  return (
    <Container
      className={`mx-auto CelebrityDetails ${variant === "1" ? "mb-0" : ""}`}
    >
      <Row className="justify-content-md-center align-items-center my-3">
        <Col xs="auto d-md-none">
          <ProfilePicture avatar={avatar} width="139px" />
        </Col>
        <Col xs="auto d-none d-md-block">
          <ProfilePicture avatar={avatar} width="200px" />
        </Col>
        <Col>
          <CelebrityInfo
            variant={variant}
            fullName={fullName}
            countryCode={countryCode}
            categoryTitle={categoryTitle}
            celebrityId={celebrityId}
            contractTypes={contractTypes}
          />
          <Col className="d-none d-md-block mx-0 px-0">
            <HireThisCelebrityButton
              celebrityFullName={fullName}
              celebrityUsername={username}
              text={
                // variant.startsWith("1")
                /* ?  */ "Quiero un video de"
                // : "Obtén un video de"
              }
              width="100%"
              fontSize="1.25em"
            />
          </Col>
        </Col>
      </Row>
      <Row>
        <Col className="d-md-none">
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
};

export { CelebrityDetails };
