import React from "react";
import classes from "classnames";

import { StarIcon } from "../../icons";
import StarRatingDisplay from "../../star-rating/display";
import styles from "./styles.module.scss";
import { CardReviewProps } from "../../../../types/cardReviewProps";

const CardReview = ({
  contract_stars,
  user_full_name,
  date,
  contract_review,
  showBox = true
}: CardReviewProps) => {
  return (
    <div
      className={classes(styles.CardReview, {
        [styles.CardReviewBox]: showBox
      })}
    >
      <div className={styles.ReviewDetails}>
        <StarIcon></StarIcon>
        <span className={styles.ReviewStarValue}>
          {Number(contract_stars).toFixed(1)}
        </span>
        <span className={styles.ReviewDate}>{date}</span>
        <StarRatingDisplay
          editing={false}
          value={contract_stars}
        ></StarRatingDisplay>
      </div>
      <p className={styles.UserName}>{user_full_name}</p>
      <p>{contract_review}</p>
    </div>
  );
};

export default CardReview;
