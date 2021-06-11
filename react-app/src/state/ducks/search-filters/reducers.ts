import * as TYPES from "./types";

export const searchFiltersInitialState: TYPES.SearchFiltersType = {
  pageSize: 40,
  currentPage: 1,
};

export function searchFiltersReducer(
  state = searchFiltersInitialState,
  action
) {
  switch (action.type) {
    case TYPES.UPDATE_FILTERS:
      return {
        ...state,
        currentPage: searchFiltersInitialState.currentPage,
        ...action.payload,
      };

    case TYPES.RESET_FILTERS:
      return {
        ...searchFiltersInitialState,
      };

    default:
      return state;
  }
}

export default searchFiltersReducer;
