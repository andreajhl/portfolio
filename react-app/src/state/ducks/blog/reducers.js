import {combineReducers} from 'redux';
import * as types from "./types";

const fetchBlogsPostMediumInitialState ={
    data: []
}

export function blogsPostMediumReducer(state = fetchBlogsPostMediumInitialState, action){
    switch (action.type){
        case types.FETCH_BLOGS_REQUEST:
            return{
                ...fetchBlogsPostMediumInitialState,
                data : action.payload
            }
        default:
            return state
    }
}

export default combineReducers({
    blogsPostMediumReducer
})