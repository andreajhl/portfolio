import React, { Component } from "react";

import { CelebrityReviewCardLayout } from "../../layouts/celebrity-review-card";
import { connect } from "react-redux";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { PaginationLayout } from "../../layouts/pagination";
import { CelebrityShimmerReviewCardLayout } from "../celebrity-shimmer-review-card";
import { FormattedMessage } from "react-intl";

class CelebrityReviewsSectionLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: { currentPage: 1 }
    };

    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }

  onPaginationChange(page) {
    this.updateParams("currentPage", page);
  }

  updateParams(key, value) {
    const { params } = this.state;
    params[key] = value;
    if (key === "search") {
      params["currentPage"] = 1;
    }
    this.setState(
      {
        params: params
      }
      // () => this.fetchReviews()
    );
  }

  renderShimmerReviewCards() {
    const shimmersCards = [];
    for (let index = 0; index < 3; index++) {
      shimmersCards.push(
        <div
          className="col-12 col-md-6 col-xl-4 mb-3 CelebrityReviewsSectionLayout__review"
          key={index}
        >
          <CelebrityShimmerReviewCardLayout />
        </div>
      );
    }
    return shimmersCards;
  }

  render() {
    const hasReviews = this.props.reviews.length > 0;
    return this.props.isLoading || hasReviews ? (
      <div className="CelebrityReviewsSectionLayout pt-3 pb-2">
        <div className="container mb-2 pb-2">
          <div className="row mx-auto pt-2">
            <h5 className="col-12 mb-4 CelebrityReviewsSectionLayout__title">
              <FormattedMessage defaultMessage="Calificaciones" />
            </h5>
            {this.props.isLoading
              ? this.renderShimmerReviewCards()
              : this.props.reviews.map((review, index) => {
                  return (
                    <div
                      className="col-12 col-md-6 col-xl-4 mb-3 CelebrityReviewsSectionLayout__review"
                      key={review.id + "-" + index}
                    >
                      <CelebrityReviewCardLayout review={review} />
                    </div>
                  );
                })}
            <div className="col-12">
              {/* PaginationLayout */}
              <PaginationLayout
                showFmainPadding={false}
                pagination={this.props.paginationData}
                onPaginationChange={this.onPaginationChange}
              />
              {/* End PaginationLayout */}
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

// Set propTypes
CelebrityReviewsSectionLayout.propTypes = {};

// Set defaultProps
CelebrityReviewsSectionLayout.defaultProps = {
  celebrity: {},
  reviews: [],
  paginationData: {}
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.celebrities.fetchReviewsReducer.loading,
  reviews: state.celebrities.fetchReviewsReducer.data.results,
  paginationData: state.celebrities.fetchReviewsReducer.data.informationPage
});

// mapStateToProps
const mapDispatchToProps = {
  listReviews: celebrityOperations.listReviews
};

// Export Class
const _CelebrityReviewsSectionLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityReviewsSectionLayout);
export { _CelebrityReviewsSectionLayout as CelebrityReviewsSectionLayout };
