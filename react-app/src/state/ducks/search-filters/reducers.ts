import * as TYPES from "./types";

export const searchFiltersInitialState: TYPES.SearchFiltersType = {
  limit: 20,
  offset: 0,
  price_gt: 5,
  price_lt: 500
};

export function searchFiltersReducer(
  state = searchFiltersInitialState,
  action
) {
  switch (action.type) {
    case TYPES.UPDATE_FILTERS:
      return {
        ...state,
        offset: searchFiltersInitialState.offset,
        ...action.payload
      };

    case TYPES.RESET_FILTERS:
      return {
        ...searchFiltersInitialState
      };

    default:
      return state;
  }
}

export default searchFiltersReducer;
