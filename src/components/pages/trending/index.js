import React, {Component, createRef} from 'react';
import {IndexHeaderLayout, PageContainer} from "../../layouts";
import * as PropTypes from "prop-types";
import {CelebrityShape, PaginationShape} from "../../../prop-types";
import {connect} from "react-redux";
import {contractOperations} from "../../../state/ducks/contracts";
import "./styles.scss"
import {restCountriesOperations} from "../../../state/ducks/rest-countries";
import {FooterLayout} from "../../layouts/footer";
import {TrendingVideosSectionLayout} from "../../layouts/trending-videos-section";


class TrendingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showInputSearchSm: false
        };
        this.scrollDiv = createRef();
    }

    componentDidMount(): void {

        // Detect when scrolled to bottom.
        this.scrollDiv.current.addEventListener("scroll", () => {
            if (
                this.scrollDiv.current.scrollTop + this.scrollDiv.current.clientHeight >=
                (this.scrollDiv.current.scrollHeight - 500)
            ) {
                if (!this.props.isLoading && this.props.paginationData.totalItems !== this.props.contracts.length) {
                    if (this.props.paginationData.currentPage + 1 <= this.props.paginationData.totalPages) {
                        this.onPaginationChange(this.props.paginationData.currentPage + 1);
                    }
                }
            }
        });
    }

    componentWillMount(): void {
        const queryParams = this.props.queryParams;
        queryParams["page"] = 1;
        this.props.updateQueryParams(queryParams);
    }

    onPaginationChange(page) {
        const queryParams = this.props.queryParams;
        queryParams["page"] = page;
        this.props.updateQueryParams(queryParams);
    }

    render() {
        return (
            <>
                <div className={"TrendingPage "}>
                    <PageContainer showNavbar={true} fetchCelebrities={false} showFooter={false}>
                        {/*/!* ShowHeader *!/*/}
                        {localStorage.getItem("hideIndexHeader") === null ? <IndexHeaderLayout/> : null}
                        {/*/!* End ShowHeader *!/*/}


                        {/*/!* MainMenuLayout *!/*/}
                        {/*<MainMenuLayout/>*/}
                        {/*/! End MainMenuLayout *!/*/}

                        {/* CelebrityCardsSectionLayout */}
                        <div className="scroll-section" style={{height: "calc(100vh - 10px)", overflow: "scroll"}}
                             ref={this.scrollDiv}>
                            {/*<pre>this.props.paginationData.currentPage {this.props.paginationData.currentPage}</pre>*/}
                            {/*<pre>this.props.paginationData.totalPages {this.props.paginationData.totalPages}</pre>*/}
                            {/*<pre>state.params.page {this.state.params.page}</pre>*/}
                            {/*<pre>contracts: {this.props.contracts.length}</pre>*/}
                            {/*<pre>totalItems: {this.props.paginationData.totalItems}</pre>*/}
                            <TrendingVideosSectionLayout
                                title={"Tendencia"}
                                showShimmerCards={this.props.isLoading && this.props.queryParams.page === 1}
                                showLoading={this.props.isLoading && this.props.queryParams.page > 1}
                                contracts={this.props.contracts}
                                minHeight={true}
                            />
                            {this.props.contracts.length === this.props.paginationData.totalItems ?
                                <FooterLayout/> : null}
                        </div>
                        {/* End CelebrityCardsSectionLayout */}
                    </PageContainer>
                </div>
            </>
        );
    };

}

// Set propTypes
TrendingPage.propTypes = {
    contracts: PropTypes.arrayOf(CelebrityShape).isRequired,
    fetchTrendingContracts: PropTypes.func.isRequired,
    paginationData: PaginationShape
};

// Set defaultProps
TrendingPage.defaultProps = {
    contracts: [],
    paginationData: {}
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.contracts.fetchTrendingContractsReducer.loading,
    isCompleted: state.contracts.fetchTrendingContractsReducer.completed,
    contracts: state.contracts.fetchTrendingContractsReducer.data.results,
    paginationData: state.contracts.fetchTrendingContractsReducer.data.pagination_data,
    queryParams: state.contracts.queryParamsReducer,
});

// mapStateToProps
const mapDispatchToProps = {
    fetchTrendingContracts: contractOperations.listTrending,
    updateQueryParams: contractOperations.updateQueryParams,
    listCountries: restCountriesOperations.list,
};

// Export Class
const _TrendingPage = connect(mapStateToProps, mapDispatchToProps)(TrendingPage);
export {_TrendingPage as TrendingPage};
