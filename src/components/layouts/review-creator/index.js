import React, {Component} from 'react';
import StarRatingComponent from "react-star-rating-component";
import {contractOperations} from "../../../state/ducks/contracts";
import {connect} from "react-redux";
import {Session} from "../../../state/utils/session";
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import "./styles.scss";

class ReviewCreatorLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstTime: true,
            reviewData: {
                stars: 0,
                review: ""
            }
        };

        this.session = new Session();

        this.handleChange = this.handleChange.bind(this);
        this.saveReview = this.saveReview.bind(this);
    }

    onStarClick(nextValue, prevValue, name) {
        const {reviewData} = this.state;
        reviewData.stars = nextValue;
        this.setState({reviewData}, () => console.log(this.state));
    }

    handleChange(e) {
        const {reviewData} = this.state;
        reviewData.review = e.target.value;
        this.setState({reviewData}, () => console.log(this.state));
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        const {firstTime} = this.state;
        const {reviewData} = this.state;
        if (firstTime && nextProps.contract.reference) {
            reviewData.stars = nextProps.contract.stars;
            reviewData.review = nextProps.contract.review;
            this.setState({reviewData, firstTime: false})
        }
    }

    saveReview() {
        if (this.state.reviewData.review && this.state.reviewData.review !== "" && this.state.reviewData.review.length !== null) {
            this.props.saveClientContractReview(this.props.contract.reference, this.state.reviewData)
        } else {
            this.setState({
                showReviewError: true
            })
        }
    }

    goToSignIn() {
        localStorage.setItem("redirectTo", history.location.pathname);
        history._pushRoute(PATHS.SIGN_IN_PATH);
    }

    goToSignUp() {
        localStorage.setItem("redirectTo", history.location.pathname);
        history._pushRoute(PATHS.SIGN_UP_PATH);
    }

    renderReviewFormCreator() {
        if (this.props.isCompleted) {
            return (<h6 className="">El comentario ha sido enviado. <i className="fa fa-check ml-2"/></h6>)
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
                                value={this.state.reviewData.stars}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </div>
                        <textarea className={"form-control" + (this.state.showReviewError ? " border-danger " : "")}
                                  autoFocus={true}
                                  value={this.state.reviewData.review}
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

    renderReviewFormEditor() {
        if (this.props.isCompleted) {
            return (<h6 className="">El comentario ha sido actualizado. <i className="fa fa-check ml-2"/></h6>)
        } else {
            return (
                <>
                    <h5 className="font-weight-bold">
                        Actualiza tu comentario
                        a {this.props.contract.celebrity ? this.props.contract.celebrity.full_name : null}</h5>
                    <div className="mt-2">
                        <div className="mb-2">
                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                value={this.state.reviewData.stars}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </div>
                        <textarea className={"form-control" + (this.state.showReviewError ? " border-danger " : "")}
                                  autoFocus={true}
                                  value={this.state.reviewData.review}
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
                                    <span>Actualizar comentario</span>
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
                    this.session.getSession()
                        ?
                        <>
                            {!this.props.contract.review ? this.renderReviewFormCreator() : this.renderReviewFormEditor()}
                        </>
                        :
                        <>
                            <h5 className="font-weight-bold">
                                Inicia sesión para agregar un comentario
                            </h5>
                            <button className="btn btn-sm btn-primary mt-2"
                                    onClick={this.goToSignIn}
                            >
                                Iniciar sesión
                            </button>
                            <span className="ml-2 mr-2" style={{position: "relative", top: "6px"}}>
                            ¿Aún no tienes cuenta?
                                <b className="ml-2 mr-2" style={{textDecoration: "underline", cursor: "pointer"}}
                                   onClick={this.goToSignUp}>
                                    Crea una cuenta
                                </b>
                            </span>
                        </>

                }
            </div>
        );
    };

}


// Set propTypes
ReviewCreatorLayout.propTypes = {};

// Set defaultProps
ReviewCreatorLayout.defaultProps = {
    contract: {review: null}
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.contracts.saveClientContractReviewReducer.loading,
    isCompleted: state.contracts.saveClientContractReviewReducer.completed,
    contractReview: state.contracts.saveClientContractReviewReducer.data.contractReview,
    contractDataCompleted: state.contracts.getClientContractReducer.completed
});

// mapStateToProps
const mapDispatchToProps = {
    saveClientContractReview: contractOperations.saveClientContractReview
};

// Export Class
const _ReviewCreatorLayout = connect(mapStateToProps, mapDispatchToProps)(ReviewCreatorLayout);
export {_ReviewCreatorLayout as ReviewCreatorLayout};
