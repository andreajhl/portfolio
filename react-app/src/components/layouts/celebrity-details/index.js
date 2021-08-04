import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProfilePicture } from "../profile-picture";
import { HireThisCelebrityButton } from "../hire-this-celebrity-button";
import { SubscribeToThisCelebrityButton } from "../subscribe-to-this-celebrity-button";
import { CelebritiesProfileDescription } from "../celebrities-profile-description";
import { FlashDeliveryBadgeLayout } from "../flash-delivery-badge";
import { CelebrityInfo } from "../celebrity-info";

import { CelebrityDonorAlert } from "../celebrity-donor-alert";
import Emoji from "../../containers/emoji/emoji";
import { SubscriptionToAvailabilityNotification } from "../subscription-to-availability-notification";
import AdWarrantyVideoPurchase from "../ad-warranty-video-purchase";
import { HireThisCelebrityForCompaniesButton } from "../hire-this-celebrity-for-companies-button";
import Maybe from "../../common/helpers/maybe";
import { FormattedMessage } from "react-intl";
import { FansClubBadge } from "../fans-club-badge";

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
    availableForFlashDeliveries,
    isDonor,
    causeName,
    causeUrl,
    status,
  } = celebrity;

  const isJuanseQuintero = celebrityId === 6317;

  const availableForSubscriptions =
    celebrity.availableForSubscriptions && !isJuanseQuintero;

  return (
    <Container
      className={`mx-auto CelebrityDetails ${variant === "1" ? "mb-0" : ""} ${variant === "2" ? "mb-4 mt-0" : ""
        }`}
    >
      <Row className="justify-content-md-center align-items-center align-items-md-start mt-3 mb-3 mt-lg-0">
        <Col xs="auto d-md-none" className="text-center">
          <ProfilePicture
            avatar={avatar}
            width="139px"
            height="139px"
            imageStyles={
              availableForFlashDeliveries
                ? { objectFit: "cover", marginBottom: "-2rem" }
                : { objectFit: "cover" }
            }
          />
          <Maybe it={availableForFlashDeliveries}>
            <FlashDeliveryBadgeLayout color="dark" showTitle />
          </Maybe>
          <Maybe it={availableForSubscriptions}>
            <FansClubBadge className="CelebrityDetails__fans-club-badge" />
          </Maybe>
        </Col>
        <Col xs="auto d-none d-md-block" className="text-center">
          <ProfilePicture
            avatar={avatar}
            width="150px"
            height="150px"
            imageStyles={
              availableForFlashDeliveries
                ? { objectFit: "cover", marginBottom: "-2.5rem" }
                : { objectFit: "cover" }
            }
          />
          <Maybe it={availableForFlashDeliveries}>
            <FlashDeliveryBadgeLayout
              className="CelebrityDetails__flash-delivery-large"
              color="dark"
              showTime
              showTitle
            />
          </Maybe>
          <Maybe it={availableForSubscriptions}>
            <FansClubBadge className="CelebrityDetails__fans-club-badge-large" />
          </Maybe>
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
            status={status}
          />
          <Col className="d-none d-md-block mx-0 px-0">
            <Maybe it={status === 50}>
              <HireThisCelebrityButton
                showCelebrityName={false}
                celebrityFullName={fullName}
                celebrityUsername={username}
                text={
                  <>
                    <Emoji label="star-struck" symbol="&#129321" />
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      <FormattedMessage
                        defaultMessage="¡Comprar video ahora!"
                        description=""
                      />
                    </span>
                    <Emoji label="star-struck" symbol="&#129321" />
                  </>
                }
                width="100%"
                fontSize="1.25em"
              />
            </Maybe>
            <Maybe it={celebrityId === 2530}>
              <HireThisCelebrityForCompaniesButton
                className={"button-hire-this-celebrity-for-companies mt-2"}
                text={
                  <FormattedMessage
                    defaultMessage="Contratar para Empresa"
                    description=""
                  />
                }
                width="100%"
              />
            </Maybe>
            <Maybe it={status === 60}>
              <SubscriptionToAvailabilityNotification
                celebrityFullName={celebrity.fullName}
                showCelebrityName={false}
                celebrityId={celebrity.id}
                width="100%"
                fontSize="1.25rem"
              />
            </Maybe>
            <Maybe it={availableForSubscriptions}>
              <SubscribeToThisCelebrityButton
                className="mt-2"
                celebrityFullName={fullName}
                celebrityUsername={username}
                text="Club de fans de "
                width="100%"
                fontSize="1.25em"
              />
            </Maybe>
            <Maybe it={isDonor}>
              <CelebrityDonorAlert
                fullName={fullName}
                causeName={causeName}
                causeUrl={causeUrl}
                className="mt-2"
              />
            </Maybe>
          </Col>
        </Col>
      </Row>
      <Row>
        <Maybe it={isDonor}>
          <Col xs="12" className="d-md-none">
            <CelebrityDonorAlert
              fullName={fullName}
              causeName={causeName}
              causeUrl={causeUrl}
            />
          </Col>
        </Maybe>
        <Col className="mx-3 my-3 px-0">
          <CelebritiesProfileDescription descriptionText={description} />
        </Col>
      </Row>
      <Row>
        <Col className="d-md-none mb-4">
          <AdWarrantyVideoPurchase
            celebrityFullName={fullName}
          ></AdWarrantyVideoPurchase>
        </Col>
      </Row>
      <Row>
        <Col className="d-md-none">
          <Maybe it={status === 50}>
            <HireThisCelebrityButton
              showCelebrityName={false}
              className={"button-hire-this-celebrity"}
              celebrityFullName={fullName}
              celebrityUsername={username}
              text={
                <>
                  <Emoji label="star-struck" symbol="🤩" />
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    <FormattedMessage defaultMessage="¡Comprar video ahora!" />
                  </span>
                  <Emoji label="star-struck" symbol="🤩" />
                </>
              }
              width="100%"
            />
          </Maybe>
          <Maybe it={status === 60}>
            <SubscriptionToAvailabilityNotification
              celebrityFullName={celebrity.fullName}
              showCelebrityName={false}
              celebrityId={celebrity.id}
              width="100%"
            />
          </Maybe>
          <Maybe it={availableForSubscriptions}>
            <SubscribeToThisCelebrityButton
              className="mt-2"
              celebrityFullName={fullName}
              celebrityUsername={username}
              text={
                // variant.startsWith("1")
                /* ?  */ "Club de fans de "
                // : "Obtén un video de"
              }
              width="100%"
              fontSize="1.25em"
            />
          </Maybe>
        </Col>
      </Row>
      <Row>
        <Col className="d-md-none  mt-4">
          <Maybe it={celebrityId === 2530}>
            <HireThisCelebrityForCompaniesButton
              className={"button-hire-this-celebrity-for-companies"}
              text={
                <FormattedMessage defaultMessage="Contratar para Empresa" />
              }
              width="100%"
            />
          </Maybe>
        </Col>
      </Row>
    </Container>
  );
};

export { CelebrityDetails };
