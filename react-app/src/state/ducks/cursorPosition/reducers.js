import {combineReducers} from "redux";
import * as TYPES from "./types";

const filtersInitialState = {
    Position: 0, 
};

export function cursorReducer(state = filtersInitialState, action) {
    switch (action.type) {
        case TYPES.SAVE_CURSOR_POSITION:
            return {
                ...state,
                Position: action.payload
            };
        default:
            return state
    }
}


export default combineReducers({
    cursorReducer
});
