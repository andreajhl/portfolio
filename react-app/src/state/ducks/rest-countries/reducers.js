import {combineReducers} from "redux";
import * as types from "./types";

const fetchCountriesInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: []
};

export function fetchCountriesReducer(state = fetchCountriesInitialState, action) {
    switch (action.type) {
        case types.FETCH_COUNTRIES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_COUNTRIES_REQUEST_FAILURE:
            return {
                ...fetchCountriesInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.FETCH_COUNTRIES_REQUEST_SUCCESS:
            return {
                ...fetchCountriesInitialState,
                data: action.payload.data
            };
        case types.FETCH_COUNTRIES_REQUEST_COMPLETED:
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
    fetchCountriesReducer,
});
