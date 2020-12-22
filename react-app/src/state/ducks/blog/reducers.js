import {combineReducers} from 'redux';
import * as types from "./types";

const fetchBlogsPostMediumInitialState ={
    data: [],
    loading: false,
    failed: false,
    completed: false,
    error_data: { error: "" },
}

export function blogsPostMediumReducer(state = fetchBlogsPostMediumInitialState, action){
    switch (action.type){
        case types.FETCH_BLOGS_REQUEST:
            return{
                ...fetchBlogsPostMediumInitialState,
                data : action.payload
            }
        case types.FETCH_BLOGS_DATA:
            return{
                ...fetchBlogsPostMediumInitialState,
                loading: true
            }
        case types.FETCH_BLOGS_DATA_SUCCESS:
            return{
                ...fetchBlogsPostMediumInitialState,
                completed:true,
                data : action.payload
            }
        case types.FETCH_BLOGS_DATA_FAILURE:
            return{
                ...fetchBlogsPostMediumInitialState,
                error : action.payload
            }
        default:
            return state
    }
}

export default combineReducers({
    blogsPostMediumReducer
})