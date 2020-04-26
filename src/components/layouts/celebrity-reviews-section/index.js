import React, {Component} from 'react';
import "./styles.scss";
import {CelebrityReviewCardLayout} from "../../layouts/celebrity-review-card";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";
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
        this.props.listReviews(this.props.celebrity.id, this.state.params);
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
                                            <div className="col-12 col-md-4 col-lg-4 col-xl-4 mb-4" key={review.id + "-" + index}>
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

};

// Set defaultProps
CelebrityReviewsSectionLayout.defaultProps = {
    celebrity: {},
    reviews: [],
    paginationData: {}
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.celebrities.fetchReviewsReducer.loading,
    reviews: state.celebrities.fetchReviewsReducer.data.results,
    paginationData: state.celebrities.fetchReviewsReducer.data.pagination_data,
});

// mapStateToProps
const mapDispatchToProps = {
    listReviews: celebrityOperations.listReviews,
};

// Export Class
const _CelebrityReviewsSectionLayout = connect(mapStateToProps, mapDispatchToProps)(CelebrityReviewsSectionLayout);
export {_CelebrityReviewsSectionLayout as CelebrityReviewsSectionLayout};
