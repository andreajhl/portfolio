import {combineReducers} from "redux";
import * as types from "./types";

const fetchCelebritiesInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: []
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

export default combineReducers({
    fetchCelebritiesReducer,
});
