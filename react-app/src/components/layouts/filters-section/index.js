import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CelebritiesFilter } from "../celebrities-filter";
import { CelebritiesOrderBy } from "../celebrities-order-by";
import "./styles.scss";
import { updateQueryParams } from "../../../state/ducks/celebrities/actions";
import { restCountriesOperations } from "../../../state/ducks/rest-countries";
import { countriesOperations } from "../../../state/ducks/countries";
import { celebrityCategoriesOperations } from "../../../state/ducks/celebrity-categories";
import { updateQueryParamsInitialState } from "../../../state/ducks/celebrities/reducers";

const mapStateToProps = ({ countries, celebrities, celebrityCategories }) => {
  return {
    countries: countries.countriesReducer.data.results,
    celebrityCategories:
      celebrityCategories.fetchCelebrityCategoriesReducer.data.results
  };
};

const mapDispatchToProps = {
  updateQueryParams,
  listCountries: countriesOperations.list,
  listCelebrityCategories: celebrityCategoriesOperations.list,
  listRestCountries: restCountriesOperations.list
};

const removeParenthesis = (string) => string.replace(/\([^)]*\)/, "");

const initialState = {
  params: {
    offset: updateQueryParamsInitialState.offset,
    limit: updateQueryParamsInitialState.limit
  }
};

const FiltersSectionLayout = ({
  countries,
  celebrityCategories,
  queryParams,
  updateQueryParams,
  listCountries,
  listCelebrityCategories,
  listRestCountries
}) => {
  const [params, setParams] = useState(initialState.params);

  const setFilterParam = (paramName) => (paramValues) =>
    setParams((params) => ({
      ...params,
      [paramName]: paramValues.join(",")
    }));

  const setOrderByParam = (orderBy) =>
    setParams((params) => ({ ...params, orderBy }));

  useEffect(() => {
    if (params === initialState.params) return;
    updateQueryParams({
      ...queryParams,
      ...initialState.params,
      ...params
    });
  }, [params]);

  useEffect(() => {
    const shouldFetchFilterOptions =
      !countries.length && !celebrityCategories.length;
    if (!shouldFetchFilterOptions) return;
    listCountries();
    listRestCountries();
    listCelebrityCategories();
  }, []);

  return (
    <section className="FiltersSectionLayout">
      <div className="filters-section__container container pt-2">
        <h2 className="filters-section__title ml-2">Filtrar por:</h2>
        <ul className="filters-section__filters-list p-0">
          <li className="filters-section__filters-item">
            <CelebritiesFilter
              buttonLabel="País"
              modalTitle="Filtrar por país"
              searchPlaceholder="Buscar país"
              activeItems={
                queryParams.country_id ? queryParams.country_id.split(",") : []
              }
              onApplyFilters={setFilterParam("country_id")}
              options={countries.map((country) => ({
                label: removeParenthesis(country.name),
                value: country.id
              }))}
            />
          </li>
          <li className="filters-section__filters-item">
            <CelebritiesFilter
              buttonLabel="Categoría"
              modalTitle="Filtrar por categoría"
              searchPlaceholder="Buscar categoría"
              activeItems={
                queryParams.category_id
                  ? queryParams.category_id.split(",")
                  : []
              }
              onApplyFilters={setFilterParam("category_id")}
              options={celebrityCategories.map((category) => ({
                label: category.title,
                value: category.id
              }))}
            />
          </li>
          <li className="filters-section__filters-item filters-section__order-by">
            <CelebritiesOrderBy
              onApplyOrderBy={setOrderByParam}
              activeValue={params.orderBy}
            />
          </li>
        </ul>
      </div>
    </section>
  );
};

FiltersSectionLayout.defaultProps = {
  queryParams: []
};

const _FiltersSectionLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersSectionLayout);
export { _FiltersSectionLayout as FiltersSectionLayout };
