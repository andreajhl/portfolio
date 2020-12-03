import * as types from "./types";

export const saveBlogData = (data) =>{
    return dispatch =>{
        dispatch({
            type: types.FETCH_BLOGS_REQUEST,
            payload: data
        })
    }
}