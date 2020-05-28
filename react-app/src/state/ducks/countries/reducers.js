import {combineReducers} from "redux";
import * as types from "./types";

const countriesInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {results: [], informationPage: {}}
};

export function countriesReducer(state = countriesInitialState, action) {
    switch (action.type) {
        case types.FETCH_COUNTRIES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_COUNTRIES_REQUEST_FAILURE:
            return {
                ...countriesInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.FETCH_COUNTRIES_REQUEST_SUCCESS:
            return {
                ...countriesInitialState,
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
    countriesReducer,
});
