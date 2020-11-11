import { combineReducers } from "redux";
import * as TYPES from "./types";

const fetchUserCelebrityLikesInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

export function fetchUserCelebrityLikesReducer(
  state = fetchUserCelebrityLikesInitialState,
  action
) {
  switch (action.type) {
    case TYPES.FETCH_CELEBRITIES_SECTIONS:
      return {
        ...fetchUserCelebrityLikesInitialState,
        loading: true
      };
    case TYPES.FETCH_CELEBRITIES_SECTIONS_FAILURE:
      return {
        ...fetchUserCelebrityLikesInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case TYPES.FETCH_CELEBRITIES_SECTIONS_SUCCESS:
      return {
        ...fetchUserCelebrityLikesInitialState,
        data: { ...action.payload.data }
      };
    case TYPES.FETCH_CELEBRITIES_SECTIONS_COMPLETED:
      return {
        ...fetchUserCelebrityLikesInitialState,
        data: { ...state.data },
        completed: true
      };
    default:
      return state;
  }
}

export default combineReducers({
  fetchUserCelebrityLikesReducer
});
