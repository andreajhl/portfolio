import React, {Component} from 'react';
import {getTotalColumns} from "../../../state/utils/gridSystem";
import {CelebrityShimmerCardLayout} from "../celebrity-shimmer-card";
import {connect} from "react-redux";
import {CelebrityPublicContractCardLayout} from "../celebrity-public-contract-card";
import "./styles.scss";

class TrendingVideosSectionLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
        console.log("nextProps:", nextProps)
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

    renderContractsCards() {
        if (!this.props.showShimmerCards) {
            return (
                this.props.contracts.map((contract, index) => {
                    return (
                        <div className="item mr-4 mb-2 mx-auto" key={contract.id}>
                            <CelebrityPublicContractCardLayout
                                publicContract={contract}
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
        } else if (this.props.title && this.props.queryParams.search && this.props.contracts.length) {
            return (
                <div className="clearfix pt-4">
                    <h6 className="float-left">
                        <b>Famosos encontrados:</b>
                    </h6>
                </div>
            )
        } else if (this.props.title && this.props.queryParams.search && !this.props.contracts.length) {
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
            <div className="TrendingVideosSectionLayout" style={{minHeight: (this.props.minHeight ? "100vh" : "initial")}}>
                <div className={"f-main-padding mt-4"}>
                    {this.renderTitle()}
                    <div className={"scrolling-wrapper " + (this.props.horizontalScroll ? "horizontal-scroll" : "")}>
                        {this.renderContractsCards()}
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
TrendingVideosSectionLayout.defaultProps = {
    horizontalScroll: false,
    title: "",
    showShimmerCards: true,
    showLoading: false,
    contracts: [],
    minHeight: false
};


// mapStateToProps
const mapStateToProps = (state: any) => ({
    queryParams: state.contracts.queryParamsReducer,
});

// mapStateToProps
const mapDispatchToProps = {};

// Export Class
const _TrendingVideosSectionLayout = connect(mapStateToProps, mapDispatchToProps)(TrendingVideosSectionLayout);
export {_TrendingVideosSectionLayout as TrendingVideosSectionLayout};

