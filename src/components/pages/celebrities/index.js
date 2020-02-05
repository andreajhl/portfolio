import React, {Component, createRef} from 'react';
import {CelebrityCardsSectionLayout, IndexHeaderLayout, PageContainer} from "../../layouts";
import * as PropTypes from "prop-types";
import {CelebrityShape, PaginationShape} from "../../../prop-types";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import "./styles.scss"
import {restCountriesOperations} from "../../../state/ducks/rest-countries";
import {FooterLayout} from "../../layouts/footer";
import * as GTM from "../../../state/utils/gtm";
import {history} from "../../../routing/History";
import FamososForBusinessModal from "../../containers/famosos-for-business-modal";


class CelebritiesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showInputSearchSm: false,
            showFFBModal: localStorage.getItem("ffbmodal") === null
        };
        this.scrollDiv = createRef();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(): void {
        this.listCountries();

        // Detect when scrolled to bottom.
        this.scrollDiv.current.addEventListener("scroll", () => {
            if (
                this.scrollDiv.current.scrollTop + this.scrollDiv.current.clientHeight >=
                (this.scrollDiv.current.scrollHeight - 500)
            ) {
                if (!this.props.isLoading && this.props.paginationData.totalItems !== this.props.celebrities.length) {
                    if (this.props.paginationData.currentPage + 1 <= this.props.paginationData.totalPages) {
                        this.onPaginationChange(this.props.paginationData.currentPage + 1);
                    }
                }
            }
        });
    }

    openModal() {
        this.setState({
            showFFBModal: true
        });
    }

    closeModal() {
        this.setState({
            showFFBModal: false
        }, () => localStorage.setItem("ffbmodal", ""));
    }

    listCountries() {
        this.props.listCountries()
    }

    onPaginationChange(page) {
        const queryParams = this.props.queryParams;
        queryParams["page"] = page;
        this.props.updateQueryParams(queryParams);
    }

    render() {
        return (
            <>
                <div className={"CelebritiesPage "}>
                    <PageContainer showFooter={false}>
                        {/*/!* ShowHeader *!/*/}
                        {localStorage.getItem("hideIndexHeader") === null ? <IndexHeaderLayout/> : null}
                        {/*/!* End ShowHeader *!/*/}

                        {/* Modal FFB */}
                        {/*<FamososForBusinessModal showModal={this.state.showFFBModal}  onHide={this.closeModal}/>*/}
                        {/* End Modal FFB */}

                        {/*/!* MainMenuLayout *!/*/}
                        {/*<MainMenuLayout/>*/}
                        {/*/! End MainMenuLayout *!/*/}

                        {/* CelebrityCardsSectionLayout */}
                        <div className="scroll-section" style={{height: "calc(100vh - 10px)", overflow: "scroll"}}
                             ref={this.scrollDiv}>
                            {/*<pre>this.props.paginationData.currentPage {this.props.paginationData.currentPage}</pre>*/}
                            {/*<pre>this.props.paginationData.totalPages {this.props.paginationData.totalPages}</pre>*/}
                            {/*<pre>state.params.page {this.state.params.page}</pre>*/}
                            {/*<pre>celebrities: {this.props.celebrities.length}</pre>*/}
                            {/*<pre>totalItems: {this.props.paginationData.totalItems}</pre>*/}
                            <CelebrityCardsSectionLayout
                                title={"Famosos destacados"}
                                showShimmerCards={this.props.isLoading && this.props.queryParams.page === 1}
                                showLoading={this.props.isLoading && this.props.queryParams.page > 1}
                                celebrities={this.props.celebrities}
                                minHeight={true}
                            />
                            {this.props.celebrities.length === this.props.paginationData.totalItems ?
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
CelebritiesPage.propTypes = {
    celebrities: PropTypes.arrayOf(CelebrityShape).isRequired,
    fetchCelebrities: PropTypes.func.isRequired,
    paginationData: PaginationShape
};

// Set defaultProps
CelebritiesPage.defaultProps = {
    celebrities: [],
    paginationData: {}
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.celebrities.fetchCelebritiesReducer.loading,
    isCompleted: state.celebrities.fetchCelebritiesReducer.completed,
    celebrities: state.celebrities.fetchCelebritiesReducer.data.results,
    paginationData: state.celebrities.fetchCelebritiesReducer.data.pagination_data,
    queryParams: state.celebrities.queryParamsReducer,
    countries: state.restCountries.fetchCountriesReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    fetchCelebrities: celebrityOperations.list,
    updateQueryParams: celebrityOperations.updateQueryParams,
    listCountries: restCountriesOperations.list,
};

// Export Class
const _CelebritiesPage = connect(mapStateToProps, mapDispatchToProps)(CelebritiesPage);
export {_CelebritiesPage as CelebritiesPage};
