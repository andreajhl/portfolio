import CardReview from "desktop-app/components/common/cards/review";
import React from "react";
import styles from "./styles.module.scss";
import { CardReviewProps } from "../../../types/cardReviewProps";
import Popup from "reactjs-popup";
import { celebrityOperations } from "react-app/src/state/ducks/celebrities";
import { connect } from "react-redux";
import { listReviews } from "react-app/src/state/ducks/celebrities/actions";
import Maybe from "desktop-app/components/common/helpers/maybe";
import dynamic from "next/dynamic";

const LastReviewsModal = dynamic(() =>
  import("../last-reviews-modal").then((mod) => mod.LastReviewsModal)
);

// mapStateToProps
const mapStateToProps = ({ celebrities }) => ({
  isLoading: celebrities.fetchReviewsReducer.loading,
  reviews: celebrities.fetchReviewsReducer.data.results as [any],
  paginationData: celebrities.fetchReviewsReducer.data.informationPage,
});

// mapStateToProps
const mapDispatchToProps = {
  listReviews: celebrityOperations.listReviews,
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type LastReviewsSectionProps = {
  showMore: boolean;
} & StateProps &
  DispatchProps;

const LastReviewsSection = ({
  reviews = [{}],
  showMore = true,
  listReviews,
  paginationData,
  isLoading,
}: LastReviewsSectionProps) => {
  return (
    <Maybe it={reviews.length > 0}>
      <div className={styles.LastReviewsSection}>
        <h2>Calificaciones</h2>
        <div className={styles.ReviewsCards}>
          {[...reviews].slice(0, 2).map((review, index) => (
            <CardReview
              key={index}
              contract_review={review.contract_review}
              user_full_name={review.user_full_name}
              date="20/dic/2020"
              contract_stars={review.contract_stars}
            />
          ))}
        </div>
        {showMore && reviews.length > 2 ? (
          <LastReviewsModal>
            {{
              triggerElement: (
                <p className={styles.SeeMoreCTA}>
                  Ver todas las calificaciones
                </p>
              ),
            }}
          </LastReviewsModal>
        ) : null}
      </div>
    </Maybe>
  );
};

const _LastReviewsSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(LastReviewsSection);

export { _LastReviewsSection as LastReviewsSection };
