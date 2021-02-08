import React, { Component } from "react";

class CategoriesFilterSectionLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="FiltersSectionLayout">
        <div className="filters-section f-shadow f-rounded p-3">
          <h6 className="text-left">
            <b>Categorias:</b>
          </h6>
          <div className="filter-div">
            <span className="filter-option-title">Paises</span>
            <span className="filter-option-selected">
              Todos
              <i className="fa fa-caret-right" />
            </span>
          </div>
          <div className="filter-div">
            <span className="filter-option-title">Categorias</span>
            <span className="filter-option-selected">
              Todos
              <i className="fa fa-caret-right" />
            </span>
          </div>
          <div className="filter-div">
            <span className="filter-option-title">Precios</span>
            <span className="filter-option-selected">
              Todos
              <i className="fa fa-caret-right" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

// Set propTypes
CategoriesFilterSectionLayout.propTypes = {};

// Set defaultProps
CategoriesFilterSectionLayout.defaultProps = {};

export { CategoriesFilterSectionLayout };
