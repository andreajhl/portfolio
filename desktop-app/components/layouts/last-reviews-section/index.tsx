import CardReview from "desktop-app/components/common/cards/review";
import React from "react";
import styles from "./styles.module.scss";
import { CardReviewProps } from "../../../types/cardReviewProps";
import Popup from "reactjs-popup";
import LastReviewsModal from "../last-reviews-modal";

type LastReviewsSectionProps = {
  reviews: Array<CardReviewProps>;
  showMore: boolean;
};

const LastReviewsSection = ({
  reviews = [],
  showMore = true
}: LastReviewsSectionProps) => {
  const getMoreData = () => {
    console.log("TODO -> Realizar dispatch");
  };

  return (
    <div className={styles.LastReviewsSection}>
      <h2>Calificaciones</h2>
      <div className={styles.ReviewsCards}>
        {[...reviews].slice(0, 2).map((review) => (
          <CardReview
            contract_review={review.contract_review}
            user_full_name={review.user_full_name}
            date="20/dic/2020"
            contract_stars={review.contract_stars}
          ></CardReview>
        ))}
      </div>
      {showMore ? (
        <LastReviewsModal reviews={reviews} fetchMoreData={getMoreData}>
          {{
            triggerElement: (
              <p className={styles.SeeMoreCTA}>Ver todas las calificaciones</p>
            )
          }}
        </LastReviewsModal>
      ) : null}
    </div>
  );
};

export default LastReviewsSection;
