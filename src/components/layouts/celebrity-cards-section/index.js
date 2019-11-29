import React, {Component} from 'react';
import {CelebrityCardLayout} from "../celebrity-card";
import "./styles.scss";
import {getTotalColumns} from "../../../state/utils/gridSystem";
import {CelebrityShimmerCardLayout} from "../celebrity-shimmer-card";
import {connect} from "react-redux";

class CelebrityCardsSectionLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    renderShimmerCards() {
        if (this.props.showShimmerCards) {
            return (
                <div className="scrolling-wrapper">
                    {
                        [...Array(getTotalColumns() * 4)].map((o, index) => {
                            return (
                                <div className="item mr-4 mb-2 mx-auto" key={index}>
                                    <CelebrityShimmerCardLayout/>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    };

    renderLoading() {
        if (this.props.showLoading) {
            return (
                <div className="mx-auto text-center">
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
    }

    renderCelebritiesCards() {
        if (!this.props.showShimmerCards) {
            return (
                this.props.celebrities.map((celebrity, index) => {
                    return (
                        <div className="item mr-4 mb-2 mx-auto" key={celebrity.id}>
                            <CelebrityCardLayout
                                celebrity={celebrity}
                                index={index + "_" + celebrity.id}
                            />
                        </div>
                    )
                })
            )
        }
    };

    renderTitle() {
        if (this.props.title && !this.props.queryParams.search) {
            return (
                <div className="clearfix pt-4">
                    <h6 className="float-left">
                        <b>{this.props.title}</b>
                    </h6>
                </div>
            )
        } else if (this.props.title && this.props.queryParams.search && this.props.celebrities.length) {
            return (
                <div className="clearfix pt-4">
                    <h6 className="float-left">
                        <b>Famosos encontrados:</b>
                    </h6>
                </div>
            )
        } else if (this.props.title && this.props.queryParams.search && !this.props.celebrities.length) {
            return (
                <div className="clearfix pt-4">
                    <h6 className="float-left">
                        <b>No se encontraron famosos para esta busqueda</b>
                    </h6>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="CelebrityCardsSectionLayout" style={{minHeight: (this.props.minHeight ? "100vh" : "initial")}}>
                <div className={"f-main-padding mt-4"}>
                    {this.renderTitle()}
                    <div className={"scrolling-wrapper " + (this.props.horizontalScroll ? "horizontal-scroll" : "")}>
                        {this.renderCelebritiesCards()}
                    </div>
                    {/* SHIMMER CARDS */}
                    {this.renderShimmerCards()}
                    {/* LOADING */}
                    {this.renderLoading()}
                </div>
            </div>
        );
    };
}

// default props
CelebrityCardsSectionLayout.defaultProps = {
    horizontalScroll: false,
    title: "",
    showShimmerCards: true,
    showLoading: false,
    celebrities: [],
    minHeight: false
};


// mapStateToProps
const mapStateToProps = (state: any) => ({
    queryParams: state.celebrities.queryParamsReducer,
});

// mapStateToProps
const mapDispatchToProps = {};

// Export Class
const _CelebrityCardsSectionLayout = connect(mapStateToProps, mapDispatchToProps)(CelebrityCardsSectionLayout);
export {_CelebrityCardsSectionLayout as CelebrityCardsSectionLayout};

