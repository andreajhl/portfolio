import React, {Component} from 'react';
import {connect} from "react-redux";
import "./styles.scss";
import {TrendingVideoCardLayout} from "../tending-video-card";
import {PaginationLayout} from "../pagination";
import {contractOperations} from "../../../state/ducks/contracts";

class TrendingVideosSectionLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };

        this.onPaginationChange = this.onPaginationChange.bind(this);
    }

    componentWillMount(): void {
        this.onPaginationChange(1)
    }

    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
        if(nextProps.isLoading){
            window.scroll({top: 0,});
        }
    }

    onPaginationChange(page) {
        const params = this.state.params;
        params["page_size"] = 4;
        params["page"] = page;
        this.setState({
            params
        }, ()=> {
            this.props.fetchTrendingContracts(this.state.params)
        })
    }

    renderContractsCards() {
        return (
            this.props.contracts.map((contract, index) => {
                return (
                    <div key={contract.id + "index-" + index} style={this.props.isLoading ? {opacity: "0.1"} : {}}>
                        <TrendingVideoCardLayout
                            publicContract={contract}
                        />
                    </div>
                )
            })
        )
    };

    renderLoading() {
        if (this.props.isLoading) {
            return (
                <div className="loading-section mx-auto text-center">
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

    render() {
        return (
            <div className="TrendingVideosSectionLayout">
                {this.renderLoading()}
                {this.renderContractsCards()}
                <div className="pagination-section">
                    {/* PaginationLayout */}
                    <PaginationLayout
                        showFmainPadding={false}
                        pagination={this.props.paginationData}
                        onPaginationChange={this.onPaginationChange}
                    />
                    {/* End PaginationLayout */}
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
        );
    };
}

// default props
TrendingVideosSectionLayout.defaultProps = {
};


// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.contracts.fetchTrendingContractsReducer.loading,
    contracts: state.contracts.fetchTrendingContractsReducer.data.results,
    paginationData: state.contracts.fetchTrendingContractsReducer.data.pagination_data,
});

// mapStateToProps
const mapDispatchToProps = {
    fetchTrendingContracts: contractOperations.listTrending,
};

// Export Class
const _TrendingVideosSectionLayout = connect(mapStateToProps, mapDispatchToProps)(TrendingVideosSectionLayout);
export {_TrendingVideosSectionLayout as TrendingVideosSectionLayout};

