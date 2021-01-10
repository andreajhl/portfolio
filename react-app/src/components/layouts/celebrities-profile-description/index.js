import React, { useEffect, useState, useRef } from "react";
import { Collapse } from "react-bootstrap";
import PropTypes from "prop-types";
import * as GTM from "../../../state/utils/gtm";
import debounce from "lodash.debounce";
import getElementTotalCharacterByLine from "../../../utils/getElementTotalCharacterByLine";
import "./styles.scss";

const TotalCharactersInThreeLinesOnSmallBreakpoint = 135;

const CelebritiesProfileDescription = ({
  descriptionText,
  totalDesiredLinesOfDescriptionText
}) => {
  const [
    totalCharacterLengthToCollapse,
    setTotalCharacterLengthToCollapse
  ] = useState(TotalCharactersInThreeLinesOnSmallBreakpoint);
  const descriptionTextRef = useRef();
  const [showMore, setShowMore] = useState(false);
  const analyticsData = {
    widget: "CelebritiesProfileDescription",
    path: window.location.pathname,
    descriptionText
  };

  const toggleShowMore = () => {
    setShowMore((previousShowMore) => !previousShowMore);
    GTM.tagManagerDataLayer("TOGGLE_CELEBRITY_PROFILE_DESCRIPTION_SHOW_MORE", {
      ...analyticsData,
      showMore: !showMore
    });
  };

  useEffect(() => {
    const descriptionTextSpanElement = descriptionTextRef.current;

    const updateTotalCharacterLengthToCollapse = () => {
      const totalCharacterByLine = getElementTotalCharacterByLine(
        descriptionTextSpanElement
      );

      setTotalCharacterLengthToCollapse(
        totalCharacterByLine * totalDesiredLinesOfDescriptionText
      );
    };

    updateTotalCharacterLengthToCollapse();
    window.addEventListener(
      "resize",
      debounce(updateTotalCharacterLengthToCollapse, 500)
    );
  }, []);

  const descriptionTextSpan = (
    <span
      className="container-celebrities-profile__text-span"
      ref={descriptionTextRef}
    >
      {descriptionText}
    </span>
  );

  return (
    <div className={`container-celebrities-profile-description`}>
      {descriptionText.length >= totalCharacterLengthToCollapse ? (
        <>
          <Collapse
            className={`container-celebrities-profile-description__collapse`}
            in={showMore}
          >
            <div>{descriptionTextSpan}</div>
          </Collapse>
          <div className="container-celebrities-profile-description__toggle-description">
            <button
              type="button"
              onClick={toggleShowMore}
              className="btn btn-light container-celebrities-profile-description__toggle-button"
            >
              <i className={`fas fa-angle-${showMore ? "up" : "down"}`} />
            </button>
          </div>
        </>
      ) : (
        <div>{descriptionTextSpan}</div>
      )}
    </div>
  );
};

CelebritiesProfileDescription.defaultProps = {
  descriptionText: "",
  totalDesiredLinesOfDescriptionText: 3
};

CelebritiesProfileDescription.propTypes = {
  descriptionText: PropTypes.string,
  totalDesiredLinesOfDescriptionText: PropTypes.number
};

export { CelebritiesProfileDescription };
