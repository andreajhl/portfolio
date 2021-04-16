import * as TYPES from "./types";

export const updateSearchFilters = (payload: TYPES.SearchFiltersType) => ({
  type: TYPES.UPDATE_FILTERS,
  payload
});

export const resetSearchFilters = () => ({
  type: TYPES.RESET_FILTERS
});
