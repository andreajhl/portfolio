import Router from "next/router";
import { SEARCH_PATH } from "react-app/src/routing/Paths";
import isBrowser from "react-app/src/utils/isBrowser";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";
import { jsonToQueryString } from "../../utils/apiService";
import * as TYPES from "./types";

const allowedParams = [
  "search",
  "pageSize",
  "currentPage",
  "country_id",
  "category_id",
  "min_price",
  "max_price",
  "hashtags",
  "orderBy",
];

const getValidParams = (params) => {
  const paramsEntries = Object.entries(params);
  const onlyValidParamsEntries = paramsEntries.filter(([key, value]) =>
    Boolean(value)
  );
  return Object.fromEntries(onlyValidParamsEntries);
};

function changeQueryParams(getState: any) {
  const currentParams = getState().searchFilters;
  if (!isBrowser()) return;
  Router.replace(
    SEARCH_PATH + jsonToQueryString(getValidParams(currentParams))
  );
}

export const updateSearchFilters = (
  payload: TYPES.SearchFiltersType,
  updateQueryParams = true
) => (dispatch, getState) => {
  dispatch({
    type: TYPES.UPDATE_FILTERS,
    payload: pickPropertiesFromAObject(payload, allowedParams),
  });

  if (updateQueryParams) changeQueryParams(getState);
};

export const resetSearchFilters = () => (dispatch, getState) => {
  dispatch({
    type: TYPES.RESET_FILTERS,
  });
  changeQueryParams(getState);
};
