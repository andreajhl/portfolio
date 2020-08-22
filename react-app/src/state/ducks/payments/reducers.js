import {combineReducers} from "redux";
import * as types from "./types";

const fetchPaymentGatewaysInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {
        gateways: []
    }
};

const currencyExchangeInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {
        to: "USD"
    }
};

const getContractToPayInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

const createDlocalPaymentInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

const createStripePaymentInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

const createPayPalPaymentInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};


export function fetchPaymentGatewaysReducer(state = fetchPaymentGatewaysInitialState, action) {
    switch (action.type) {
        case types.FETCH_PAYMENT_GATEWAYS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_PAYMENT_GATEWAYS_REQUEST_FAILURE:
            return {
                ...fetchPaymentGatewaysInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.FETCH_PAYMENT_GATEWAYS_REQUEST_SUCCESS:
            return {
                ...fetchPaymentGatewaysInitialState,
                data: action.payload.data
            };
        case types.FETCH_PAYMENT_GATEWAYS_REQUEST_COMPLETED:
            const data = action.payload.data;
            data.data = action.payload.data.data.reverse();
            return {
                ...state,
                data: data,
                completed: true
            };
        default:
            return state
    }
}

export function currencyExchangeReducer(state = currencyExchangeInitialState, action) {
    switch (action.type) {
        case types.CURRENCY_EXCHANGE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.CURRENCY_EXCHANGE_REQUEST_FAILURE:
            return {
                ...currencyExchangeInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.CURRENCY_EXCHANGE_REQUEST_SUCCESS:
            return {
                ...currencyExchangeInitialState,
                data: action.payload.data.data
            };
        case types.CURRENCY_EXCHANGE_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data.data,
                completed: true
            };
        default:
            return state
    }
}

export function getContractToPayReducer(state = getContractToPayInitialState, action) {
    switch (action.type) {
        case types.GET_CONTRACT_TO_PAY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_CONTRACT_TO_PAY_REQUEST_FAILURE:
            return {
                ...getContractToPayInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.GET_CONTRACT_TO_PAY_REQUEST_SUCCESS:
            return {
                ...getContractToPayInitialState,
                data: action.payload.data.data
            };
        case types.GET_CONTRACT_TO_PAY_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data.data,
                completed: true
            };
        default:
            return state
    }
}

export default combineReducers({
    fetchPaymentGatewaysReducer,
    currencyExchangeReducer,
    getContractToPayReducer,
});
