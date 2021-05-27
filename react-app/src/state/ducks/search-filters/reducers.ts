import * as TYPES from "./types";

export const searchFiltersInitialState: TYPES.SearchFiltersType = {
  limit: 40,
  offset: 0,
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
