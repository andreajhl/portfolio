import { AnimatedPopup } from "desktop-app/components/common/animated-popup";
import React, { useState } from "react";
import { REVIEWS } from "react-app/src/state/ducks/celebrities/paths";
import apiService from "react-app/src/state/utils/apiService";
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

const LastReviewsModal = ({
  children,
  reviews,
  paginationData
}: LastReviewsModalProps) => {
  const [dataReviews, setDataReviews] = useState(reviews);
  const [informationPage, setInformationPage] = useState(paginationData);
  const FINAL_PATH = REVIEWS + 609;
  const [error, setError] = useState(null);
  const fetchMoreData = async () => {
    try {
      const response: any = await apiService({
        method: "GET",
        path: FINAL_PATH,
        params: {
          currentPage: informationPage.currentPage + 1,
          pageSize: informationPage.pageSize
        }
      });
      console.log(response);
      if (response.data.status === "ERROR") throw response.data;
      setDataReviews((state) => [...state, ...response.data.results]);
      setInformationPage(response.data.informationPage);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <AnimatedPopup trigger={children.triggerElement} modal>
      <div className={styles.LastReviewsModal}>
        <div className={styles.LastReviewsModalHeader}>
          <span>Últimas calificaciones</span>
        </div>
        <InfiniteScroll
          height={"75vh"}
          dataLength={dataReviews.length}
          next={fetchMoreData}
          hasMore={
            informationPage.currentPage * informationPage.pageSize <=
            dataReviews.length
          }
          // TODO: add loading banner
          loader={<h4>Loading...</h4>}
        >
          {dataReviews.map((review) => (
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
