import {combineReducers} from "redux";
import * as types from "./types";
import {getTotalColumns} from "../../utils/gridSystem";

const updateQueryParamsInitialState = {
    page: 1,
    search: "",
    page_size: getTotalColumns() * 5
};

const fetchCelebritiesInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {results: [], pagination_data: {}}
};

const fetchSimilarCelebritiesInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {results: [], pagination_data: {}}
};

const getCelebrityInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {category: {}, user: {}, hashtags: []}
};

const fetchReviewsInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {results: [], pagination_data: {}}
};

const fetchPublicContractsInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {results: [], pagination_data: {}}
};

export function queryParamsReducer(state = updateQueryParamsInitialState, action) {
    if (action.type === types.UPDATE_QUERY_PARAMS) {
        return action.payload.params;
    } else {
        return state
    }
}

export function fetchCelebritiesReducer(state = fetchCelebritiesInitialState, action) {
    switch (action.type) {
        case types.FETCH_CELEBRITIES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_CELEBRITIES_REQUEST_FAILURE:
            return {
                ...fetchCelebritiesInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.FETCH_CELEBRITIES_REQUEST_SUCCESS:
            if (action.payload.data.pagination_data.currentPage === 1) {
                return {
                    ...fetchCelebritiesInitialState,
                    data: action.payload.data
                };
            } else if (action.payload.data.pagination_data.totalItems <= state.data.pagination_data.totalItems) {
                action.payload.data.results = state.data.results.concat(action.payload.data.results);
                return {
                    ...fetchCelebritiesInitialState,
                    data:  action.payload.data
                };
            }
            break;
        case types.FETCH_CELEBRITIES_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function fetchSimilarCelebritiesReducer(state = fetchSimilarCelebritiesInitialState, action) {
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
                data: action.payload.data,
                completed: true
            };
        default:
            return state
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
                data: action.payload.data
            };
        case types.GET_CELEBRITY_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
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
            return {
                ...fetchReviewsInitialState,
                data: action.payload.data
            };
        case types.FETCH_REVIEWS_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function fetchPublicContractsReducer(state = fetchPublicContractsInitialState, action) {
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
        default:
            return state
    }
}

export default combineReducers({
    queryParamsReducer,
    fetchCelebritiesReducer,
    fetchSimilarCelebritiesReducer,
    getCelebrityReducer,
    fetchReviewsReducer,
    fetchPublicContractsReducer
});
