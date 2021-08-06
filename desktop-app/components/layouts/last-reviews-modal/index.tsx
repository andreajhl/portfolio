import { AnimatedPopup } from "desktop-app/components/common/animated-popup";
import { CloseModalButton } from "desktop-app/components/common/button/close-modal-button";
import React from "react";
import { listReviewsV2 } from "react-app/src/state/ducks/celebrities/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect, ConnectedProps } from "react-redux";
import CardReview from "../../../components/common/cards/review";
import classes from "classnames";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";

const mapStateToProps = ({ celebrities }) => ({
  celebrityUsername: celebrities.getCelebrityReducer.data.username,
  isLoading: celebrities.fetchReviewsReducer.loading,
  reviews: celebrities.fetchReviewsReducer.data.results,
  informationPage: celebrities.fetchReviewsReducer.data.informationPage,
});

const mapDispatchToProps = {
  listReviews: listReviewsV2,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type LastReviewsModalProps = {
  children: {
    triggerElement: JSX.Element;
  };
} & PropsFromRedux;

function LastReviewsModal({
  children,
  listReviews,
  reviews,
  celebrityUsername,
  informationPage,
}: LastReviewsModalProps) {
  function fetchMoreData() {
    listReviews(
      celebrityUsername,
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
            <span>
              <FormattedMessage defaultMessage="Últimas calificaciones" />
            </span>
            <CloseModalButton variant="light" onClick={closeModal} />
          </header>
          <InfiniteScroll
            height="75vh"
            dataLength={reviews.length}
            next={fetchMoreData}
            hasMore={informationPage.totalItems > reviews.length}
            loader={
              <footer className={styles.LastReviewsModalFooter}>
                <FormattedMessage defaultMessage="Cargando" />{" "}
                <i className={classes("fa fa-circle-notch", styles.Spinner)} />
              </footer>
            }
          >
            {reviews.map((review, index) => (
              <div className={styles.ReviewItem} key={index}>
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

const _LastReviewsModal = connector(LastReviewsModal);

export { _LastReviewsModal as LastReviewsModal };
