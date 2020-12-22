import {combineReducers} from "redux";
import * as TYPES from "./types";

const filtersInitialState = {
    flow: null, // allCountries -> categoriesUsedInCountry
                // allCategories -> countriesUsedInCategory
    selectedCountry: {},
    countries: [],
    selectedCategory: {},
    categories: [],
};

export function filtersReducer(state = filtersInitialState, action) {
    switch (action.type) {
        case TYPES.UPDATE_UPDATE_FLOW:
            return {
                ...state,
                flow: action.payload.flow
            };
        case TYPES.UPDATE_SELECTED_COUNTRY:
            return {
                ...state,
                selectedCountry: action.payload.selectedCountry,
            };
        case TYPES.UPDATE_COUNTRIES:
            return {
                ...state,
                countries: action.payload.countries
            };
        case TYPES.UPDATE_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload.selectedCategory,
            };
        case TYPES.UPDATE_CATEGORIES:
            return {
                ...state,
                categories: action.payload.categories
            };
        default:
            return state
    }
}


export default combineReducers({
    filtersReducer
});
