import {combineReducers} from "redux";
import * as types from "./types";

const getSessionInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

const updateSessionInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

export function getSessionReducer(state = getSessionInitialState, action) {
    switch (action.type) {
        case types.GET_SESSION_REQUEST:
            return {
                ...getSessionInitialState,
                loading: true
            };
        case types.GET_SESSION_REQUEST_FAILURE:
            return {
                ...getSessionInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.GET_SESSION_REQUEST_SUCCESS:
            return {
                ...getSessionInitialState,
                data: action.payload.data
            };
        case types.GET_SESSION_REQUEST_COMPLETED:
            return {
                ...getSessionInitialState,
                data: action.payload.data,
                completed: true
            };
        default:
            return state

    }
}

export function updateSessionReducer(state = updateSessionInitialState, action) {
    switch (action.type) {
        case types.UPDATE_SESSION_REQUEST:
            return {
                ...updateSessionInitialState,
                loading: true
            };
        case types.UPDATE_SESSION_REQUEST_FAILURE:
            return {
                ...updateSessionInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.UPDATE_SESSION_REQUEST_SUCCESS:
            return {
                ...updateSessionInitialState,
                data: action.payload.data
            };
        case types.UPDATE_SESSION_REQUEST_COMPLETED:
            return {
                ...updateSessionInitialState,
                data: action.payload.data,
                completed: true
            };
        default:
            return state

    }
}

export default combineReducers({
    getSessionReducer,
    updateSessionReducer
});
