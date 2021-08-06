import React from "react";
import classes from "classnames";

import { StarIcon } from "../../icons";
import StarRatingDisplay from "../../star-rating/display";
import styles from "./styles.module.scss";
import { CardReviewProps } from "../../../../types/cardReviewProps";

function CardReview({
  contract_stars,
  user_full_name,
  date,
  contract_review,
  showBox = true,
}: CardReviewProps) {
  return (
    <div
      className={classes(styles.CardReview, {
        [styles.CardReviewBox]: showBox,
      })}
    >
      <div className={styles.ReviewDetails}>
        <StarIcon />
        <span className={styles.ReviewStarValue}>
          {Number(contract_stars).toFixed(1)}
        </span>
        {date ? <span className={styles.ReviewDate}>{date}</span> : null}
        <StarRatingDisplay editing={false} value={contract_stars} />
      </div>
      <p className={styles.UserName}>{user_full_name}</p>
      <p className={styles.ReviewText}>{contract_review}</p>
    </div>
  );
}

export default CardReview;
