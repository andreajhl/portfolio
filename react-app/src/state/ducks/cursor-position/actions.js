import * as types from "./types";

export const saveCursorPosition = (currentPosition) =>{
    return dispatch =>{
        dispatch({
            type: types.SAVE_CURSOR_POSITION,
            payload: currentPosition
        })
    }
}