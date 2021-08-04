import { combineReducers } from "redux";
import { HashtagType } from "../../../../../desktop-app/types/hashtagType";
import * as TYPES from "./types";

const initialResults: HashtagType[] = [];

const listHashtagsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: initialResults },
};

export function listHashtagsReducer(state = listHashtagsInitialState, action) {
  switch (action.type) {
    case TYPES.LIST_HASHTAGS:
      return {
        ...listHashtagsInitialState,
        data: { ...state.data },
        loading: true,
      };
    case TYPES.LIST_HASHTAGS_FAILURE:
      return {
        ...listHashtagsInitialState,
        error_data: action.payload.data,
        failed: true,
      };
    case TYPES.LIST_HASHTAGS_SUCCESS:
      return {
        ...listHashtagsInitialState,
        data: { ...action.payload.data },
      };
    case TYPES.LIST_HASHTAGS_COMPLETED:
      return {
        ...listHashtagsInitialState,
        data: state.data,
        completed: true,
      };
    default:
      return state;
  }
}

export default combineReducers({
  listHashtagsReducer,
});
