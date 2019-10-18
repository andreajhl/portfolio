import {combineReducers} from "redux";
import * as types from "./types";

const fetchCelebritiesInitialState = {
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
    data: {category_data: {}, user_data: {}}
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

export default combineReducers({
    fetchCelebritiesReducer,
    getCelebrityReducer,
});
