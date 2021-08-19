import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProfilePicture } from "../profile-picture";
import { CelebrityInfo } from "../celebrity-info";

function CelebrityDetails({ celebrity, variant }) {
  const { avatar } = celebrity;
  const profilePictureSize = variant === "1" ? "78px" : "120px";

  return (
    <Container className="mx-auto CelebrityDetails">
      <Row className="justify-content-md-center align-items-center align-items-md-start mt-3 mb-3 mt-lg-0">
        <Col xs="auto" className="text-center">
          <ProfilePicture
            avatar={avatar}
            width={profilePictureSize}
            height={profilePictureSize}
            imageStyles={{ objectFit: "cover" }}
          />
        </Col>
        <Col>
          <CelebrityInfo variant={variant} celebrity={celebrity} />
        </Col>
      </Row>
    </Container>
  );
}

export { CelebrityDetails };
