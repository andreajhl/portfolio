import React, { Component } from "react";
import "./styles.scss";

class CelebrityReviewCardLayout extends Component {
  render() {
    return (
      <div className="CelebrityReviewCardLayout">
        <div className="card card-review px-4 py-3">
          <div className="card-body p-0 d-flex justify-content-between align-items-center">
            <h6 className="font-weight-bold CelebrityReviewCardLayout__full-name">
              {this.props.review.user_full_name
                ? this.props.review.user_full_name
                : "Anónimo"}
            </h6>
            <h5 className="text-warning">
              {[...Array(this.props.review.contract_stars)].map((i, index) => {
                return (
                  <i
                    key={index}
                    className="fa fa-star text-warning fa-1x mr-2"
                  />
                );
              })}
              {[...Array(5 - this.props.review.contract_stars)].map(
                (i, index) => {
                  return <i key={index} className="fa fa-star fa-1x mr-2" />;
                }
              )}
            </h5>
          </div>
          <p className="comment text-justify mb-0">
            {this.props.review.contract_review}
          </p>
        </div>
      </div>
    );
  }
}

// default props
CelebrityReviewCardLayout.defaultProps = {
  review: {
    client: { user: {} }
  }
};

export { CelebrityReviewCardLayout };
