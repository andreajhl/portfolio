import React from "react";
import { StarIcon } from "../../icons";
import styles from "./styles.module.scss";
import classes from "classnames";

// TODO: conectar types
// type StarRatingProps = {
//   index: number;
//   rating: number;
//   editing: boolean;
//   color: string
// };

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
  return "none";
};

const SchemeFillColorOptions = {
  yellow: getYellowFillColor,
  pink: getPinkFillColor,
};

function StarRatingIcon({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
  editing,
  starSchemeColor,
}) {
  const fill = SchemeFillColorOptions[starSchemeColor](
    rating,
    hoverRating,
    index,
    editing
  );

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
      {starSchemeColor === "yellow" ? (
        <StarIcon
          stroke={fill}
          fill={fill}
          height={"14px"}
          className={classes(
            editing && styles.StarIconEditable,
            hoverRating === index && styles.isHovering
          )}
        />
      ) : (
        <svg
          width="35"
          height="20"
          viewBox="0 0 35 34"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          stroke={fill}
          className={classes(
            editing && styles.StarIconEditable,
            hoverRating === index && styles.isHovering
          )}
        >
          <path
            d="M17.5 1.23607L20.927 11.7832C21.1947 12.6072 21.9626 13.1652 22.8291 13.1652H33.919L24.9471 19.6836C24.2461 20.1929 23.9528 21.0957 24.2205 21.9197L27.6475 32.4668L18.6756 25.9483C17.9746 25.439 17.0254 25.4391 16.3244 25.9483L7.35251 32.4668L10.7795 21.9197C11.0472 21.0956 10.7539 20.1929 10.0529 19.6836L9.46515 20.4926L10.0529 19.6836L1.08102 13.1651L12.1709 13.1652C13.0374 13.1652 13.8053 12.6072 14.073 11.7832L17.5 1.23607Z"
            stroke="#FF0E7A"
            stroke-width="2"
          />
        </svg>
      )}
    </div>
  );
}

export default StarRatingIcon;
