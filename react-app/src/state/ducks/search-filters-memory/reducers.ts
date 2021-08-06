import { SearchFiltersType } from "../search-filters/types";
import * as TYPES from "./types";
export const searchFiltersInitialState: SearchFiltersType = {};

export function searchFiltersMemoryReducer(
  state = searchFiltersInitialState,
  action
) {
  switch (action.type) {
    case TYPES.UPDATE_FILTERS_MEMORY:
      return action.payload;
    default:
      return state;
  }
}

export default searchFiltersMemoryReducer;
