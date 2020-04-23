import {combineReducers} from "redux";
import * as TYPES from "./types";

const filtersInitialState = {
    countryFilter: {
        selectedCountry: {
            id: null,
            name: "Todos los países"
        },
        countries: []
    },
    categoryFilter: {
        selectedCategory: {
            id: null,
            title: "Todos las categorías"
        },
        categories: []
    },
};

export function filtersReducer(state = filtersInitialState, action) {
    switch (action.type) {
        case TYPES.UPDATE_SELECTED_COUNTRY:
            return {
                ...state,
                countryFilter: {
                    selectedCountry: action.payload.selectedCountry,
                    countries: state.countryFilter.countries
                }
            };
        case TYPES.UPDATE_COUNTRIES:
            return {
                ...state,
                countryFilter: {
                    selectedCountry: state.countryFilter.selectedCountry,
                    countries: action.payload.countries
                }
            };
        case TYPES.UPDATE_SELECTED_CATEGORY:
            return {
                ...state,
                categoryFilter: {
                    selectedCategory: action.payload.selectedCategory,
                    categories: state.categoryFilter.categories
                }
            };
        case TYPES.UPDATE_CATEGORIES:
            return {
                ...state,
                categoryFilter: {
                    selectedCategory: state.categoryFilter.selectedCategory,
                    categories: action.payload.categories
                }
            };
        default:
            return state
    }
}


export default combineReducers({
    filtersReducer
});
