import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProfilePicture } from "../profile-picture";
import { HireThisCelebrityButton } from "../hire-this-celebrity-button";
import { SubscribeToThisCelebrityButton } from "../subscribe-to-this-celebrity-button";
import { CelebritiesProfileDescription } from "../celebrities-profile-description";
import { FlashDeliveryBadgeLayout } from "../flash-delivery-badge";
import { CelebrityInfo } from "../celebrity-info";
import "./styles.scss";
import { CelebrityDonorAlert } from "../celebrity-donor-alert";
import Emoji from "src/components/containers/emoji/emoji";

const CelebrityDetails = ({ celebrity, variant }) => {
  const {
    fullName,
    username,
    avatar,
    countryCode,
    categoryTitle,
    id: celebrityId,
    contractTypes,
    description,
    turnaround,
    availableForSubscriptions,
    availableForFlashDeliveries,
    isDonor,
    causeName,
    causeUrl
  } = celebrity;

  return (
    <Container
      className={`mx-auto CelebrityDetails ${variant === "1" ? "mb-0" : ""} ${
        variant === "2" ? "mb-4 mt-0" : ""
      }`}
    >
      <Row className='justify-content-md-center align-items-center my-3'>
        <Col xs='auto d-md-none' className='text-center'>
          <ProfilePicture
            avatar={avatar}
            width='139px'
            imageStyles={
              availableForFlashDeliveries ? { marginBottom: "-2rem" } : null
            }
          />
          {availableForFlashDeliveries ? (
            <FlashDeliveryBadgeLayout color='dark' showTitle />
          ) : null}
        </Col>
        <Col xs='auto d-none d-md-block' className='text-center'>
          <ProfilePicture
            avatar={avatar}
            width='200px'
            imageStyles={
              availableForFlashDeliveries ? { marginBottom: "-2.5rem" } : null
            }
          />
          {availableForFlashDeliveries ? (
            <FlashDeliveryBadgeLayout
              className='CelebrityDetails__flash-delivery-large'
              color='dark'
              showTime
              showTitle
            />
          ) : null}
        </Col>
        <Col>
          <CelebrityInfo
            variant={variant}
            fullName={fullName}
            countryCode={countryCode}
            categoryTitle={categoryTitle}
            celebrityId={celebrityId}
            contractTypes={contractTypes}
            turnAround={turnaround}
            availableForFlashDeliveries={availableForFlashDeliveries}
          />
          <Col className='d-none d-md-block mx-0 px-0'>
            <HireThisCelebrityButton
              showCelebrityName={false}
              celebrityFullName={fullName}
              celebrityUsername={username}
              text={
                <>
                  <Emoji label='star-struck' symbol='🤩' />
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "white"
                    }}
                  >
                    ¡Comprar video ahora!
                  </span>
                  <Emoji label='star-struck' symbol='🤩' />
                </>
              }
              width='100%'
              fontSize='1.25em'
            />
            {availableForSubscriptions ? (
              <SubscribeToThisCelebrityButton
                className='mt-2'
                celebrityFullName={fullName}
                celebrityUsername={username}
                text={"Suscribirme a "}
                width='100%'
                fontSize='1.25em'
              />
            ) : null}
            {isDonor ? (
              <CelebrityDonorAlert
                fullName={fullName}
                causeName={causeName}
                causeUrl={causeUrl}
                className='mt-2'
              />
            ) : null}
          </Col>
        </Col>
      </Row>
      <Row>
        {isDonor ? (
          <Col xs='12' className='d-md-none'>
            <CelebrityDonorAlert
              fullName={fullName}
              causeName={causeName}
              causeUrl={causeUrl}
            />
          </Col>
        ) : null}
        <Col className='mx-3 my-3 px-0'>
          <CelebritiesProfileDescription descriptionText={description} />
        </Col>
      </Row>
      <Row>
        <Col className='d-md-none'>
          <HireThisCelebrityButton
            showCelebrityName={false}
            className={"button-hire-this-celebrity"}
            celebrityFullName={fullName}
            celebrityUsername={username}
            text={
              <>
                <Emoji label='star-struck' symbol='🤩' />
                <span
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  ¡Comprar video ahora!
                </span>
                <Emoji label='star-struck' symbol='🤩' />
              </>
            }
            width='100%'
          />
          {availableForSubscriptions ? (
            <SubscribeToThisCelebrityButton
              className='mt-2'
              celebrityFullName={fullName}
              celebrityUsername={username}
              text={
                // variant.startsWith("1")
                /* ?  */ "Suscribirme a "
                // : "Obtén un video de"
              }
              width='100%'
              fontSize='1.25em'
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export { CelebrityDetails };
