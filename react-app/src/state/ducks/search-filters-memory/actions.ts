import { SearchFiltersType } from "../search-filters/types";
import * as TYPES from "./types";

export const updateSearchFiltersMemory = (payload: SearchFiltersType) => (
  dispatch
) => {
  dispatch({
    type: TYPES.UPDATE_FILTERS_MEMORY,
    payload: payload,
  });
};
