import React, {Component, createRef} from 'react';
import "./styles.scss";
import {connect} from "react-redux";
import {
    updateCategories,
    updateCountries,
    updateSelectedCategory,
    updateSelectedCountry
} from "../../../state/ducks/filters/actions";
import {listAsync as listAsyncCategories} from "../../../state/ducks/celebrity-categories/actions";
import {listAsync as listAsyncCountries} from "../../../state/ducks/countries/actions";
import * as GTM from "../../../state/utils/gtm";

const SELECTED_CATEGORY = {
    id: null,
    title: "Todos las categorías"
};

const SELECTED_COUNTRY = {
    id: null,
    name: "Todos los países"
};


class FiltersSectionLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSection: "filters-section"
        };
        this.scrollDiv = createRef();
    }

    componentDidMount(): void {
        if (this.props.categories.length === 0) {
            listAsyncCategories({})
                .then(res => {
                    if (res.data.status === "OK") {
                        this.props.updateCategories(
                            res.data.results
                        )
                    }
                })
                .catch(err => {

                })
        }
    }

    updateCategoryFilter = (e, categoryID) => {
        e.preventDefault();
        let selectedCategory = SELECTED_CATEGORY;
        if (categoryID !== null) {
            selectedCategory = this.props.categories.find(x => x.id === categoryID)
        }
        listAsyncCountries({
            usedInCategoryID: selectedCategory.id
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
        this.props.updateSelectedCountry(
            SELECTED_COUNTRY
        );
        this.props.updateSelectedCategory(
            selectedCategory
        );
        GTM.tagManagerDataLayer(
            "CLICK_ON_CATEGORY_FILTER",
            selectedCategory
        );
        this.scrollDiv.current.scrollLeft = 0;
    };

    updateCountryFilter = (e, countryID) => {
        e.preventDefault();
        let selectedCountry = SELECTED_COUNTRY;
        if (countryID !== null) {
            selectedCountry = this.props.countries.find(x => x.id === countryID)
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

    renderCountries = () => {
        if (this.props.selectedCategory.id && !this.props.selectedCountry.id) {
            return (
                <div className="helper-div">
                    {
                        this.props.countries.filter((item) => {
                            return item.id !== this.props.selectedCountry.id;
                        }).map(
                            (item, index) => {
                                return (
                                    <div
                                        className="filter-option"
                                        key={"filter-option country" + item.name + item.id}
                                        onClick={(e) => {
                                            this.updateCountryFilter(e, item.id)
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
        if (!this.props.selectedCategory.id) {
            return (
                <div className="helper-div">
                    {
                        this.props.categories.filter((item) => {
                            return item.id !== this.props.selectedCategory.id;
                        }).map(
                            (item, index) => {
                                return (
                                    <div
                                        className="filter-option"
                                        key={"filter-option category" + item.title + item.id}
                                        onClick={(e) => {
                                            this.updateCategoryFilter(e, item.id)
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

    render() {
        return (
            <div className="FiltersSectionLayout">
                <div className="navbar-1240">
                    <div className="filters-section" ref={this.scrollDiv}>

                        {/*SELECTED FILTERS*/}
                        <div className="filter-option filter-option-selected">
                            {this.props.selectedCategory.title}
                            {
                                this.props.selectedCountry.id
                                &&
                                <span>
                                    <i className="fa fa-caret-right ml-2 mr-2"/>
                                    {this.props.selectedCountry.name}
                                </span>
                            }
                            <i className="fa fa-caret-right ml-2"/>
                        </div>
                        {/*END SELECTED FILTERS*/}

                        {/*DIVIDER*/}
                        <div className="divider"/>
                        {/*END DIVIDER*/}

                        {/*OPTIONS*/}
                        {this.renderCountries()}
                        {this.renderCategories()}
                        {
                            this.props.selectedCategory.id
                            &&
                            <div
                                className="filter-option"
                                onClick={(e) => {
                                    this.updateCategoryFilter(e, null)
                                }}
                            >
                                Todos las Categorias
                            </div>
                        }
                        {
                            this.props.selectedCountry.id
                            &&
                            <div
                                className="filter-option"
                                onClick={(e) => {
                                    this.updateCountryFilter(e, null)
                                }}
                            >
                                Todos los países
                            </div>
                        }
                        {/*END OPTIONS*/}

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
    selectedCategory: filters.filtersReducer.categoryFilter.selectedCategory,
    categories: filters.filtersReducer.categoryFilter.categories,
    selectedCountry: filters.filtersReducer.countryFilter.selectedCountry,
    countries: filters.filtersReducer.countryFilter.countries
});

// mapStateToProps
const mapDispatchToProps = {
    updateSelectedCategory,
    updateCategories,
    updateCountries,
    updateSelectedCountry,
};

// Export Class
const _FiltersSectionLayout = connect(mapStateToProps, mapDispatchToProps)(FiltersSectionLayout);
export {_FiltersSectionLayout as FiltersSectionLayout};
