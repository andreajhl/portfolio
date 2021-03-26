import { AnimatedPopup } from "desktop-app/components/common/animated-popup";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import CardReview from "../../../components/common/cards/review";
import styles from "./styles.module.scss";

// mapStateToProps
const mapStateToProps = ({ celebrities }) => ({
  isLoading: celebrities.fetchReviewsReducer.loading,
  reviews: celebrities.fetchReviewsReducer.data.results,
  paginationData: celebrities.fetchReviewsReducer.data.informationPage
});

type StateProps = ReturnType<typeof mapStateToProps>;

type LastReviewsModalProps = {
  children: {
    triggerElement: JSX.Element;
  };
} & StateProps;

const LastReviewsModal = ({ children, reviews }: LastReviewsModalProps) => {
  const fetchMoreData = () => {
    console.log("fetchMoreData");
  };
  return (
    <AnimatedPopup trigger={children.triggerElement} modal>
      <div className={styles.LastReviewsModal}>
        <div className={styles.LastReviewsModalHeader}>
          <span>Últimas valoraciones</span>
        </div>
        <InfiniteScroll
          height={"75vh"}
          dataLength={reviews.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {reviews.map((review) => (
            <div className={styles.ReviewItem}>
              <hr></hr>
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
    </AnimatedPopup>
  );
};

const _LastReviewsModal = connect(mapStateToProps)(LastReviewsModal);

export { _LastReviewsModal as LastReviewsModal };
