import * as types from "./types";

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


