import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import { Session } from "../../../state/utils/session";

import { saveClientContractReview } from "../../../state/ducks/contracts/actions";

class ReviewCreatorLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewData: {
        stars: 5,
        review: ""
      },
      showReviewError: false,
      dataSent: false,
      isLoading: false
    };

    this.session = new Session();

    this.handleChange = this.handleChange.bind(this);
    this.saveReview = this.saveReview.bind(this);
  }

  onStarClick(nextValue, prevValue, name) {
    const { reviewData } = this.state;
    if (nextValue === 0) {
      reviewData.stars = 1;
    } else {
      reviewData.stars = nextValue;
    }
    this.setState({
      ...this.state,
      reviewData
    });
  }

  handleChange(e) {
    const { reviewData } = this.state;
    reviewData.review = e.target.value;
    this.setState({
      ...this.state,
      reviewData
    });
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      reviewData: {
        review: this.props.contract.review,
        stars: this.props.contract.stars || 5
      }
    });
  }

  saveReview() {
    this.setState({
      isLoading: true
    });
    if (
      this.state.reviewData.review &&
      this.state.reviewData.review !== "" &&
      this.state.reviewData.review.length !== null
    ) {
      saveClientContractReview(
        this.props.contract.reference,
        this.state.reviewData
      ).then((data) => {
        if (data.status === "OK") {
          this.setState({
            showReviewError: false,
            isCompleted: true,
            isLoading: false
          });
        } else {
          this.setState({
            showReviewError: true,
            isLoading: false
          });
        }
      });
    } else {
      this.setState({
        showReviewError: true,
        isLoading: false
      });
    }
  }

  returnCountStars = () => {
    if (this.state.reviewData.stars === 1) {
      return "1 Estrella";
    }
    return this.state.reviewData.stars + " Estrellas";
  };

  renderReviewFormCreator() {
    if (this.state.isCompleted) {
      return (
        <h6 className="">
          El comentario ha sido enviado. <i className="fa fa-check ml-2" />
        </h6>
      );
    } else {
      return (
        <>
          <h5 className="font-weight-bold">
            Envíale un comentario a{" "}
            {this.props.contract.celebrityData
              ? this.props.contract.celebrityData.fullName
              : null}
          </h5>
          <br />
          <div className="mt-2">
            <div className="mb-2">
              <h6 className={"font-weight-bold"}>
                ¿Cuántas estrellas le das a este video?
              </h6>
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={this.state.reviewData.stars || 5}
                onStarClick={this.onStarClick.bind(this)}
              />
              <div className={"mb-4 text-muted"}>
                <small>{this.returnCountStars()}</small>
              </div>
            </div>
            <h6 className={"font-weight-bold"}>Escribe un comentario</h6>
            <textarea
              className={
                "form-control" +
                (this.state.showReviewError ? " border-danger " : "")
              }
              autoFocus={this.props.autoFocus}
              rows={3}
              value={this.state.reviewData.review || ""}
              onChange={this.handleChange}
            />
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={this.saveReview}
            >
              {this.state.isLoading ? (
                <span
                  className="text-white spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <span className="text-white">Enviar comentario</span>
              )}
            </button>
          </div>
        </>
      );
    }
  }

  renderReviewFormEditor() {
    if (this.state.isCompleted) {
      return (
        <h6 className="">
          El comentario ha sido actualizado. <i className="fa fa-check ml-2" />
        </h6>
      );
    } else {
      return (
        <>
          <h5 className="font-weight-bold">
            Actualiza tu comentario a{" "}
            {this.props.contract.celebrityData
              ? this.props.contract.celebrityData.fullName
              : null}
          </h5>
          <div className="mt-2">
            <div className="mb-2">
              <h6>¿Cuántas estrellas le das a este video?</h6>
              <br />
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={this.state.reviewData.stars}
                onStarClick={this.onStarClick.bind(this)}
              />
            </div>
            <textarea
              className={
                "form-control" +
                (this.state.showReviewError ? " border-danger " : "")
              }
              autoFocus={this.props.autoFocus}
              value={this.state.reviewData.review || ""}
              rows={3}
              onChange={this.handleChange}
            />
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={this.saveReview}
            >
              {this.state.isLoading ? (
                <span
                  className="text-white spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <span className="text-white">Actualizar comentario</span>
              )}
            </button>
          </div>
        </>
      );
    }
  }

  render() {
    return (
      <div className="ReviewCreatorLayout">
        {!this.props.contract.review
          ? this.renderReviewFormCreator()
          : this.renderReviewFormEditor()}
      </div>
    );
  }
}

// Set propTypes
ReviewCreatorLayout.propTypes = {};

// Set defaultProps
ReviewCreatorLayout.defaultProps = {
  contract: {
    reference: null,
    review: null,
    stars: 0
  },
  autoFocus: true
};

// Export Class
export { ReviewCreatorLayout };
