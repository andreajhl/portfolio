import React, {Component, createRef} from 'react';
import "./styles.scss";
import {connect} from "react-redux";
import {
    updateCategories,
    updateCountries,
    updateFlow,
    updateSelectedCategory,
    updateSelectedCountry
} from "../../../state/ducks/filters/actions";
import {
    getAsync as getAsyncCategories,
    listAsync as listAsyncCategories
} from "../../../state/ducks/celebrity-categories/actions";
import * as GTM from "../../../state/utils/gtm";
import {getAsync as getAsyncCountry, listAsync as listAsyncCountries} from "../../../state/ducks/countries/actions";
import {queryStringToJSON} from "../../../state/utils/apiService";


class FiltersSectionLayout extends Component {

    constructor(props) {
        super(props);
        this.scrollDiv = createRef();
    }

    componentDidMount = async () => {
        if (window.location.search) {
            const queryParams = queryStringToJSON(window.location.search);
            if (queryParams.country_id) {
                this.updateCountryFilter(queryParams.country_id).then()
                this.fetchCategories()
            }
            if (queryParams.category_id) {
                this.updateCategoryFilter(queryParams.category_id).then()
                this.fetchCountries()
            }
            if (queryParams.country_id && queryParams.category_id) {
                this.updateCountryFilter(queryParams.country_id).then();
                this.updateCategoryFilter(queryParams.category_id).then();
            }
        }
    };

    fetchCountries = () => {
        listAsyncCountries({})
            .then(res => {
                if (res.data.status === "OK") {
                    this.props.updateCountries(
                        res.data.results
                    )
                }
            })
            .catch(err => {
            });
    };

    fetchCategories = () => {
        listAsyncCategories({})
            .then(res => {
                if (res.data.status === "OK") {
                    this.props.updateCategories(
                        res.data.results
                    )
                }
            })
            .catch(err => {
            });
    };

    updateCategoryFilter = async (categoryID) => {
        let selectedCategory = {};
        if (categoryID === -1) {
            this.props.updateFlow("allCategories");
            selectedCategory = {
                id: -1,
                title: "Todas las categorías",
            };
            this.fetchCategories()
        } else if (categoryID !== null) {
            if (this.props.flow !== "categoriesUsedInCountry") {
                this.props.updateFlow("countriesUsedInCategory");
            }
            await getAsyncCategories(categoryID)
                .then(res => {
                    if (res.data.status === "OK") {
                        selectedCategory = res.data.data
                    }
                })
                .catch(err => {
                });
            await listAsyncCountries({
                __cf__usedInCategoryID: categoryID
            })
                .then(res => {
                    if (res.data.status === "OK") {
                        this.props.updateCountries(
                            res.data.results
                        )
                    }
                })
                .catch(err => {
                });
        }
        this.props.updateSelectedCategory(
            selectedCategory
        );
        GTM.tagManagerDataLayer(
            "CLICK_ON_CATEGORY_FILTER",
            selectedCategory
        );
        this.scrollDiv.current.scrollLeft = 0;
    };

    updateCountryFilter = async (countryID) => {
        let selectedCountry = {};
        if (countryID === -1) {
            this.props.updateFlow("allCountries");
            selectedCountry = {
                id: -1,
                name: "Todos los países",
            };
            this.fetchCountries()
        } else if (countryID !== null) {
            if (this.props.flow !== "countriesUsedInCategory") {
                this.props.updateFlow("categoriesUsedInCountry");
            }
            await getAsyncCountry(countryID)
                .then(res => {
                    if (res.data.status === "OK") {
                        selectedCountry = res.data.data
                    }
                })
                .catch(err => {
                });
            await listAsyncCategories({
                __cf__usedInCountryID: countryID
            })
                .then(res => {
                    if (res.data.status === "OK") {
                        this.props.updateCategories(
                            res.data.results
                        )
                    }
                })
                .catch(err => {
                });
        }
        this.props.updateSelectedCountry(
            selectedCountry
        );
        GTM.tagManagerDataLayer(
            "CLICK_ON_COUNTRY_FILTER",
            selectedCountry
        );
        this.scrollDiv.current.scrollLeft = 0;
    };

    clickOnUpdateCategoryFilter = (e, categoryID) => {
        e.preventDefault();
        this.updateCategoryFilter(categoryID)
    };

    clickOnUpdateCountryFilter = (e, countryID) => {
        e.preventDefault();
        this.updateCountryFilter(countryID)
    };

    onBack = () => {
        switch (this.props.flow) {
            case "allCountries":
                this.props.updateFlow(null);
                this.props.updateSelectedCountry({});
                this.props.updateSelectedCategory({});
                return;
            case "allCategories":
                this.props.updateFlow(null);
                this.props.updateSelectedCountry({});
                this.props.updateSelectedCategory({});
                return;
            case "countriesUsedInCategory":
                this.props.updateFlow("allCategories");
                this.props.updateSelectedCountry({});
                return;
            case "categoriesUsedInCountry":
                this.props.updateFlow("allCountries");
                this.props.updateSelectedCategory({});
                return;
            default:
                this.props.updateFlow(null);
                this.props.updateSelectedCountry({});
                this.props.updateSelectedCategory({});

        }
    };

    renderCountries = () => {
        const returnResults = (this.props.flow === "allCountries" && !this.props.selectedCategory.id)
            || (this.props.flow === "countriesUsedInCategory" && !this.props.selectedCountry.id);
        if (returnResults) {
            return (
                <div className="helper-div">
                    {
                        this.props.countries.filter((item) => {
                            return item.id !== this.props.selectedCountry.id;
                        }).reverse().map(
                            (item, index) => {
                                return (
                                    <div
                                        className="filter-option"
                                        key={"filter-option country" + item.name + item.id}
                                        onClick={(e) => {
                                            this.clickOnUpdateCountryFilter(e, item.id)
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                )
                            })
                    }
                </div>
            )
        }
    };

    renderCategories = () => {
        const returnResults = (this.props.flow === "allCategories" && !this.props.selectedCountry.id)
            || (this.props.flow === "categoriesUsedInCountry" && !this.props.selectedCategory.id);
        if (returnResults) {
            return (
                <div className="helper-div">
                    {
                        this.props.categories.filter((item) => {
                            return item.id !== this.props.selectedCategory.id;
                        }).reverse().map(
                            (item, index) => {
                                return (
                                    <div
                                        className="filter-option"
                                        key={"filter-option category" + item.title + item.id}
                                        onClick={(e) => {
                                            this.clickOnUpdateCategoryFilter(e, item.id)
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                )
                            })
                    }
                </div>
            )
        }
    };

    returnSelectecOptions = () => {
        let selectedOption1 = "";
        let selectedOption2 = "";
        switch (this.props.flow) {
            case  "allCategories":
            case  "countriesUsedInCategory":
                selectedOption1 = this.props.selectedCategory.title;
                selectedOption2 = this.props.selectedCountry.id && this.props.selectedCountry.name;
                break;
            case  "allCountries":
            case  "categoriesUsedInCountry":
                selectedOption1 = this.props.selectedCountry.name;
                selectedOption2 = this.props.selectedCategory.id && this.props.selectedCategory.title;
                break;

        }
        if (this.props.flow !== null) {
            return (
                <div className="filter-option filter-option-selected">
                    {selectedOption1}
                    {
                        selectedOption2
                        &&
                        <span>
                            <i className="fa fa-caret-right ml-2 mr-2"/>
                            {selectedOption2}
                        </span>
                    }
                </div>
            )
        }
        return null
    };

    render() {
        return (
            <div className="FiltersSectionLayout">
                <div className="navbar-1240">
                    <div className="filters-section" ref={this.scrollDiv}>


                        {/*BACK BUTTON*/}
                        {
                            this.props.flow !== null
                            &&
                            <div className="filter-option filter-option-back"
                                 onClick={(e) => {
                                     this.onBack(e)
                                 }}
                            >
                                <span>
                                <i className="fa fa-arrow-left ml-2 mr-2 text-white"/>
                                </span>
                            </div>
                        }
                        {/*END BACK BUTTON*/}


                        {/*ROOT OPTIONS*/}
                        {
                            this.props.flow === null
                            &&
                            <div className="filter-option filter-option-selected">
                                Todos
                                <i className="fa fa-caret-right ml-2"/>
                            </div>
                        }
                        {
                            this.props.flow === null
                            &&
                            <div className="filter-option"
                                 onClick={(e) => {
                                     this.clickOnUpdateCountryFilter(e, -1)
                                 }}
                            >
                                Filtrar por países
                            </div>
                        }
                        {
                            this.props.flow === null
                            &&
                            <div className="filter-option"
                                 onClick={(e) => {
                                     this.clickOnUpdateCategoryFilter(e, -1)
                                 }}
                            >
                                Filtrar por categorías
                            </div>
                        }
                        {/*END ROOT OPTIONS*/}


                        {/*SELECTED OPTIONS*/}
                        {this.returnSelectecOptions()}
                        {/*END SELECTED OPTIONS*/}


                        {/*RESULTS*/}
                        {this.renderCountries()}
                        {this.renderCategories()}
                        {/*END RESULTS*/}

                    </div>
                </div>
            </div>
        )
    };

}

// Set propTypes
FiltersSectionLayout.propTypes = {};

// Set defaultProps
FiltersSectionLayout.defaultProps = {};

// mapStateToProps
const mapStateToProps = ({filters}) => ({
    flow: filters.filtersReducer.flow,
    selectedCategory: filters.filtersReducer.selectedCategory,
    categories: filters.filtersReducer.categories,
    selectedCountry: filters.filtersReducer.selectedCountry,
    countries: filters.filtersReducer.countries
});

// mapStateToProps
const mapDispatchToProps = {
    updateSelectedCategory,
    updateCategories,
    updateCountries,
    updateSelectedCountry,
    updateFlow
};

// Export Class
const _FiltersSectionLayout = connect(mapStateToProps, mapDispatchToProps)(FiltersSectionLayout);
export {_FiltersSectionLayout as FiltersSectionLayout};
