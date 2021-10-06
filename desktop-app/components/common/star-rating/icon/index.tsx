import React from "react";
import { StarIcon } from "../../icons";
import styles from "./styles.module.scss";
import classes from "classnames";

type StarRatingProps = {
  index: number;
  rating: number;
  editing: boolean;
  color: string
};

const getYellowFillColor = (rating, hoverRating, index, editing) => {
  if (!editing && rating >= index) {
    return "rgba(255, 201, 11, 1)";
  } else if (hoverRating >= index && editing) {
    return "rgba(255, 201, 11, 1)";
  } else if (!hoverRating && rating >= index) {
    return "rgba(255, 201, 11, 1)";
  }
  return "#DEDEDE";
};

const getPinkFillColor = (rating, hoverRating, index, editing) => {
  if (!editing && rating >= index) {
    return "#FB177D";
  } else if (hoverRating >= index && editing) {
    return "#FB177D";
  } else if (!hoverRating && rating >= index) {
    return "#FB177D";
  }
  return "#FB177D";
};

const SchemeFillColorOptions={
  yellow: getYellowFillColor,
  pink: getPinkFillColor
}

function StarRatingIcon({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
  editing,
  starSchemeColor
}) {
  
  const fill= SchemeFillColorOptions[starSchemeColor](rating,hoverRating,index,editing);

  return (
    <div
      className={classes(
        styles.StarRatingIcon,
        editing && styles.StarRatingEditable
      )}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <StarIcon
        stroke={fill}
        fill={fill}
        height={"14px"}
        className={classes(
          editing && styles.StarIconEditable,
          hoverRating === index && styles.isHovering
        )}
        
      />
    </div>
  );
}

export default StarRatingIcon;
