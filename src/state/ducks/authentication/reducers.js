import {combineReducers} from "redux";
import * as types from "./types";

const loginInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

const changePasswordInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

const verifySecurityCodeInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

const resendSecurityCodeInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

const resetPasswordInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

export function loginReducer(state = loginInitialState, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...loginInitialState,
                loading: true
            };
        case types.LOGIN_REQUEST_FAILURE:
            return {
                ...loginInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.LOGIN_REQUEST_SUCCESS:
            return {
                ...loginInitialState,
                data: action.payload.data
            };
        case types.LOGIN_REQUEST_COMPLETED:
            return {
                ...loginInitialState,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function changePasswordReducer(state = changePasswordInitialState, action) {
    switch (action.type) {
        case types.CHANGE_PASSWORD_REQUEST:
            return {
                ...changePasswordInitialState,
                loading: true
            };
        case types.CHANGE_PASSWORD_REQUEST_FAILURE:
            return {
                ...changePasswordInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.CHANGE_PASSWORD_REQUEST_SUCCESS:
            return {
                ...changePasswordInitialState,
                data: action.payload.data
            };
        case types.CHANGE_PASSWORD_REQUEST_COMPLETED:
            return {
                ...changePasswordInitialState,
                data: action.payload.data,
                completed: true
            };
        default:
            return state

    }
}

export function verifySecurityCodeReducer(state = verifySecurityCodeInitialState, action) {
    switch (action.type) {
        case types.VERIFY_SECURITY_CODE_REQUEST:
            return {
                ...verifySecurityCodeInitialState,
                loading: true
            };
        case types.VERIFY_SECURITY_CODE_REQUEST_FAILURE:
            return {
                ...verifySecurityCodeInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.VERIFY_SECURITY_CODE_REQUEST_SUCCESS:
            return {
                ...verifySecurityCodeInitialState,
                data: action.payload.data
            };
        case types.VERIFY_SECURITY_CODE_REQUEST_COMPLETED:
            return {
                ...verifySecurityCodeInitialState,
                data: action.payload.data,
                completed: true
            };
        default:
            return state

    }
}

export function resendSecurityCodeReducer(state = resendSecurityCodeInitialState, action) {
    switch (action.type) {
        case types.RESEND_SECURITY_CODE_REQUEST:
            return {
                ...resendSecurityCodeInitialState,
                loading: true
            };
        case types.RESEND_SECURITY_CODE_REQUEST_FAILURE:
            return {
                ...resendSecurityCodeInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.RESEND_SECURITY_CODE_REQUEST_SUCCESS:
            return {
                ...resendSecurityCodeInitialState,
                data: action.payload.data
            };
        case types.RESEND_SECURITY_CODE_REQUEST_COMPLETED:
            return {
                ...resendSecurityCodeInitialState,
                data: action.payload.data,
                completed: true
            };
        default:
            return state

    }
}

export function resetPasswordReducer(state = resetPasswordInitialState, action) {
    switch (action.type) {
        case types.RESET_PASSWORD_REQUEST:
            return {
                ...resetPasswordInitialState,
                loading: true
            };
        case types.RESET_PASSWORD_REQUEST_FAILURE:
            return {
                ...resetPasswordInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.RESET_PASSWORD_REQUEST_SUCCESS:
            return {
                ...resetPasswordInitialState,
                data: action.payload.data
            };
        case types.RESET_PASSWORD_REQUEST_COMPLETED:
            return {
                ...resetPasswordInitialState,
                data: action.payload.data,
                completed: true
            };
        default:
            return state

    }
}

export default combineReducers({
    loginReducer,
    changePasswordReducer,
    verifySecurityCodeReducer,
    resendSecurityCodeReducer,
    resetPasswordReducer
});
