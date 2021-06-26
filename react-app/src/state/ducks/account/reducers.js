import { combineReducers } from "redux";
import * as TYPES from "./types";

const fetchUserFavoritesCelebritiesReducerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} },
};
const fetchUserFavoritesContractsReducerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} },
};
const fetchUserFavoritesContractsWithReferenceReducerInitialState = {
  data: [],
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
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

export function fetchUserFavoritesContractsReducer(
  state = fetchUserFavoritesContractsReducerInitialState,
  action
) {
  switch (action.type) {
    case TYPES.FETCH_USER_FAVORITES_CONTRACTS:
      return {
        ...state,
        loading: true,
      };
    case TYPES.FETCH_USER_FAVORITES_CONTRACTS_FAILURE:
      return {
        ...state,
        error_data: action.payload.data,
        failed: true,
      };
    case TYPES.FETCH_USER_FAVORITES_CONTRACTS_SUCCESS:
      return {
        ...fetchUserFavoritesCelebritiesReducerInitialState,
        loading: false,
      };
    case TYPES.FETCH_USER_FAVORITES_CONTRACTS_COMPLETED:
      return {
        ...fetchUserFavoritesCelebritiesReducerInitialState,
        data: action.payload.data,
        completed: true,
      };
    default:
      return state;
  }
}
export function fetchUserFavoritesContractsWithReferenceReducer(
  state = fetchUserFavoritesContractsWithReferenceReducerInitialState,
  action
) {
  switch (action.type) {
    case TYPES.FETCH_USER_LIKES_CONTRACTS_WITH_REFERENCE:
      return {
        ...state,
        loading: true,
      };
    case TYPES.FETCH_USER_LIKES_CONTRACTS_WITH_REFERENCE_FAILURE:
      return {
        ...state,
        error_data: action.payload.data,
        failed: true,
      };
    case TYPES.FETCH_USER_LIKES_CONTRACTS_WITH_REFERENCE_SUCCESS:
      return {
        ...fetchUserFavoritesCelebritiesReducerInitialState,
        loading: false,
      };
    case TYPES.FETCH_USER_LIKES_CONTRACTS_WITH_REFERENCE_COMPLETED:
      return {
        ...fetchUserFavoritesCelebritiesReducerInitialState,
        data: action.payload.data?.data,
        completed: true,
      };
    default:
      return state;
  }
}

export default combineReducers({
  fetchUserFavoritesCelebritiesReducer,
  fetchUserFavoritesContractsReducer,
  fetchUserFavoritesContractsWithReferenceReducer,
});
