import { useState } from "react";
import StarRatingIcon from "../icon";
import styles from "./styles.module.scss";

function StarRatingDisplay({
  value,
  editing,
  className = "",
  onChangeRating = function (value) {},
}) {
  const [rating, setRating] = useState(value | 0);

  const [hoverRating, setHoverRating] = useState(0);

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
    onChangeRating(index + 1);
  };

  return (
    <div className={`${styles.StarRatingDisplay} ${className}`}>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <StarRatingIcon
            key={index}
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
}

export default StarRatingDisplay;
