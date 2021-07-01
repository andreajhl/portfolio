import { combineReducers } from "redux";
import thunkReducer from "../../utils/thunkReducer";
import * as TYPES from "./types";

const fetchCommentHiringReducerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} },
};

export function fetchCommentHiringReducer(
  state = fetchCommentHiringReducerInitialState,
  action
) {
  switch (action.type) {
    case TYPES.FETCH_COMMENT_HIRING:
      return {
        ...state,
        loading: true,
      };
    case TYPES.FETCH_COMMENT_HIRING_FAILURE:
      return {
        ...state,
        error_data: action.payload.data,
        failed: true,
      };
    case TYPES.FETCH_COMMENT_HIRING_SUCCESS:
      return {
        ...fetchCommentHiringReducerInitialState,
        loading: false,
      };
    case TYPES.FETCH_COMMENT_HIRING_COMPLETED:
      return {
        ...fetchCommentHiringReducerInitialState,
        data: action.payload.data,
        completed: true,
      };
    default:
      return state;
  }
}

const getPublicContractReducer = thunkReducer(TYPES.GET_PUBLIC_CONTRACT, {});

export default combineReducers({
  fetchCommentHiringReducer,
  getPublicContractReducer,
});
