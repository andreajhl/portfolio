import React, { Component } from "react";
import "./styles.scss";

class CelebrityShimmerReviewCardLayout extends Component {
  render() {
    return (
      <div className="CelebrityShimmerReviewCardLayout">
        <div className="shimmer-card f-card f-rounded hover f-shadow p-4 cursor-pointer text-center mx-auto">
          <div className="title-line mt-2 user-full-name" />
          <div className="mt-2 review-stars text-left">
            <i className="fa fa-star fa-1x mr-2 review-star-icon" />
            <i className="fa fa-star fa-1x mr-2 review-star-icon" />
            <i className="fa fa-star fa-1x mr-2 review-star-icon" />
            <i className="fa fa-star fa-1x mr-2 review-star-icon" />
            <i className="fa fa-star fa-1x mr-2 review-star-icon" />
          </div>
          <div className="review-content mt-2">
            <div className="title-line mt-1 review__first-line" />
            <div className="title-line mt-1 review__second-line" />
            <div className="title-line mt-1 review__third-line" />
          </div>
        </div>
      </div>
    );
  }
}

export { CelebrityShimmerReviewCardLayout };
