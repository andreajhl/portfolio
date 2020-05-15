import React, {Component} from 'react';
import "./styles.scss";
import {connect} from "react-redux";
import {CelebrityPublicContractCardLayout} from "../celebrity-public-contract-card";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import {PaginationLayout} from "../pagination";


class CelebrityPublicContractsSectionLayout extends Component {


    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };

        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.updateParams = this.updateParams.bind(this);
        this.fetchPublicContracts = this.fetchPublicContracts.bind(this);
    }

    fetchPublicContracts() {
        this.props.listPublicContracts(this.props.celebrity.id, this.state.params);
    }

    onPaginationChange(page) {
        this.updateParams("currentPage", page);
    }

    updateParams(key, value) {
        const {params} = this.state;
        params[key] = value;
        if (key === "search") {
            params["currentPage"] = 1;
        }
        this.setState({
            params: params,
        }, () => this.fetchPublicContracts());
    }

    renderCelebrityPublicVideoCards() {
        return (
            this.props.publicContracts.map((publicContract, index) => {
                return (
                    <div className="item mr-4 mb-2 mx-auto" key={index + "-" + publicContract.id}>
                        <CelebrityPublicContractCardLayout
                            publicContract={publicContract}
                        />
                    </div>
                )
            })
        )
    };

    render() {
        return (
            <div className="CelebrityPublicContractsSectionLayout">
                {
                    this.props.publicContracts.length > 0
                        ?
                        <div className="f-container mb-2 pb-2">
                            <div className={"f-main-padding"}>
                                <div className="clearfix ml-4">
                                    <h6 className="float-left font-weight-bold">
                                        Videos
                                    </h6>
                                </div>
                                <div className={"scrolling-wrapper"}>
                                    {this.renderCelebrityPublicVideoCards()}
                                </div>
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
                        :
                        null
                }
            </div>
        );
    };
}


// Set propTypes
CelebrityPublicContractsSectionLayout.propTypes = {

};

// Set defaultProps
CelebrityPublicContractsSectionLayout.defaultProps = {
    celebrity: {},
    publicContracts: [],
    paginationData: {}
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.celebrities.fetchPublicContractsReducer.loading,
    publicContracts: state.celebrities.fetchPublicContractsReducer.data.results,
    paginationData: state.celebrities.fetchPublicContractsReducer.data.informationPage,
});

// mapStateToProps
const mapDispatchToProps = {
    listPublicContracts: celebrityOperations.listPublicContracts,
};

// Export Class
const _CelebrityPublicContractsSectionLayout = connect(mapStateToProps, mapDispatchToProps)(CelebrityPublicContractsSectionLayout);
export {_CelebrityPublicContractsSectionLayout as CelebrityPublicContractsSectionLayout};

