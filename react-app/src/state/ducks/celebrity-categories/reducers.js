import {combineReducers} from "redux";
import * as types from "./types";

const fetchCelebrityCategoriesInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {results: [], informationPage: {}}
};

export function fetchCelebrityCategoriesReducer(state = fetchCelebrityCategoriesInitialState, action) {
    switch (action.type) {
        case types.FETCH_CELEBRITY_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_CELEBRITY_CATEGORIES_REQUEST_FAILURE:
            return {
                ...fetchCelebrityCategoriesInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.FETCH_CELEBRITY_CATEGORIES_REQUEST_SUCCESS:
            return {
                ...fetchCelebrityCategoriesInitialState,
                data: action.payload.data
            };
        case types.FETCH_CELEBRITY_CATEGORIES_REQUEST_COMPLETED:
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
    fetchCelebrityCategoriesReducer,
});
