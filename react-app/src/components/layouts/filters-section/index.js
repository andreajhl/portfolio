import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { CelebritiesFilter } from "../celebrities-filter";
import { CelebritiesOrderBy } from "../celebrities-order-by";

import { updateQueryParams } from "../../../state/ducks/celebrities/actions";
import { restCountriesOperations } from "../../../state/ducks/rest-countries";
import { countriesOperations } from "../../../state/ducks/countries";
import { celebrityCategoriesOperations } from "../../../state/ducks/celebrity-categories";
import { updateQueryParamsInitialState } from "../../../state/ducks/celebrities/reducers";
import * as GTM from "../../../state/utils/gtm";
import { queryStringToJSON } from "../../../state/utils/apiService";
import { withRouter } from "react-app/src/components/common/routing";
import { useIntl, defineMessage, FormattedMessage } from "react-intl";
import {
  CATEGORIES_TITLES_WITH_TRANSLATION_AVAILABLE,
  COUNTRY_CODE_WITH_TRANSLATIONS_AVAILABLE,
  labelMessagesForCategoriesFilter,
  labelMessagesForCountryCodeFilter
} from "react-app/src/constants/messages";

// LISTA DE ID CON TRADUCCIONES DISPONIBLE. CUALQUIER NUEVO ID QUE SE REGISTRE
// EN EL BACKEND DEBE DE SER AGREGADO EN ESTA LISTA Y ADEMAS SU RESPECTIVA TRADUCCIÓN

const messageForLabelButtonCategoryFilter = defineMessage({
  description: "Label button for search CategoryFilter",
  defaultMessage: "Categoria"
});
const messageForModalTitleCategoryFilter = defineMessage({
  description: "ModalTitle for search CategoryFilter",
  defaultMessage: "Filtrar por categoría"
});
const messageForSearchPlaceholderCategoryFilter = defineMessage({
  description: "Modal Title for search CategoryFilter",
  defaultMessage: "Buscar categoría"
});
const messageForLabelButtonCategoryCountry = defineMessage({
  description: "buttonLabel search by country",
  defaultMessage: "País"
});
const messageForModalTitleCategoryCountry = defineMessage({
  description: "ModalTitle for search CategoryFilter",
  defaultMessage: "Filtrar por país"
});
const messageForSearchPlaceholderCategoryCountry = defineMessage({
  description: "Modal Title for search CategoryFilter",
  defaultMessage: "Buscar país"
});
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
  className = "",
  countries,
  celebrityCategories,
  updateQueryParams,
  listCountries,
  listCelebrityCategories,
  location,
  router
}) => {
  const intl = useIntl();

  const [params, setParams] = useState(initialState.params);
  const queryParams = queryStringToJSON(location.search);

  const setFilterParam = (paramName) => (paramValues) =>
    setParams((params) => ({
      ...params,
      [paramName]: paramValues.join(",")
    }));

  const setOrderByParam = (orderBy) =>
    setParams((params) => ({ ...params, orderBy }));

  useEffect(() => {
    if (params === initialState.params) return;
    updateQueryParams(
      {
        ...queryParams,
        ...initialState.params,
        ...params
      },
      router
    );
  }, [params]);

  useEffect(() => {
    const shouldFetchFilterOptions =
      !countries.length && !celebrityCategories.length;
    if (!shouldFetchFilterOptions) return;
    listCountries({ orderBy: "name asc" });
    listCelebrityCategories({ orderBy: "title asc" });
  }, []);

  const cleanFilters = () => {
    GTM.tagManagerDataLayer("CLICK_CLEAN_FILTERS_BUTTON", {
      widget: "FiltersSectionLayout",
      path: window.location.pathname,
      queryParams
    });
    updateQueryParams(
      {
        ...updateQueryParamsInitialState
      },
      router
    );
  };

  const showCleanFiltersButton =
    (queryParams.orderBy ||
      queryParams["country_id"] ||
      queryParams["category_id"]) &&
    !queryParams.search;

  const activeCountryItems = useMemo(
    () => (queryParams.country_id ? queryParams.country_id.split(",") : []),
    [queryParams.country_id]
  );

  const activeCategoryItems = useMemo(
    () => (queryParams.category_id ? queryParams.category_id.split(",") : []),
    [queryParams.category_id]
  );

  return (
    <section className={`FiltersSectionLayout ${className}`}>
      <div className="filters-section__container container pt-1">
        <h2 className="filters-section__title ml-2">
          <FormattedMessage defaultMessage="Filtrar por:" />
        </h2>
        <ul className="filters-section__filters-list p-0">
          {showCleanFiltersButton ? (
            <li className="filters-section__filters-item d-flex align-items-center">
              <button
                type="button"
                className="filters-section__back-btn btn btn-dark"
                onClick={cleanFilters}
              >
                <i className="fa fa-times text-white"></i>
              </button>
            </li>
          ) : null}
          <li className="filters-section__filters-item">
            <CelebritiesFilter
              buttonLabel={intl.formatMessage(
                messageForLabelButtonCategoryCountry
              )}
              modalTitle={intl.formatMessage(
                messageForModalTitleCategoryCountry
              )}
              searchPlaceholder={intl.formatMessage(
                messageForSearchPlaceholderCategoryCountry
              )}
              activeItems={activeCountryItems}
              onApplyFilters={setFilterParam("country_id")}
              options={countries.map((country) => ({
                label: COUNTRY_CODE_WITH_TRANSLATIONS_AVAILABLE.includes(
                  country.countryCode
                )
                  ? removeParenthesis(
                      intl.formatMessage(
                        labelMessagesForCountryCodeFilter[country.countryCode]
                      )
                    )
                  : removeParenthesis(country.name),
                value: country.id
              }))}
            />
          </li>
          <li className="filters-section__filters-item">
            <CelebritiesFilter
              buttonLabel={intl.formatMessage(
                messageForLabelButtonCategoryFilter
              )}
              modalTitle={intl.formatMessage(
                messageForModalTitleCategoryFilter
              )}
              searchPlaceholder={intl.formatMessage(
                messageForSearchPlaceholderCategoryFilter
              )}
              activeItems={activeCategoryItems}
              onApplyFilters={setFilterParam("category_id")}
              options={celebrityCategories.map((category) => ({
                label: CATEGORIES_TITLES_WITH_TRANSLATION_AVAILABLE.includes(
                  category.title
                )
                  ? intl.formatMessage(
                      labelMessagesForCategoriesFilter[category.title]
                    )
                  : category.title,
                value: category.id
              }))}
            />
          </li>
          <li className="filters-section__filters-item filters-section__order-by">
            <CelebritiesOrderBy
              onApplyOrderBy={setOrderByParam}
              activeValue={queryParams.orderBy}
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
)(withRouter(FiltersSectionLayout));

export { _FiltersSectionLayout as FiltersSectionLayout };
