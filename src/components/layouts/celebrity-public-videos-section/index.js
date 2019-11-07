import React, {Component} from 'react';
import "./styles.scss";
import {connect} from "react-redux";
import {CelebrityPublicVideoCardLayout} from "../celebrity-public-video-card";


class CelebrityPublicVideosSectionLayout extends Component {


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

    renderCelebrityPublicVideoCards() {
        return (
            this.props.publicVideos.map((publicVideo, index) => {
                return (
                    <div className="item mr-4 mb-2 mx-auto" key={index}>
                        <CelebrityPublicVideoCardLayout
                            publicVideo={publicVideo}
                        />
                    </div>
                )
            })
        )
    };


    render() {
        return (
            <div className="CelebrityPublicVideosSectionLayout">
                <div className="f-container mb-4 pb-4">
                    <div className={"f-main-padding"}>
                        <div className="clearfix ml-4">
                            <h6 className="float-left font-weight-bold">
                                Videos
                            </h6>
                        </div>
                        <div className={"scrolling-wrapper"}>
                            {this.renderCelebrityPublicVideoCards()}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

// Set propTypes
CelebrityPublicVideosSectionLayout.propTypes = {};

// Set defaultProps
CelebrityPublicVideosSectionLayout.defaultProps = {
    publicVideos: [
        {
            delivery_to: "Duvan Vargas",
            media: "Duvan Vargas"
        },
        {
            delivery_to: "Duvan Vargas",
            media: "Duvan Vargas"
        },
        {
            delivery_to: "Duvan Vargas",
            media: "Duvan Vargas"
        },
        {
            delivery_to: "Duvan Vargas",
            media: "Duvan Vargas"
        },
        {
            delivery_to: "Duvan Vargas",
            media: "Duvan Vargas"
        },
        {
            delivery_to: "Duvan Vargas",
            media: "Duvan Vargas"
        },
        {
            delivery_to: "Duvan Vargas",
            media: "Duvan Vargas"
        },
        {
            delivery_to: "Duvan Vargas",
            media: "Duvan Vargas"
        }
    ],
};

// mapStateToProps
const mapStateToProps = (state: any) => ({});

// mapStateToProps
const mapDispatchToProps = {};

// Export Class
const _CelebrityPublicVideosSectionLayout = connect(mapStateToProps, mapDispatchToProps)(CelebrityPublicVideosSectionLayout);
export {_CelebrityPublicVideosSectionLayout as CelebrityPublicVideosSectionLayout};
