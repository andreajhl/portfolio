import {combineReducers} from "redux";
import * as types from "./types";

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
            if (action.payload.data.pagination_data.currentPage > 1) {
                // Concat Method
                let hash = {};
                for (let i of action.payload.data.results.concat(action.payload.data.results)) {
                    if (!hash[i]) {
                        hash[i.name] = i;
                    }
                }
                let newArr = [];
                for (let i in hash) {
                    newArr.push(hash[i])
                }
                action.payload.data.results = newArr;
                // End Concat Method
                return {
                    ...fetchCelebritiesInitialState,
                    data: action.payload.data
                };
            } else {
                return {
                    ...fetchCelebritiesInitialState,
                    data: action.payload.data
                };
            }
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
    fetchCelebritiesReducer,
    fetchSimilarCelebritiesReducer,
    getCelebrityReducer,
    fetchReviewsReducer,
    fetchPublicContractsReducer
});
