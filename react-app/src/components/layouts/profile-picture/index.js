import React, { useState } from "react";
import PropTypes from "prop-types";
import OptimizedImage from "react-app/src/components/common/helpers/optimized-image";

const ProfilePicture = ({
  avatar,
  roundedCircle,
  width,
  height = width,
  imageStyles
}) => {
  return (
    <figure className="mb-0">
      <OptimizedImage
        className={roundedCircle ? "rounded-circle overflow-hidden" : ""}
        width={width}
        height={height}
        src={avatar}
        alt="Imagen de perfil"
        style={imageStyles}
        placeholderSrc="assets/img/avatar-blank.png"
      />
    </figure>
  );
};

ProfilePicture.propTypes = {
  avatar: PropTypes.string.isRequired,
  roundedCircle: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageStyles: PropTypes.object
};

ProfilePicture.defaultProps = {
  roundedCircle: true,
  width: "100px",
  imageStyles: null
};

export { ProfilePicture };
