import React from "react";
import classes from "classnames";

import { StarIcon } from "../../icons";
import StarRatingDisplay from "../../star-rating/display";
import styles from "./styles.module.scss";
const CardReview = ({
  stars,
  celebrity_name,
  date,
  comment,
  showBox = true
}) => {
  return (
    <div
      className={classes(styles.CardReview, {
        [styles.CardReviewBox]: showBox
      })}
    >
      <div className={styles.ReviewDetails}>
        <StarIcon></StarIcon>
        <span className={styles.ReviewStarValue}>
          {Number(stars).toFixed(1)}
        </span>
        <span className={styles.ReviewDate}>{date}</span>
        <StarRatingDisplay editing={false} value={stars}></StarRatingDisplay>
      </div>
      <p>{celebrity_name}</p>
      <p>{comment}</p>
    </div>
  );
};

export default CardReview;
