import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProfilePicture } from "../profile-picture";
import { CelebrityInfo } from "../celebrity-info";
import Maybe from "desktop-app/components/common/helpers/maybe";
import dynamic from "next/dynamic";

const CelebrityMainVideoWidget = dynamic(
  import("../../celebrity-profile/celebrity-main-video-widget").then(
    (mod) => mod.CelebrityMainVideoWidget,
    { loading: () => <div className="CelebrityMainVideoWidget-skeleton" /> }
  )
);

function CelebrityDetails({ celebrity, variant }) {
  const { avatar } = celebrity;

  return (
    <Container className="mx-auto CelebrityDetails">
      <Row className="justify-content-md-center align-items-center align-items-md-start mt-3 mb-3 mt-lg-0">
        <Col xs="auto" className="text-center">
          <Maybe
            it={variant === "2" && celebrity?.mainVideo}
            orElse={
              <ProfilePicture
                avatar={avatar}
                width="83px"
                height="83px"
                imageStyles={{ objectFit: "cover" }}
              />
            }
          >
            <CelebrityMainVideoWidget
              avatarProps={{
                width: 120,
                height: 120,
              }}
              celebrity={celebrity}
            />
          </Maybe>
        </Col>
        <Col>
          <CelebrityInfo variant={variant} celebrity={celebrity} />
        </Col>
      </Row>
    </Container>
  );
}

export { CelebrityDetails };
