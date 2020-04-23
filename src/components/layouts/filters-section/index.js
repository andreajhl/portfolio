import React, {Component} from 'react';
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
    }

    componentDidMount(): void {
        if (this.props.countries.length === 0) {
            listAsyncCountries({})
                .then(res => {
                    if (res.data.status === "OK") {
                        this.props.updateCountries(
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
        this.props.updateSelectedCategory(
            selectedCategory
        )
    };


    updateCountryFilter = (e, countryID) => {
        e.preventDefault();
        let selectedCountry = SELECTED_COUNTRY;
        if (countryID !== null) {
            selectedCountry = this.props.countries.find(x => x.id === countryID)
        }
        listAsyncCategories({
            usedInCountryID: countryID
        })
            .then(res => {
                if (res.data.status === "OK") {
                    this.props.updateCategories(
                        res.data.results
                    )
                }
            })
            .catch(err => {

            })
        this.props.updateSelectedCategory(
            SELECTED_CATEGORY
        );
        this.props.updateSelectedCountry(
            selectedCountry
        )
    };

    renderCountries = () => {
        if (!this.props.selectedCountry.id) {
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
        if (this.props.selectedCountry.id && !this.props.selectedCategory.id) {
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
                    <div className="filters-section">

                        {/*SELECTED FILTERS*/}
                        <div className="filter-option filter-option-selected">
                            {this.props.selectedCountry.name}
                            {
                                this.props.selectedCategory.id
                                &&
                                <span>
                                    <i className="fa fa-caret-right ml-2 mr-2"/>
                                    {this.props.selectedCategory.title}
                                </span>
                            }
                            <i className="fa fa-caret-right ml-2"/>
                        </div>
                        {/*END SELECTED FILTERS*/}

                        {/*DIVIDER*/}
                        <div className="divider"/>
                        {/*END DIVIDER*/}

                        {/*OPTIONS*/}
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
                        {this.renderCountries()}
                        {this.renderCategories()}
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
