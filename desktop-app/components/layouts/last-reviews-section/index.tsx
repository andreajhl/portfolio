import CardReview from "desktop-app/components/common/cards/review";
import React from "react";
import styles from "./styles.module.scss";
import { CardReviewProps } from "../../../types/cardReviewProps";

type LastReviewsSectionProps = {
  reviews: Array<CardReviewProps>;
  onShowMore: () => void;
  showMore: boolean;
};

const LastReviewsSection = ({
  reviews = [],
  onShowMore,
  showMore = true
}: LastReviewsSectionProps) => {
  return (
    <div className={styles.LastReviewsSection}>
      <h2>Calificaciones</h2>
      <div className={styles.ReviewsCards}>
        {reviews.map((review) => (
          <CardReview
            contract_review={review.contract_review}
            user_full_name={review.user_full_name}
            date="20/dic/2020"
            contract_stars={review.contract_stars}
          ></CardReview>
        ))}
      </div>
      {showMore ? (
        <p className={styles.SeeMoreCTA} onClick={onShowMore}>
          Ver todas las calificaciones
        </p>
      ) : null}
    </div>
  );
};

export default LastReviewsSection;
