import { combineReducers } from "redux";
import * as TYPES from "./types";

const fetchUserCelebrityLikesInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {},
};

const fetchUserCelebrityLikesWithOffsetInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [] },
};

export function fetchUserCelebrityLikesReducer(
  state = fetchUserCelebrityLikesInitialState,
  action
) {
  switch (action.type) {
    case TYPES.FETCH_USER_CELEBRITY_LIKES:
      return {
        ...fetchUserCelebrityLikesInitialState,
        loading: true,
      };
    case TYPES.FETCH_USER_CELEBRITY_LIKES_FAILURE:
      return {
        ...fetchUserCelebrityLikesInitialState,
        error_data: action.payload.data,
        failed: true,
      };
    case TYPES.FETCH_USER_CELEBRITY_LIKES_SUCCESS:
      return {
        ...fetchUserCelebrityLikesInitialState,
        data: { ...action.payload.data },
      };
    case TYPES.FETCH_USER_CELEBRITY_LIKES_COMPLETED:
      return {
        ...fetchUserCelebrityLikesInitialState,
        data: { ...state.data },
        completed: true,
      };
    case TYPES.FETCH_USER_CELEBRITY_LIKES_CLEAN_UP:
      return {
        ...fetchUserCelebrityLikesInitialState,
      };
    case TYPES.TOGGLE_LIKE_FROM_LIST:
      const currentLikesList = Array.isArray(state?.data?.data)
        ? state?.data?.data
        : [];
      const celebrityId = action.payload;
      const likesHasCelebrityId = currentLikesList?.includes?.(celebrityId);
      const newLikesList = likesHasCelebrityId
        ? currentLikesList?.filter?.((id) => id !== celebrityId)
        : [...currentLikesList, celebrityId];

      return {
        ...state,
        data: {
          ...state.data,
          data: newLikesList,
        },
      };
    default:
      return state;
  }
}

export function fetchUserCelebrityLikesWithOffsetReducer(
  state = fetchUserCelebrityLikesWithOffsetInitialState,
  action
) {
  switch (action.type) {
    case TYPES.FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET:
      return {
        ...state,
        loading: true,
      };
    case TYPES.FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_FAILURE:
      return {
        ...state,
        error_data: action.payload.data,
        failed: true,
      };
    case TYPES.FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_SUCCESS:
      const results = [];
      if (action.payload.config.params.offset)
        results.push(...state.data.results);
      results.push(...action.payload.data.results);
      return {
        ...fetchUserCelebrityLikesWithOffsetInitialState,
        data: { ...action.payload.data, results },
      };
    case TYPES.FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET_COMPLETED:
      return {
        ...fetchUserCelebrityLikesWithOffsetInitialState,
        data: { ...state.data },
        completed: true,
      };
    default:
      return state;
  }
}

export default combineReducers({
  fetchUserCelebrityLikesReducer,
  fetchUserCelebrityLikesWithOffsetReducer,
});
