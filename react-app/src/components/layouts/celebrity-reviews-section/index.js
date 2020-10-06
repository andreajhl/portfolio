import React, { Component } from "react";
import "./styles.scss";
import { CelebrityReviewCardLayout } from "../../layouts/celebrity-review-card";
import { connect } from "react-redux";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { PaginationLayout } from "../../layouts/pagination";
import { CelebrityShimmerReviewCardLayout } from "../celebrity-shimmer-review-card";

class CelebrityReviewsSectionLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {}
    };

    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.fetchReviews = this.fetchReviews.bind(this);
  }

  fetchReviews() {
    this.props.listReviews(this.props.celebrityId, this.state.params);
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
      },
      () => this.fetchReviews()
    );
  }

  renderShimmerReviewCards() {
    const shimmersCards = [];
    for (let index = 0; index < 3; index++) {
      shimmersCards.push(
        <div className="col-12 col-md-4 col-lg-4 col-xl-4 mb-4" key={index}>
          <CelebrityShimmerReviewCardLayout />
        </div>
      );
    }
    return shimmersCards;
  }

  render() {
    const hasReviews = this.props.reviews.length > 0;
    return (
      <div className="CelebrityReviewsSectionLayout">
        {this.props.isLoading || hasReviews ? (
          <div className="f-container mb-2 pb-2">
            <div className="row f-section mx-auto pt-2">
              <div className="col-12 mb-4">
                <b>Calificaciones</b>
              </div>
              {this.props.isLoading
                ? this.renderShimmerReviewCards()
                : this.props.reviews.map((review, index) => {
                    return (
                      <div
                        className="col-12 col-md-4 col-lg-4 col-xl-4 mb-4"
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
        ) : null}
      </div>
    );
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
