import React, { useState, useRef, useEffect } from "react";
import Image from "react-bootstrap/Image";
import PropTypes from "prop-types";
import Maybe from "../../common/helpers/maybe";
import { useIntl, defineMessage } from "react-intl";

const messageAltImage = defineMessage({
  defaultMessage: "Imagen de perfil"
});

const ProfilePicture = ({
  avatar,
  roundedCircle,
  width,
  height = "auto",
  imageStyles
}) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const imageRef = useRef();
  const intl = useIntl();

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
        height={height}
        src={avatar}
        onLoad={changeImageIsLoaded}
        alt={intl.formatMessage(messageAltImage)}
        style={imageStyles}
        ref={imageRef}
      />
      <Maybe it={!imageIsLoaded}>
        <Image
          roundedCircle={roundedCircle}
          width={width}
          height={height}
          src="assets/img/avatar-blank.png"
          style={imageStyles}
        />
      </Maybe>
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
