import {combineReducers} from "redux";
import * as types from "./types";

const fetchContractReviewsInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {results: [], pagination_data: {}}
};

const getContractReviewInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {celebrity: {}, user: {}}
};

export function fetchContractReviewsReducer(state = fetchContractReviewsInitialState, action) {
    switch (action.type) {
        case types.FETCH_CONTRACT_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_CONTRACT_REVIEWS_REQUEST_FAILURE:
            return {
                ...fetchContractReviewsInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.FETCH_CONTRACT_REVIEWS_REQUEST_SUCCESS:
            return {
                ...fetchContractReviewsInitialState,
                data: action.payload.data
            };
        case types.FETCH_CONTRACT_REVIEWS_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function getContractReviewReducer(state = getContractReviewInitialState, action) {
    switch (action.type) {
        case types.GET_CONTRACT_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_CONTRACT_REVIEW_REQUEST_FAILURE:
            return {
                ...getContractReviewInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.GET_CONTRACT_REVIEW_REQUEST_SUCCESS:
            return {
                ...getContractReviewInitialState,
                data: action.payload.data
            };
        case types.GET_CONTRACT_REVIEW_REQUEST_COMPLETED:
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
    fetchContractReviewsReducer,
    getContractReviewReducer,
});
