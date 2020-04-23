import React, {Component} from 'react';
import "./styles.scss";


class FiltersSectionLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSection: "filters-section"
        };
    }

    changeFilterSection = (section) => {
        this.setState({
            ...this.state,
            currentSection: section
        })
    };

    render() {
        return (
            <div className="FiltersSectionLayout">
                <div className="filters-section f-shadow f-rounded p-3">
                    <h6 className="text-left">
                        <b>Filtrar por:</b>
                    </h6>
                    <div className="filter-div">
                            <span className="filter-option-title">
                                Paises
                            </span>
                        <span className="filter-option-selected">
                                Todos
                                <i className="fa fa-caret-right"/>
                            </span>
                    </div>
                    <div className="filter-div">
                            <span className="filter-option-title">
                                Categorias
                            </span>
                        <span className="filter-option-selected">
                                Todos
                                <i className="fa fa-caret-right"/>
                            </span>
                    </div>
                    <div className="filter-div">
                            <span className="filter-option-title">
                                Precios
                            </span>
                        <span className="filter-option-selected">
                                Todos
                                <i className="fa fa-caret-right"/>
                            </span>
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

export {FiltersSectionLayout};
