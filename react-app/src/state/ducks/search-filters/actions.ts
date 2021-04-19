import Router from "next/router";
import { SEARCH_PATH } from "react-app/src/routing/Paths";
import pickPropertiesFromAObject from "react-app/src/utils/pickPropertiesFromAObject";
import { jsonToQueryString } from "../../utils/apiService";
import * as TYPES from "./types";

const allowedParams = [
  "search",
  "limit",
  "offset",
  "country_id",
  "category_id",
  "orderBy"
];

function changeQueryParams(getState: any) {
  const currentParams = pickPropertiesFromAObject(
    getState().searchFilters,
    allowedParams
  );
  Router.replace(SEARCH_PATH + jsonToQueryString(currentParams));
}

export const updateSearchFilters = (payload: TYPES.SearchFiltersType) => (
  dispatch,
  getState
) => {
  dispatch({
    type: TYPES.UPDATE_FILTERS,
    payload
  });
  changeQueryParams(getState);
};

export const resetSearchFilters = () => (dispatch, getState) => {
  dispatch({
    type: TYPES.RESET_FILTERS
  });
  changeQueryParams(getState);
};
