import React, {Component} from 'react';
import StarRatingComponent from "react-star-rating-component";
import {contractOperations} from "../../../state/ducks/contracts";
import {connect} from "react-redux";

class ReviewCreatorLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            review: {
                stars: 0,
                comment: ""
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.saveReview = this.saveReview.bind(this);
    }

    onStarClick(nextValue, prevValue, name) {
        const {review} = this.state;
        review.stars = nextValue;
        this.setState({review});
    }

    handleChange(e) {
        const {review} = this.state;
        review.comment = e.target.value;
        this.setState({review});
    }

    saveReview() {
        this.props.saveClientContractReview(this.props.contract.reference, this.state.review)
    }

    renderReviewForm() {
        if (this.props.isCompleted) {
            return (<h6 className="">El comentario ha sido enviado.</h6>)
        } else {
            return (
                <>
                    <h5 className="font-weight-bold">
                        Enviale un comentario
                        a {this.props.contract.celebrity ? this.props.contract.celebrity.full_name : null}</h5>
                    <div className="mt-2">
                        <div className="mb-2">
                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={this.state.review.stars}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </div>
                        <textarea className="form-control"
                                  autoFocus={true}
                                  value={this.state.review.comment}
                                  onChange={this.handleChange}
                        />
                        <button className="btn btn-sm btn-primary mt-2"
                                onClick={this.saveReview}
                        >
                            {
                                this.props.isLoading
                                    ?
                                    <span className="spinner-grow spinner-grow-sm"
                                          role="status"
                                          aria-hidden="true"
                                    />
                                    :
                                    <span>Enviar comentario</span>
                            }
                        </button>
                    </div>
                </>
            )
        }
    }

    render() {
        return (
            <div className="ReviewCreatorLayout">
                {
                    this.props.contract.reviews
                        ?
                        !this.props.contract.reviews.length
                            ?this.renderReviewForm()
                            : null
                        : null
                }
            </div>
        );
    };

}


// Set propTypes
ReviewCreatorLayout.propTypes = {};

// Set defaultProps
ReviewCreatorLayout.defaultProps = {
    contract: {reviews: []}
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.contracts.saveClientContractReviewReducer.loading,
    isCompleted: state.contracts.saveClientContractReviewReducer.completed,
    contractReview: state.contracts.saveClientContractReviewReducer.data.contractReview
});

// mapStateToProps
const mapDispatchToProps = {
    saveClientContractReview: contractOperations.saveClientContractReview
};

// Export Class
const _ReviewCreatorLayout = connect(mapStateToProps, mapDispatchToProps)(ReviewCreatorLayout);
export {_ReviewCreatorLayout as ReviewCreatorLayout};
