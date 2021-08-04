import React from "react";
import { StarIcon } from "../../icons";
import styles from "./styles.module.scss";
import classes from "classnames";

type StarRatingProps = {
  index: number;
  rating: number;
  editing: boolean;
};

const getFillColor = (rating, hoverRating, index, editing) => {
  if (!editing && rating >= index) {
    return "rgba(255, 201, 11, 1)";
  } else if (hoverRating >= index && editing) {
    return "rgba(255, 201, 11, 1)";
  } else if (!hoverRating && rating >= index) {
    return "rgba(255, 201, 11, 1)";
  }
  return "#DEDEDE";
};

function StarRatingIcon({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
  editing,
}) {
  const fill = getFillColor(rating, hoverRating, index, editing);

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
      ></StarIcon>
    </div>
  );
}

export default StarRatingIcon;
