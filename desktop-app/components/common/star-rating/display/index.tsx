import styles from "./styles.module.scss";
import StarRatingIcon from "../icon";
import { useState } from "react";

function StarRatingDisplay({
  value,
  editing,
  className = "",
  onChangeRating = function (value) {},
  starSchemeColor = "yellow",
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
    onChangeRating(index);
  };

  return (
    <div
      className={
        starSchemeColor === "yellow"
          ? `${styles.StarRatingDisplay_yellow} ${className}`
          : `${styles.StarRatingDisplay_pink} ${className}`
      }
    >
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
            starSchemeColor={starSchemeColor}
          />
        );
      })}
    </div>
  );
}

export default StarRatingDisplay;
