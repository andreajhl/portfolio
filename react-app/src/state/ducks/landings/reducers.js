import { combineReducers } from "redux";
import * as TYPES from "./types";

const fetchLandingsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} },
};

export function fetchLandingsReducer(
  state = fetchLandingsInitialState,
  action
) {
  switch (action.type) {
    case TYPES.FETCH_LANDINGS:
      return {
        ...fetchLandingsInitialState,
        data: { ...state.data },
        loading: true,
      };
    case TYPES.FETCH_LANDINGS_FAILURE:
      return {
        ...fetchLandingsInitialState,
        error_data: action.payload.data,
        failed: true,
      };
    case TYPES.FETCH_LANDINGS_SUCCESS:
      console.log(action.payload);
      const results = [];
      if (action.payload.config.params.offset !== 0)
        results.push(...state.data.results);
      results.push(...action.payload.data.results);
      return {
        ...fetchLandingsInitialState,
        data: { ...action.payload.data, results },
      };
    case TYPES.FETCH_LANDINGS_COMPLETED:
      return {
        ...fetchLandingsInitialState,
        data: { ...state.data },
        completed: true,
      };
    default:
      return state;
  }
}

export default combineReducers({
  fetchLandingsReducer,
});
