import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import PropTypes from "prop-types";

const ProfilePicture = ({ avatar, roundedCircle, width }) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const changeImageIsLoaded = (event) => setImageIsLoaded(true);

  return (
    <figure className="mb-0">
      <Image
        className={imageIsLoaded ? "" : "d-none"}
        roundedCircle={roundedCircle}
        width={width}
        src={avatar}
        onLoad={changeImageIsLoaded}
        alt="Imagen de perfil"
      />
      {!imageIsLoaded ? (
        <Image
          roundedCircle={roundedCircle}
          width={width}
          src="assets/img/avatar-blank.png"
        />
      ) : null}
    </figure>
  );
};

ProfilePicture.propTypes = {
  avatar: PropTypes.string.isRequired,
  roundedCircle: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ProfilePicture.defaultProps = {
  roundedCircle: true,
  width: "100px"
};

export { ProfilePicture };
