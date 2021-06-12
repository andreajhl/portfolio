import { combineReducers } from "redux";
import * as TYPES from "./types";

const fetchUserFavoritesCelebritiesReducerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} },
};

export function fetchUserFavoritesCelebritiesReducer(
  state = fetchUserFavoritesCelebritiesReducerInitialState,
  action
) {
  switch (action.type) {
    case TYPES.FETCH_USER_FAVORITES_CELEBRITIES:
      return {
        ...state,
        loading: true,
      };
    case TYPES.FETCH_USER_FAVORITES_CELEBRITIES_FAILURE:
      return {
        ...state,
        error_data: action.payload.data,
        failed: true,
      };
    case TYPES.FETCH_USER_FAVORITES_CELEBRITIES_SUCCESS:
      return {
        ...fetchUserFavoritesCelebritiesReducerInitialState,
        loading: false,
      };
    case TYPES.FETCH_USER_FAVORITES_CELEBRITIES_COMPLETED:
      return {
        ...fetchUserFavoritesCelebritiesReducerInitialState,
        data: action.payload.data,
        completed: true,
      };
    default:
      return state;
  }
}

export default combineReducers({
  fetchUserFavoritesCelebritiesReducer,
});
