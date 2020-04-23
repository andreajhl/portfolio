import * as types from "./types";

export const updateSelectedCountry = (selectedCountry) => {
    return dispatch => {
        dispatch({
            type: types.UPDATE_SELECTED_COUNTRY,
            payload: {selectedCountry}
        });
    }
};

export const updateCountries = (countries) => {
    return dispatch => {
        dispatch({
            type: types.UPDATE_COUNTRIES,
            payload: {countries}
        });
    }
};

export const updateSelectedCategory = (selectedCategory) => {
    return dispatch => {
        dispatch({
            type: types.UPDATE_SELECTED_CATEGORY,
            payload: {selectedCategory}
        });
    }
};

export const updateCategories = (categories) => {
    return dispatch => {
        dispatch({
            type: types.UPDATE_CATEGORIES,
            payload: {categories}
        });
    }
};


