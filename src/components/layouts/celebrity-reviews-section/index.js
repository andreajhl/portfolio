import React, {Component} from 'react';
import "./styles.scss";
import {CelebrityReviewCardLayout} from "../../layouts/celebrity-review-card";
import {CelebrityShape, PaginationShape} from "../../../prop-types";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {contractReviewOperations} from "../../../state/ducks/contract-reviews";
import {PaginationLayout} from "../../layouts/pagination";


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
        // this.props.fetchCelebrityContractReviews(this.state.params);
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
            <div className="CelebrityReviewsSectionLayout">
                {
                    this.props.reviews.length > 0
                        ?
                        <div className="f-container mb-2 pb-2">
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
            </div>
        );
    };
}

// Set propTypes
CelebrityReviewsSectionLayout.propTypes = {
    celebrity: CelebrityShape.isRequired,
    fetchCelebrityContractReviews: PropTypes.func.isRequired,
    paginationData: PaginationShape
};

// Set defaultProps
CelebrityReviewsSectionLayout.defaultProps = {
    celebrity: {},
    reviews: [
        {
            client: {
                username: "",
                full_name: "Duvan Vargas",
            },
            stars: 3,
            comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            client: {
                username: "",
                full_name: "Heinz Sohm",
            },
            stars: 4,
            comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            client: {
                username: "",
                full_name: "Andres Cohen",
            },
            stars: 5,
            comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            client: {
                username: "",
                full_name: "Duvan Vargas",
            },
            stars: 3,
            comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            client: {
                username: "",
                full_name: "Heinz Sohm",
            },
            stars: 4,
            comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            client: {
                username: "",
                full_name: "Andres Cohen",
            },
            stars: 5,
            comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
    ],
    paginationData: {}
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.contractReviews.fetchContractReviewsReducer.loading,
    // reviews: state.contractReviews.fetchContractReviewsReducer.data.results,
    paginationData: state.contractReviews.fetchContractReviewsReducer.data.pagination_data,
});

// mapStateToProps
const mapDispatchToProps = {
    fetchCelebrityContractReviews: contractReviewOperations.list,
};

// Export Class
const _CelebrityReviewsSectionLayout = connect(mapStateToProps, mapDispatchToProps)(CelebrityReviewsSectionLayout);
export {_CelebrityReviewsSectionLayout as CelebrityReviewsSectionLayout};
