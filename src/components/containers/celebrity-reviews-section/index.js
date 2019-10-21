import React, {Component} from 'react';
import "./styles.scss";
import {CelebrityReviewCardLayout} from "../../layouts/celebrity-review-card";
import {CelebrityShape, PaginationShape} from "../../../prop-types";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {contractReviewOperations} from "../../../state/ducks/contract-reviews";
import {PaginationLayout} from "../../layouts/pagination";


class CelebrityReviewsSection extends Component {


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
        this.props.fetchCelebrityContractReviews(this.state.params);
    }

    onPaginationChange(page) {
        this.updateParams("page", page);
    }

    updateParams(key, value) {
        const {params} = this.state;
        params[key] = value;
        if (key === "search") {
            params["page"] = 1;
        }
        this.setState({
            params: params,
        }, () => this.fetchReviews());
    }

    render() {
        return (
            <div className="CelebrityReviewsSection">
                {
                    this.props.reviews.length > 0
                        ?
                        <div className="f-container mb-4 pb-4">
                            <div className="row f-section mx-auto pt-2">
                                <div className="col-12 mb-4">
                                    <b>Calificaciones</b>
                                </div>
                                {
                                    this.props.reviews.map((review, index) => {
                                        return (
                                            <div className="col-12 col-md-4 col-lg-4 col-xl-4 mb-4" key={index}>
                                                <CelebrityReviewCardLayout review={review}/>
                                            </div>
                                        )
                                    })
                                }
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
                        : null
                }
                <br/><br/>
            </div>
        );
    };
}

// Set propTypes
CelebrityReviewsSection.propTypes = {
    celebrity: CelebrityShape.isRequired,
    fetchCelebrityContractReviews: PropTypes.func.isRequired,
    paginationData: PaginationShape
};

// Set defaultProps
CelebrityReviewsSection.defaultProps = {
    celebrity: {},
    reviews: [],
    paginationData: {}
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.contractReviews.fetchContractReviewsReducer.loading,
    reviews: state.contractReviews.fetchContractReviewsReducer.data.results,
    paginationData: state.contractReviews.fetchContractReviewsReducer.data.pagination_data,
});

// mapStateToProps
const mapDispatchToProps = {
    fetchCelebrityContractReviews: contractReviewOperations.list,
};

// Export Class
const _CelebrityReviewsSection = connect(mapStateToProps, mapDispatchToProps)(CelebrityReviewsSection);
export {_CelebrityReviewsSection as CelebrityReviewsSection};
