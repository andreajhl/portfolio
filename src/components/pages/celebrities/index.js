import React, {Component, createRef} from 'react';
import {CelebrityCardsSectionLayout, IndexHeaderLayout, PageContainer} from "../../layouts";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import "./styles.scss"
import {restCountriesOperations} from "../../../state/ducks/rest-countries";
import {FooterLayout} from "../../layouts/footer";


class CelebritiesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showInputSearchSm: false,
            showFFBModal: localStorage.getItem("ffbmodal") === null,
        };
        this.scrollDiv = createRef();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(): void {
        this.listCountries();

        const divScroll = this.scrollDiv.current;

        // Detect when scrolled to bottom.
        divScroll.addEventListener("scroll", (e) => {

            const value = (Math.round(divScroll.scrollHeight - divScroll.offsetHeight));
            if (
                divScroll.scrollTop + divScroll.clientHeight >=
                (divScroll.scrollHeight - 500)
            ) {
                if (!this.props.isLoading && this.props.paginationData.totalItems !== this.props.celebrities.length) {
                    if (this.props.paginationData.currentPage + 1 <= this.props.paginationData.totalPages) {
                        this.onPaginationChange(this.props.paginationData.currentPage + 1);
                    }
                }
            }
        });
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if(nextProps.selectedCountry.id !== this.props.selectedCountry.id){
            const queryParams = this.props.queryParams;
            queryParams["country__id"] = nextProps.selectedCountry.id;
            queryParams["category__id"] = this.props.selectedCategory.id;
            queryParams["page"] = 1;
            this.props.updateQueryParams(queryParams);
        }
        if(nextProps.selectedCategory.id !== this.props.selectedCategory.id){
            const queryParams = this.props.queryParams;
            queryParams["category__id"] = nextProps.selectedCategory.id;
            queryParams["page"] = 1;
            this.props.updateQueryParams(queryParams);
        }
        if (nextProps.isLoading) {
            this.scrollDiv.current.scrollTop = 0;
        }
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

    returnTitle = () => {
        if (!this.props.selectedCategory.id && !this.props.selectedCountry.id) {
            return "Famosos destacados"
        } else if (this.props.celebrities.length && (this.props.selectedCategory.id || this.props.selectedCountry.id || this.props.queryParams.search)) {
            return "Famosos encontrados"
        } else if(!this.props.celebrities.length && this.props.isLoading){
            return "Buscando..."
        } else if(!this.props.celebrities.length && this.props.isCompleted){
            return "No se encontraron famosos para esta busqueda"
        }
    };

    render() {
        return (
            <>
                <div className={"CelebritiesPage "}>
                    <PageContainer
                        showFooter={false}
                        showFiltersSection={true}
                    >

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
                        <div
                            className="scroll-section"
                            style={{height: "calc(100vh - 10px)", overflow: "scroll"}}
                            ref={this.scrollDiv}
                        >
                            {/*<pre>this.props.paginationData.currentPage {this.props.paginationData.currentPage}</pre>*/}
                            {/*<pre>this.props.paginationData.totalPages {this.props.paginationData.totalPages}</pre>*/}
                            {/*<pre>state.params.page {this.state.params.page}</pre>*/}
                            {/*<pre>celebrities: {this.props.celebrities.length}</pre>*/}
                            {/*<pre>totalItems: {this.props.paginationData.totalItems}</pre>*/}
                            <CelebrityCardsSectionLayout
                                title={this.returnTitle()}
                                showShimmerCards={this.props.isLoading && this.props.queryParams.page === 1}
                                showLoading={this.props.isLoading && this.props.queryParams.page > 1}
                                celebrities={this.props.celebrities}
                                minHeight={true}
                            />
                        </div>
                        {/* End CelebrityCardsSectionLayout */}

                    </PageContainer>
                    {
                        this.props.celebrities.length === this.props.paginationData.totalItems
                        &&
                        <FooterLayout/> : null
                    }
                </div>
            </>
        );
    };

}

// Set propTypes
CelebritiesPage.propTypes = {};

// Set defaultProps
CelebritiesPage.defaultProps = {
    celebrities: [],
    paginationData: {}
};

// mapStateToProps
const mapStateToProps = ({celebrities, restCountries, filters}) => ({
    isLoading: celebrities.fetchCelebritiesReducer.loading,
    isCompleted: celebrities.fetchCelebritiesReducer.completed,
    celebrities: celebrities.fetchCelebritiesReducer.data.results,
    paginationData: celebrities.fetchCelebritiesReducer.data.pagination_data,
    queryParams: celebrities.queryParamsReducer,
    countries: restCountries.fetchCountriesReducer.data,
    selectedCategory: filters.filtersReducer.categoryFilter.selectedCategory,
    selectedCountry: filters.filtersReducer.countryFilter.selectedCountry,
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
