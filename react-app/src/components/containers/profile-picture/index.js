import React from "react";
import Image from "react-bootstrap/Image";
import PropTypes from "prop-types";

const ProfilePicture = ({ avatar, roundedCircle, width }) => (
  <figure className="mb-0">
    <Image roundedCircle={roundedCircle} width={width} src={avatar} />
  </figure>
);

ProfilePicture.propTypes = {
  avatar: PropTypes.string.isRequired,
  roundedCircle: PropTypes.bool,
  width: PropTypes.oneOf([PropTypes.string, PropTypes.number])
};

ProfilePicture.defaultProps = {
  roundedCircle: true,
  width: "100px"
};

export { ProfilePicture };
