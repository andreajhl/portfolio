import {FilterSeccionDeliveryTime} from 'react-app/src/components/containers/filter-section-deliveryTime';
import {FilterSeccionCountries} from 'react-app/src/components/containers/filter-section-countries';
import {FilterSectionRatings} from 'react-app/src/components/containers/filter-section-rating';
import {FilterSectionPrice } from 'react-app/src/components/containers/filter-section-price';
import { updateQueryParamsInitialState } from "../../../state/ducks/celebrities/reducers";
import { updateQueryParams } from "../../../state/ducks/celebrities/actions";
import { withRouter } from "react-app/src/components/common/routing";
import { countriesOperations } from "../../../state/ducks/countries";
import { queryStringToJSON } from "../../../state/utils/apiService";
import { useSelector,useDispatch } from "react-redux";
import React, { useState, useEffect} from "react";

const initialState = {
  params: {
    offset: updateQueryParamsInitialState.offset,
    limit: updateQueryParamsInitialState.limit,
  }
};

const stateCountries=({countries})=> countries.countriesReducer.data.results;

const NewFiltersSectionLayout = ({
  className="",
  location,
  router,
}) => {
  const dispatch=useDispatch()
  const countries= useSelector(stateCountries)
  const queryParams = queryStringToJSON(location.search);
  const [params, setParams] = useState(initialState.params);

  const setFilterParam = (paramName) => (paramValues) =>
    setParams((params) => ({
      ...params,
      [paramName]: paramValues.join(","),
    }));

  const setFilterByDeliveryTimeParam = (deliveryTime) =>
    setParams((params) => ({...params,max_delivery_time:deliveryTime}));
  const setFilterByPrice = (price) =>
    setParams((params) => ({...params,min_price:price[0],max_price: price[1]}));
  const setFilterByRatings = (star) =>
    setParams((params) => ({...params,ratings: star}));

  useEffect(() => {
    if (params === initialState.params) return;
    dispatch(updateQueryParams(
      {
        ...queryParams,
        ...initialState.params,
        ...params,
      },
      router
    ))
  }, [params]);

  useEffect(() => {
    if (countries.length) return;
    dispatch(countriesOperations.list({ orderBy: "name asc" }))
  }, []);

  const cleanFilters = () => {
    dispatch(updateQueryParams(
      {
        ...updateQueryParamsInitialState,
      },
      router
    ))
  };

  const showCleanFiltersButton =
    (queryParams.orderBy ||
      queryParams["country_id"] ||
      queryParams["max_delivery_time"]) &&
    !queryParams.search;

  return (
    <section className={router.pathname==='/'?'FiltersSectionLayout': 'FiltersSectionLayout__search'}>
      <div className="filters-section__container container pt-1">
        <ul className="filters-section__filters-list p-0 d-flex justify-content-evenly col-12">
          {showCleanFiltersButton ? (
            <li className="filters-section__filters-item d-flex align-items-center ">
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
           <FilterSeccionCountries 
              countries={countries}
              setFilterParam={setFilterParam}
              queryParams={queryParams}
           />
          </li>
          <li className="filters-section__filters-item">
            <FilterSeccionDeliveryTime
            setFilterByDeliveryTimeParam={setFilterByDeliveryTimeParam}
            queryParams={queryParams.max_delivery_time}
         />
          </li>
          <li className="filters-section__filters-item">
            <FilterSectionPrice
            setFilterPrice={setFilterByPrice}
         />
          </li>
          <li className="filters-section__filters-item">
            <FilterSectionRatings
            setFilterByRatings={setFilterByRatings}
         />
          </li>
          
        </ul>
      </div>
    </section>
  );
};

const _FiltersSectionLayout = withRouter(NewFiltersSectionLayout)

export {_FiltersSectionLayout as NewFiltersSectionLayout };
