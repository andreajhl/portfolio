import { combineReducers } from "redux";
import * as TYPES from "./types";

const fetchCelebritySectionsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} }
};

const playVideoInitialState = {
  video_key: null
};

export function fetchCelebritySectionsReducer(
  state = fetchCelebritySectionsInitialState,
  action
) {
  switch (action.type) {
    case TYPES.FETCH_CELEBRITIES_SECTIONS:
      return {
        ...fetchCelebritySectionsInitialState,
        data: { ...state.data },
        loading: true
      };
    case TYPES.FETCH_CELEBRITIES_SECTIONS_FAILURE:
      return {
        ...fetchCelebritySectionsInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case TYPES.FETCH_CELEBRITIES_SECTIONS_SUCCESS:
      const results = [];
      if (action.payload.config.params.offset !== 0)
        results.push(...state.data.results);
      results.push(...action.payload.data.results);
      return {
        ...fetchCelebritySectionsInitialState,
        data: { ...action.payload.data, results }
      };
    case TYPES.FETCH_CELEBRITIES_SECTIONS_COMPLETED:
      return {
        ...fetchCelebritySectionsInitialState,
        data: { ...state.data },
        completed: true
      };
    default:
      return state;
  }
}

export function playVideoReducer(state = playVideoInitialState, action) {
  if (action.type === TYPES.PLAY_VIDEO) {
    return action.payload;
  } else {
    return state;
  }
}

export default combineReducers({
  fetchCelebritySectionsReducer,
  playVideoReducer
});
