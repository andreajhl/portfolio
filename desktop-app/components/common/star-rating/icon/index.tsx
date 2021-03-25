import React from "react";
import { StarIcon } from "../../icons";
import styles from "./styles.module.scss";
type StarRatingProps = {
  index: number;
  rating: number;
  editing: boolean;
};

const StarRatingIcon = (props) => {
  const {
    index,
    rating,
    hoverRating,
    onMouseEnter,
    onMouseLeave,
    onSaveRating,
    editing
  } = props;

  const fill = React.useMemo(() => {
    if (!editing && rating >= index) {
      return "rgba(255, 201, 11, 1)";
    } else if (hoverRating >= index && editing) {
      return "rgba(255, 201, 11, 1)";
    } else if (!hoverRating && rating >= index) {
      return "rgba(255, 201, 11, 1)";
    }
    return "none";
  }, [rating, hoverRating, index, editing]);

  return (
    <div className={styles.StarRatingIcon}>
      <StarIcon
        fill={fill}
        height={"14px"}
        className="cursor-pointer"
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={() => onMouseLeave()}
        onClick={() => onSaveRating(index)}
      ></StarIcon>
    </div>
  );
};

export default StarRatingIcon;
