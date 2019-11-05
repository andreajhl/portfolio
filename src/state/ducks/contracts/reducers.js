import {combineReducers} from "redux";
import * as TYPES from "./types";

const saveClientContractInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};
const listClientContractsInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};
const getClientContractInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};
const saveClientContractReviewInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};
const listClientContractReviewsInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

export function saveClientContractReducer(state = saveClientContractInitialState, action) {
    switch (action.type) {
        case TYPES.SAVE_CLIENT_CONTRACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case TYPES.SAVE_CLIENT_CONTRACT_REQUEST_FAILURE:
            return {
                ...saveClientContractInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case TYPES.SAVE_CLIENT_CONTRACT_REQUEST_SUCCESS:
            return {
                ...saveClientContractInitialState,
                data: action.payload.data
            };
        case TYPES.SAVE_CLIENT_CONTRACT_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function listClientContractsReducer(state = listClientContractsInitialState, action) {
    switch (action.type) {
        case TYPES.LIST_CLIENT_CONTRACTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case TYPES.LIST_CLIENT_CONTRACTS_REQUEST_FAILURE:
            return {
                ...listClientContractsInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case TYPES.LIST_CLIENT_CONTRACTS_REQUEST_SUCCESS:
            return {
                ...listClientContractsInitialState,
                data: action.payload.data
            };
        case TYPES.LIST_CLIENT_CONTRACTS_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function getClientContractReducer(state = getClientContractInitialState, action) {
    switch (action.type) {
        case TYPES.GET_CLIENT_CONTRACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case TYPES.GET_CLIENT_CONTRACT_REQUEST_FAILURE:
            return {
                ...getClientContractInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case TYPES.GET_CLIENT_CONTRACT_REQUEST_SUCCESS:
            return {
                ...getClientContractInitialState,
                data: action.payload.data
            };
        case TYPES.GET_CLIENT_CONTRACT_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function saveClientContractReviewReducer(state = saveClientContractReviewInitialState, action) {
    switch (action.type) {
        case TYPES.SAVE_CLIENT_CONTRACT_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case TYPES.SAVE_CLIENT_CONTRACT_REVIEW_REQUEST_FAILURE:
            return {
                ...saveClientContractReviewInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case TYPES.SAVE_CLIENT_CONTRACT_REVIEW_REQUEST_SUCCESS:
            return {
                ...saveClientContractReviewInitialState,
                data: action.payload.data
            };
        case TYPES.SAVE_CLIENT_CONTRACT_REVIEW_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function listClientContractReviewsReducer(state = listClientContractReviewsInitialState, action) {
    switch (action.type) {
        case TYPES.LIST_CLIENT_CONTRACT_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case TYPES.LIST_CLIENT_CONTRACT_REVIEWS_REQUEST_FAILURE:
            return {
                ...listClientContractReviewsInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case TYPES.LIST_CLIENT_CONTRACT_REVIEWS_REQUEST_SUCCESS:
            return {
                ...listClientContractReviewsInitialState,
                data: action.payload.data
            };
        case TYPES.LIST_CLIENT_CONTRACT_REVIEWS_REQUEST_COMPLETED:
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
    saveClientContractReducer,
    listClientContractsReducer,
    getClientContractReducer,
    saveClientContractReviewReducer,
    listClientContractReviewsReducer
});
