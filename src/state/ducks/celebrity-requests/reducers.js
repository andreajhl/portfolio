import {combineReducers} from "redux";
import * as TYPES from "./types";

const saveCelebrityRequestInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: {error: ""},
    data: {}
};

export function saveCelebrityRequestReducer(state = saveCelebrityRequestInitialState, action) {
    switch (action.type) {
        case TYPES.SAVE_CELEBRITY_REQUEST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case TYPES.SAVE_CELEBRITY_REQUEST_REQUEST_FAILURE:
            return {
                ...saveCelebrityRequestInitialState,
                error_data: action.payload.data,
                failed: true
            };
        case TYPES.SAVE_CELEBRITY_REQUEST_REQUEST_SUCCESS:
            return {
                ...saveCelebrityRequestInitialState,
                data: action.payload.data
            };
        case TYPES.SAVE_CELEBRITY_REQUEST_REQUEST_COMPLETED:
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
    saveCelebrityRequestReducer
});
