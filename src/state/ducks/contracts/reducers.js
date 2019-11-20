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
const getContractInitialState = {
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
const listContractCommmentsInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};
const addContractCommmentInitialState = {
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

export function getContractReducer(state = getContractInitialState, action) {
    switch (action.type) {
        case TYPES.GET_CONTRACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case TYPES.GET_CONTRACT_REQUEST_FAILURE:
            return {
                ...getContractInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case TYPES.GET_CONTRACT_REQUEST_SUCCESS:
            return {
                ...getContractInitialState,
                data: action.payload.data
            };
        case TYPES.GET_CONTRACT_REQUEST_COMPLETED:
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

export function listContractCommentsReducer(state = listContractCommmentsInitialState, action) {
    switch (action.type) {
        case TYPES.LIST_CONTRACT_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case TYPES.LIST_CONTRACT_COMMENTS_REQUEST_FAILURE:
            return {
                ...listContractCommmentsInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case TYPES.LIST_CONTRACT_COMMENTS_REQUEST_SUCCESS:
            if (action.payload.data.pagination_data.currentPage > 1) {
                action.payload.data.results = state.data.results.concat(action.payload.data.results);
                return {
                    ...listContractCommmentsInitialState,
                    data:  action.payload.data
                };
            }else{
                return {
                    ...listContractCommmentsInitialState,
                    data: action.payload.data
                };
            }
        case TYPES.LIST_CONTRACT_COMMENTS_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function addContractCommentReducer(state = addContractCommmentInitialState, action) {
    switch (action.type) {
        case TYPES.ADD_CONTRACT_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case TYPES.ADD_CONTRACT_COMMENTS_REQUEST_FAILURE:
            return {
                ...addContractCommmentInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case TYPES.ADD_CONTRACT_COMMENTS_REQUEST_SUCCESS:
            return {
                ...addContractCommmentInitialState,
                data: action.payload.data
            };
        case TYPES.ADD_CONTRACT_COMMENTS_REQUEST_COMPLETED:
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
    getContractReducer,
    saveClientContractReviewReducer,
    listContractCommentsReducer,
    addContractCommentReducer
});
