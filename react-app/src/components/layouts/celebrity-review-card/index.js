import React from "react";
import * as GTM from "../../../state/utils/gtm";

const CelebrityReviewCardLayout = ({ review }) => {
  const registerCelebrityReviewCardHover = () => {
    GTM.tagManagerDataLayer("HOVER_CELEBRITY_REVIEW_CARD", {
      widget: "CelebrityReviewCardLayout",
      path: window.location.pathname,
      ...review
    });
  };

  return (
    <div
      className="CelebrityReviewCardLayout"
      onMouseOver={registerCelebrityReviewCardHover}
    >
      <div className="card card-review px-4 py-3">
        <div className="card-body p-0 d-flex justify-content-between align-items-center">
          <h6 className="font-weight-bold CelebrityReviewCardLayout__full-name text-with-ellipsis">
            {review.user_full_name ? review.user_full_name : "Anónimo"}
          </h6>
          <h5 className="text-warning flex-shrink-0">
            {[...Array(review.contract_stars)].map((i, index) => {
              return (
                <i key={index} className="fa fa-star text-warning fa-1x mr-2" />
              );
            })}
            {[...Array(5 - review.contract_stars)].map((i, index) => {
              return (
                <img
                  src="assets/img/star-outlined.svg"
                  width="22.5"
                  className="mr-2"
                  key={index}
                  alt="star-outlined"
                />
              );
              // return <i key={index} className="fa fa-star fa-1x mr-2" />;
            })}
          </h5>
        </div>
        <p className="comment text-justify mb-0">{review.contract_review}</p>
      </div>
    </div>
  );
};

// default props
CelebrityReviewCardLayout.defaultProps = {
  review: {
    client: { user: {} }
  }
};

export { CelebrityReviewCardLayout };
