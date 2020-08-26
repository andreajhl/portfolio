import React, {Component, createRef} from 'react';
import {CelebrityCardsSectionLayout, PageContainer} from "../../layouts";
import {connect} from "react-redux";
import {celebrityOperations} from "../../../state/ducks/celebrities";
import "./styles.scss"
import {restCountriesOperations} from "../../../state/ducks/rest-countries";
import * as GTM from "../../../state/utils/gtm";
import {jsonToQueryString} from "../../../state/utils/apiService";
import {NewsLetterModal} from "../../containers/newsletter-modal";
import MetaTags from "react-meta-tags";


class CelebritiesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showInputSearchSm: false,
            showFFBModal: localStorage.getItem("ffbmodal") === null,
            metaTagTitle: "Famosos.com - Todos los Famosos",
            metaTagDescription: "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas.",
        };
        this.scrollDiv = createRef();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        const queryParams = this.props.queryParams;
        this.props.updateQueryParams(queryParams);

        this.listCountries();

        const divScroll = this.scrollDiv.current;

        // Detect when scrolled to bottom.
        divScroll.addEventListener("scroll", (e) => {
            const value = (Math.round(divScroll.scrollHeight - divScroll.offsetHeight));
            if (
                divScroll.scrollTop + divScroll.clientHeight >=
                (divScroll.scrollHeight - window.innerHeight+200)
            ) {
                if (!this.props.isLoading && this.props.paginationData.totalItems !== this.props.celebrities.length) {
                    if (this.props.paginationData.currentPage + 1 <= this.props.paginationData.totalPages) {
                        this.onPaginationChange(this.props.paginationData.currentPage + 1);
                    }
                }
            }
        });

        GTM.tagManagerDataLayer(
            "CELEBRITIES_PAGE_VIEW",
            this.props.queryParams
        );

    }

    componentWillReceiveProps(nextProps, nextContext) {
        const queryParams = this.props.queryParams;
        if (nextProps.selectedCountry.id !== this.props.selectedCountry.id) {
            const categoryId = this.props.selectedCategory.id;
            const countryId = nextProps.selectedCountry.id > 0 ? nextProps.selectedCountry.id : null;

            console.log("nextProps.selectedCountry", nextProps.selectedCountry);


            if (countryId) {
                queryParams["country_id"] = countryId;
            } else {
                delete queryParams["country_id"]
            }
            if (categoryId) {
                queryParams["category_id"] = categoryId;
            } else {
                delete queryParams["category_id"]
            }
            queryParams["currentPage"] = 1;
            this.props.updateQueryParams(queryParams);
            // this.props.history.push({
            //     pathname: this.props.history.pathname,
            //     search: jsonToQueryString(queryParams),
            //     metaTagTitle: "Famosos.com - Famosos de " + nextProps.selectedCountry.name,
            //     metaTagDescription: "Encuentra aqui los Famosos de " + nextProps.selectedCountry.name + " para grabar tu video personalizado. Reserva tu video y disfruta de experiencias únicas.",
            // });
        }
        if (nextProps.selectedCategory.id !== this.props.selectedCategory.id) {
            const categoryId = nextProps.selectedCategory.id > 0 ? nextProps.selectedCategory.id : null;

            console.log("nextProps.selectedCategory", nextProps.selectedCategory);

            const countryId = this.props.selectedCountry.id;
            if (countryId) {
                queryParams["country_id"] = countryId
            } else {
                delete queryParams["country_id"]
            }
            if (categoryId) {
                queryParams["category_id"] = categoryId
            } else {
                delete queryParams["category_id"]
            }
            queryParams["currentPage"] = 1;
            this.props.updateQueryParams(queryParams);
            // this.props.history.push({
            //     pathname: this.props.history.pathname,
            //     search: jsonToQueryString(queryParams),
            //     // metaTagTitle: "Famosos.com - " + nextProps.selectedCategory.name,
            //     // metaTagDescription: "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas.",
            // });
        }
        if (queryParams.page === 1 && nextProps.isLoading) {
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
        queryParams["currentPage"] = page;
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

                    <div>
                        <MetaTags>
                            <title>{this.state.metaTagTitle}</title>
                            <meta name="description" content={this.state.metaTagDescription}/>
                        </MetaTags>
                    </div>

                    <PageContainer
                        showFooter={false}
                        applyFetchCelebrities={true}
                        showFiltersSection={true}
                    >

                        {/*/!* ShowHeader *!/*/}
                        {/*{localStorage.getItem("hideIndexHeader") === null ? <IndexHeaderLayout/> : null}*/}
                        {/*/!* End ShowHeader *!/*/}

                        {/* Modal FFB */}
                        {/*<FamososForBusinessModal showModal={this.state.showFFBModal}  onHide={this.closeModal}/>*/}
                        {/* End Modal FFB */}

                        {/* NEWSLETTER MODAL */}
                        <NewsLetterModal/>
                        {/* End NEWSLETTER MODAL */}

                        {/*/!* MainMenuLayout *!/*/}
                        {/*<MainMenuLayout/>*/}
                        {/*/! End MainMenuLayout *!/*/}

                        {/* CelebrityCardsSectionLayout */}
                        <div
                            className="scroll-section"
                            style={{height: "calc(100vh - 50px)", overflow: "scroll"}}
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
                    {/*{*/}
                    {/*    this.props.celebrities.length === this.props.paginationData.totalItems*/}
                    {/*    &&*/}
                    {/*    <FooterLayout/>*/}
                    {/*}*/}
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
    paginationData: celebrities.fetchCelebritiesReducer.data.informationPage,
    queryParams: celebrities.queryParamsReducer,
    countries: restCountries.fetchCountriesReducer.data,
    selectedCategory: filters.filtersReducer.selectedCategory,
    selectedCountry: filters.filtersReducer.selectedCountry,
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
