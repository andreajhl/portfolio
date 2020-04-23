import React, {Component} from 'react';
import "./styles.scss";
import {connect} from "react-redux";
import {updateCategories, updateSelectedCategory} from "../../../state/ducks/filters/actions";
import {listAsync} from "../../../state/ducks/celebrity-categories/actions";

class FiltersSectionLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSection: "filters-section"
        };
    }

    componentDidMount(): void {
        if(this.props.categories.length === 0){
            listAsync({})
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

    updateCategoryFilter = (e, index) => {
        e.preventDefault();
        let selectedCategory = {
            id: null,
            title: "Todos los famosos"
        };
        if (index !== null) {
            selectedCategory = this.props.categories[index]
        }
        this.props.updateSelectedCategory(
            selectedCategory
        )
    };

    render() {
        return (
            <div className="FiltersSectionLayout">
                <div className="navbar-1240">
                    <div className="filters-section">
                        <div className="filter-option filter-option-selected">
                            {this.props.selectedCategory.title}
                            <i className="fa fa-caret-right ml-2"/>
                        </div>
                        <div className="divider"/>

                        {
                            this.props.selectedCategory.id
                            &&
                            <div
                                className="filter-option"
                                onClick={(e) => {
                                    this.updateCategoryFilter(e, null)
                                }}
                            >
                                Todos los famosos
                            </div>
                        }
                        {
                            this.props.categories.filter((item) => {
                                return item.id !== this.props.selectedCategory.id;
                            }).map(
                                (item, index) => {
                                    return (
                                        <div
                                            className="filter-option"
                                            key={"filter-option" + index}
                                            onClick={(e) => {
                                                this.updateCategoryFilter(e, index)
                                            }}
                                        >
                                            {item.title}
                                        </div>
                                    )
                                })
                        }
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
const mapStateToProps = ({filters, celebrityCategories}) => ({
    selectedCategory: filters.filtersReducer.categoryFilter.selectedCategory,
    categories: filters.filtersReducer.categoryFilter.categories
});

// mapStateToProps
const mapDispatchToProps = {
    updateSelectedCategory,
    updateCategories
};

// Export Class
const _FiltersSectionLayout = connect(mapStateToProps, mapDispatchToProps)(FiltersSectionLayout);
export {_FiltersSectionLayout as FiltersSectionLayout};
