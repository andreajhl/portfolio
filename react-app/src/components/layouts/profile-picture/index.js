import React, { useState, useRef, useEffect } from "react";
import Image from "react-bootstrap/Image";
import PropTypes from "prop-types";
import Maybe from "../../common/helpers/maybe";

function ProfilePicture({ avatar, roundedCircle, width, imageStyles }) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const imageRef = useRef();

  const changeImageIsLoaded = (event) => setImageIsLoaded(true);

  useEffect(() => {
    if (!imageRef.current.complete) return;
    setImageIsLoaded(true);
  }, []);

  return (
    <figure className="mb-0">
      <Image
        className={!imageIsLoaded ? "d-none" : ""}
        roundedCircle={roundedCircle}
        width={width}
        src={avatar}
        onLoad={changeImageIsLoaded}
        alt="Imagen de perfil"
        style={imageStyles}
        ref={imageRef}
      />
      <Maybe it={!imageIsLoaded}>
        <Image
          roundedCircle={roundedCircle}
          width={width}
          src="/assets/img/avatar-blank.png"
          style={imageStyles}
        />
      </Maybe>
    </figure>
  );
}

ProfilePicture.propTypes = {
  avatar: PropTypes.string.isRequired,
  roundedCircle: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageStyles: PropTypes.object,
};

ProfilePicture.defaultProps = {
  roundedCircle: true,
  width: "100px",
  imageStyles: null,
};

export { ProfilePicture };
