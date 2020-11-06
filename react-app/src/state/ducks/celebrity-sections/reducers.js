import { combineReducers } from "redux";
import * as TYPES from "./types";

const fetchCelebritySectionsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} }
};

export function fetchCelebritySectionsReducer(
  state = fetchCelebritySectionsInitialState,
  action
) {
  switch (action.type) {
    case TYPES.FETCH_CELEBRITIES_SECTIONS:
      return {
        ...fetchCelebritySectionsInitialState,
        loading: true
      };
    case TYPES.FETCH_CELEBRITIES_SECTIONS_FAILURE:
      return {
        ...fetchCelebritySectionsInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case TYPES.FETCH_CELEBRITIES_SECTIONS_SUCCESS:
      return {
        ...fetchCelebritySectionsInitialState,
        data: action.payload.data
      };
    case TYPES.FETCH_CELEBRITIES_SECTIONS_COMPLETED:
      return {
        ...fetchCelebritySectionsInitialState,
        data: action.payload.data,
        completed: true
      };
    default:
      return state;
  }
}

export default combineReducers({
  fetchCelebritySectionsReducer
});
