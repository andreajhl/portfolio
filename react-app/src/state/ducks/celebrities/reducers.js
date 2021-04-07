import { combineReducers } from "redux";
import { ROOT_PATH } from "../../../routing/Paths";
import * as types from "./types";

export const updateQueryParamsInitialState = {
  offset: 0,
  limit: 20
};

const fetchCelebritiesInitialState = {
  requestCancel: null,
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} }
};

const fetchCelebritiesSimilarResultsInitialState = {
  requestCancel: null,
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} }
};

const fetchSimilarCelebritiesInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} }
};

const getCelebrityInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { category: {}, user: {}, hashtags: [] }
};

const fetchReviewsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} }
};

const fetchPublicContractsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} }
};

const fetchFlashDeliveryCelebritiesInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { usernames: [] }
};
const fetchCelebritySubscriptionPlansInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [] }
};

const previousPathInitialState = { pathname: ROOT_PATH };

const celebrityProfileVersionInitialState = null;

export function queryParamsReducer(
  state = updateQueryParamsInitialState,
  action
) {
  if (action.type === types.UPDATE_QUERY_PARAMS) {
    return action.payload.params;
  } else {
    return state;
  }
}

export function fetchCelebritiesReducer(
  state = fetchCelebritiesInitialState,
  action
) {
  switch (action.type) {
    case types.FETCH_CELEBRITIES_REQUEST:
      return {
        ...state,
        requestCancel: action.payload.requestCancel,
        loading: true
      };
    case types.FETCH_CELEBRITIES_REQUEST_FAILURE:
      return {
        ...state,
        error_data: action.payload.data,
        failed: true,
        requestCancel: fetchCelebritiesInitialState.requestCancel
      };
    case types.FETCH_CELEBRITIES_REQUEST_SUCCESS:
      const results = [];
      if (action.payload.config.params.offset)
        results.push(...state.data.results);
      results.push(...action.payload.data.results);
      return {
        ...fetchCelebritiesInitialState,
        data: { ...action.payload.data, results }
      };
    case types.FETCH_CELEBRITIES_REQUEST_COMPLETED:
      return {
        ...fetchCelebritiesInitialState,
        data: { ...state.data },
        completed: true
      };
    default:
      return state;
  }
}

export function fetchCelebritiesSimilarResultsReducer(
  state = fetchCelebritiesSimilarResultsInitialState,
  action
) {
  switch (action.type) {
    case types.FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST:
      return {
        ...state,
        requestCancel: action.payload.requestCancel,
        loading: true
      };
    case types.FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_FAILURE:
      return {
        ...state,
        error_data: action.payload.data,
        failed: true,
        requestCancel: fetchCelebritiesSimilarResultsInitialState.requestCancel
      };
    case types.FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_SUCCESS:
      const results = [];
      if (action.payload.config.params.offset)
        results.push(...state.data.results);
      results.push(...action.payload.data.results);
      return {
        ...fetchCelebritiesSimilarResultsInitialState,
        data: { ...action.payload.data, results }
      };
    case types.FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST_COMPLETED:
      return {
        ...fetchCelebritiesSimilarResultsInitialState,
        data: { ...state.data },
        completed: true
      };
    default:
      return state;
  }
}

export function fetchSimilarCelebritiesReducer(
  state = fetchSimilarCelebritiesInitialState,
  action
) {
  switch (action.type) {
    case types.FETCH_SIMILAR_CELEBRITIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_SIMILAR_CELEBRITIES_REQUEST_FAILURE:
      return {
        ...fetchSimilarCelebritiesInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.FETCH_SIMILAR_CELEBRITIES_REQUEST_SUCCESS:
      return {
        ...fetchSimilarCelebritiesInitialState,
        data: action.payload.data
      };
    case types.FETCH_SIMILAR_CELEBRITIES_REQUEST_COMPLETED:
      return {
        ...state,
        // data: action.payload.data,
        completed: true
      };
    default:
      return state;
  }
}

export function getCelebrityReducer(state = getCelebrityInitialState, action) {
  switch (action.type) {
    case types.GET_CELEBRITY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.GET_CELEBRITY_REQUEST_FAILURE:
      return {
        ...getCelebrityInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.GET_CELEBRITY_REQUEST_SUCCESS:
      return {
        ...getCelebrityInitialState,
        data: action.payload.data.data
      };
    case types.GET_CELEBRITY_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export function fetchReviewsReducer(state = fetchReviewsInitialState, action) {
  switch (action.type) {
    case types.FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_REVIEWS_REQUEST_FAILURE:
      return {
        ...fetchReviewsInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.FETCH_REVIEWS_REQUEST_SUCCESS:
      const results = [];
      if (action.payload.mergeResults) {
        results.push(...state.data.results);
      }
      results.push(...action.payload.data.results);
      return {
        ...fetchReviewsInitialState,
        data: { ...action.payload.data, results }
      };
    case types.FETCH_REVIEWS_REQUEST_COMPLETED:
      return {
        ...state,
        completed: true
      };
    default:
      return state;
  }
}

export function fetchPublicContractsReducer(
  state = fetchPublicContractsInitialState,
  action
) {
  switch (action.type) {
    case types.FETCH_PUBLIC_CONTRACTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_PUBLIC_CONTRACTS_REQUEST_FAILURE:
      return {
        ...fetchPublicContractsInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.FETCH_PUBLIC_CONTRACTS_REQUEST_SUCCESS:
      return {
        ...fetchPublicContractsInitialState,
        data: action.payload.data
      };
    case types.FETCH_PUBLIC_CONTRACTS_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data,
        completed: true
      };
    case types.CLEAN_PUBLIC_CONTRACTS:
      return fetchPublicContractsInitialState;
    default:
      return state;
  }
}

export const previousPathReducer = (
  state = previousPathInitialState,
  action
) => {
  if (action.type === types.SET_PREVIOUS_PATH)
    return { pathname: action.payload };
  return state;
};

export function fetchFlashDeliveryCelebritiesReducer(
  state = fetchFlashDeliveryCelebritiesInitialState,
  action
) {
  switch (action.type) {
    case types.FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_FAILURE:
      return {
        ...fetchFlashDeliveryCelebritiesInitialState,
        error_data: action.payload,
        failed: true
      };
    case types.FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_SUCCESS:
      return {
        ...fetchFlashDeliveryCelebritiesInitialState,
        data:
          action.payload?.[0] || fetchFlashDeliveryCelebritiesInitialState.data
      };
    case types.FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST_COMPLETED:
      return {
        ...state,
        completed: true
      };
    default:
      return state;
  }
}

export function fetchCelebritySubscriptionPlansReducer(
  state = fetchCelebritySubscriptionPlansInitialState,
  action
) {
  switch (action.type) {
    case types.FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_FAILURE:
      return {
        ...fetchCelebritySubscriptionPlansInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_SUCCESS:
      return {
        ...fetchCelebritySubscriptionPlansInitialState,
        data: action.payload.data.results
      };
    case types.FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data.results,
        completed: true
      };
    default:
      return state;
  }
}

export const celebrityProfileVersionReducer = (
  state = celebrityProfileVersionInitialState,
  { type, payload }
) => (type === types.SET_CELEBRITY_PROFILE_VERSION ? payload : state);

export default combineReducers({
  queryParamsReducer,
  fetchCelebritiesReducer,
  fetchSimilarCelebritiesReducer,
  getCelebrityReducer,
  fetchReviewsReducer,
  fetchPublicContractsReducer,
  previousPathReducer,
  fetchFlashDeliveryCelebritiesReducer,
  fetchCelebritySubscriptionPlansReducer,
  fetchCelebritiesSimilarResultsReducer,
  celebrityProfileVersionReducer
});
