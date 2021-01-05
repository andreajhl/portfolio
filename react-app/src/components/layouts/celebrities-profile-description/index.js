import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import PropTypes from "prop-types";
import "./styles.scss";

const CelebritiesProfileDescription = ({ descriptionText }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((previousShowMore) => !previousShowMore);
  };

  const descriptionTextSpan = (
    <span className="container-celebrities-profile__text-span">
      {descriptionText}
    </span>
  );

  return (
    <div className={`container-celebrities-profile-description`}>
      {descriptionText.length > 200 ? (
        <>
          <Collapse
            className={`container-celebrities-profile-description__collapse`}
            in={showMore}
          >
            <div>{descriptionTextSpan}</div>
          </Collapse>
          <div className="container-celebrities-profile-description__toggle-description">
            {showMore ? null : (
              <i
                className={`fas fa-angle-double-down`}
                onClick={toggleShowMore}
              />
            )}
          </div>
        </>
      ) : (
        <div>{descriptionTextSpan}</div>
      )}
    </div>
  );
};

CelebritiesProfileDescription.defaultProps = {
  descriptionText: ""
};

CelebritiesProfileDescription.propTypes = {
  descriptionText: PropTypes.string
};

export { CelebritiesProfileDescription };
