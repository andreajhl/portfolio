import { CardReviewProps } from "desktop-app/types/cardReviewProps";
import React, { ReactNode } from "react";
import { CelebrityReviewCardLayout } from "react-app/src/components/layouts/celebrity-review-card";
import InfiniteScroll from "react-infinite-scroll-component";
import Popup from "reactjs-popup";
import CardReview from "../../../components/common/cards/review";
import styles from "./styles.module.scss";

type LastReviewsModalProps = {
  children: {
    triggerElement: JSX.Element;
  };
  reviews: Array<CardReviewProps>;
  fetchMoreData: () => void;
};

const LastReviewsModal = ({
  children,
  reviews,
  fetchMoreData
}: LastReviewsModalProps) => {
  return (
    <Popup trigger={children.triggerElement} modal>
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
    </Popup>
  );
};
export default LastReviewsModal;
