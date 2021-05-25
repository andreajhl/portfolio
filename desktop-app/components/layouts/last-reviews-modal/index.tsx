import { AnimatedPopup } from "desktop-app/components/common/animated-popup";
import { CloseModalButton } from "desktop-app/components/common/button/close-modal-button";
import React from "react";
import { listReviews } from "react-app/src/state/ducks/celebrities/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import CardReview from "../../../components/common/cards/review";
import classes from "classnames";
import styles from "./styles.module.scss";

const mapStateToProps = ({ celebrities }) => ({
  celebrityId: celebrities.getCelebrityReducer.data.id,
  isLoading: celebrities.fetchReviewsReducer.loading,
  reviews: celebrities.fetchReviewsReducer.data.results,
  informationPage: celebrities.fetchReviewsReducer.data.informationPage,
});

const mapDispatchToProps = {
  listReviews,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type LastReviewsModalProps = {
  children: {
    triggerElement: JSX.Element;
  };
} & StateProps &
  DispatchProps;

function LastReviewsModal({
  children,
  listReviews,
  reviews,
  celebrityId,
  informationPage,
}: LastReviewsModalProps) {
  function fetchMoreData() {
    listReviews(
      celebrityId,
      {
        ...informationPage,
        currentPage: informationPage.currentPage + 1,
      },
      true
    );
  }

  return (
    <AnimatedPopup trigger={children.triggerElement} modal>
      {(closeModal) => (
        <div className={styles.LastReviewsModal}>
          <header className={styles.LastReviewsModalHeader}>
            <span>Últimas calificaciones</span>
            <CloseModalButton variant="light" onClick={closeModal} />
          </header>
          <InfiniteScroll
            height={"75vh"}
            dataLength={reviews.length}
            next={fetchMoreData}
            hasMore={
              informationPage.currentPage * informationPage.pageSize <=
              reviews.length
            }
            loader={
              <footer className={styles.LastReviewsModalFooter}>
                Cargando{" "}
                <i className={classes("fa fa-circle-notch", styles.Spinner)} />
              </footer>
            }
          >
            {reviews.map((review) => (
              <div className={styles.ReviewItem}>
                <CardReview
                  showBox={false}
                  contract_stars={review.contract_stars}
                  user_full_name={review.user_full_name}
                  date={review.date}
                  contract_review={review.contract_review}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </AnimatedPopup>
  );
}

const _LastReviewsModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(LastReviewsModal);

export { _LastReviewsModal as LastReviewsModal };
