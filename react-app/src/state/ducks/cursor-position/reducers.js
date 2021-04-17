import { combineReducers } from "redux";
import * as TYPES from "./types";

const filtersInitialState = {
  data: {
    view: "",
    position: 0
  }
};

export function positionReducer(state = filtersInitialState, action) {
  switch (action.type) {
    case TYPES.SAVE_CURSOR_POSITION:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}

export default combineReducers({
  positionReducer
});
