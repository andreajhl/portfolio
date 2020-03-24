import {combineReducers} from "redux";
import * as types from "./types";

const fetchCelebritySocialNetworksInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {results: [], informationPage: {}}
};

const getCelebritySocialNetworkInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {celebrity: {}, user: {}}
};

export function fetchCelebritySocialNetworksReducer(state = fetchCelebritySocialNetworksInitialState, action) {
    switch (action.type) {
        case types.FETCH_CELEBRITY_SOCIAL_NETWORKS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_CELEBRITY_SOCIAL_NETWORKS_REQUEST_FAILURE:
            return {
                ...fetchCelebritySocialNetworksInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.FETCH_CELEBRITY_SOCIAL_NETWORKS_REQUEST_SUCCESS:
            return {
                ...fetchCelebritySocialNetworksInitialState,
                data: action.payload.data
            };
        case types.FETCH_CELEBRITY_SOCIAL_NETWORKS_REQUEST_COMPLETED:
            return {
                ...state,
                data: action.payload.data,
                completed: true
            };
        default:
            return state
    }
}

export function getCelebritySocialNetworkReducer(state = getCelebritySocialNetworkInitialState, action) {
    switch (action.type) {
        case types.GET_CELEBRITY_SOCIAL_NETWORK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_CELEBRITY_SOCIAL_NETWORK_REQUEST_FAILURE:
            return {
                ...getCelebritySocialNetworkInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case types.GET_CELEBRITY_SOCIAL_NETWORK_REQUEST_SUCCESS:
            return {
                ...getCelebritySocialNetworkInitialState,
                data: action.payload.data
            };
        case types.GET_CELEBRITY_SOCIAL_NETWORK_REQUEST_COMPLETED:
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
    fetchCelebritySocialNetworksReducer,
    getCelebritySocialNetworkReducer,
});
