import React from "react";
import StarRatingIcon from "../icon";
import styles from "./styles.module.scss";
const StarRatingDisplay = (props) => {
  const { value, editing } = props;

  const [rating, setRating] = React.useState(value | 0);

  const [hoverRating, setHoverRating] = React.useState(0);

  const onMouseEnter = (index) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    if (!editing) return;
    setHoverRating(0);
  };

  const onSaveRating = (index) => {
    if (!editing) return;
    setRating(index);
  };
  return (
    <div className={styles.StarRatingDisplay}>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <StarRatingIcon
            editing={editing}
            index={index}
            rating={rating}
            hoverRating={hoverRating}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSaveRating={onSaveRating}
          />
        );
      })}
    </div>
  );
};

export default StarRatingDisplay;
