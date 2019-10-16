import {combineReducers} from "redux";
import * as types from "./types";

const fetchCelebritiesInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {results: [], pagination_data: {}}
};

const getAlarmInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {groups: []}
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
            return {
                ...fetchCelebritiesInitialState,
                data: action.payload.data
            };
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

export function getAlarmReducer(state = getAlarmInitialState, action) {
    switch (action.type) {
        case types.GET_CELEBRITY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_CELEBRITY_REQUEST_FAILURE:
            return {
                ...getAlarmInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.GET_CELEBRITY_REQUEST_SUCCESS:
            return {
                ...getAlarmInitialState,
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

export default combineReducers({
    fetchCelebritiesReducer,
    getAlarmReducer,
});
