import {combineReducers} from "redux";
import * as types from "./types";

const fetchContractsInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {results: [], pagination_data: {}}
};

const getContractInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {celebrity: {}}
};

const saveContractInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

const updateContractInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

const fetchMyContractsInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {contracts: []}
};

const getContractPreviewInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {contract: []}
};

export function fetchContractsReducer(state = fetchContractsInitialState, action) {
    switch (action.type) {
        case types.FETCH_CONTRACTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_CONTRACTS_REQUEST_FAILURE:
            return {
                ...fetchContractsInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.FETCH_CONTRACTS_REQUEST_SUCCESS:
            return {
                ...fetchContractsInitialState,
                data: action.payload.data
            };
        case types.FETCH_CONTRACTS_REQUEST_COMPLETED:
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
        case types.GET_CONTRACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_CONTRACT_REQUEST_FAILURE:
            return {
                ...getContractInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.GET_CONTRACT_REQUEST_SUCCESS:
            return {
                ...getContractInitialState,
                data: action.payload.data
            };
        case types.GET_CONTRACT_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function saveContractReducer(state = saveContractInitialState, action) {
    switch (action.type) {
        case types.SAVE_CONTRACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.SAVE_CONTRACT_REQUEST_FAILURE:
            return {
                ...fetchContractsInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.SAVE_CONTRACT_REQUEST_SUCCESS:
            return {
                ...fetchContractsInitialState,
                data: action.payload.data
            };
        case types.SAVE_CONTRACT_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function updateContractReducer(state = updateContractInitialState, action) {
    switch (action.type) {
        case types.UPDATE_CONTRACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.UPDATE_CONTRACT_REQUEST_FAILURE:
            return {
                ...updateContractInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.UPDATE_CONTRACT_REQUEST_SUCCESS:
            return {
                ...updateContractInitialState,
                data: action.payload.data
            };
        case types.UPDATE_CONTRACT_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function fetchMyContractsReducer(state = fetchMyContractsInitialState, action) {
    switch (action.type) {
        case types.FETCH_MY_CONTRACTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_MY_CONTRACTS_REQUEST_FAILURE:
            return {
                ...fetchMyContractsInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.FETCH_MY_CONTRACTS_REQUEST_SUCCESS:
            return {
                ...fetchMyContractsInitialState,
                data: action.payload.data
            };
        case types.FETCH_MY_CONTRACTS_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function getContractPreviewReducer(state = getContractPreviewInitialState, action) {
    switch (action.type) {
        case types.GET_CONTRACT_PREVIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_CONTRACT_PREVIEW_REQUEST_FAILURE:
            return {
                ...getContractPreviewInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.GET_CONTRACT_PREVIEW_REQUEST_SUCCESS:
            return {
                ...getContractPreviewInitialState,
                data: action.payload.data
            };
        case types.GET_CONTRACT_PREVIEW_REQUEST_COMPLETED:
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
    fetchContractsReducer,
    saveContractReducer,
    getContractReducer,
    updateContractReducer,
    fetchMyContractsReducer,
    getContractPreviewReducer
});
