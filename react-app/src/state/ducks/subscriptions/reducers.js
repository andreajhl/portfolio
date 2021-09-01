import { combineReducers } from "redux";
import { mergePreviousResults } from "../../utils/mergePreviousResults";
import thunkReducer from "../../utils/thunkReducer";
import * as types from "./types";

const processSubscriptionInitialState = {
  loading: false,
  failed: false,
  completed: false,
  data: [],
  error_data: { error: "" },
};

export function processSubscriptionReducer(
  state = processSubscriptionInitialState,
  action
) {
  switch (action.type) {
    case types.PROCESS_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.PROCESS_SUBSCRIPTION_REQUEST_FAILURE:
      return {
        ...processSubscriptionInitialState,
        error_data: action.payload.data,
        failed: true,
      };
    case types.PROCESS_SUBSCRIPTION_REQUEST_SUCCESS:
      return {
        ...processSubscriptionInitialState,
        data: action.payload.data.results,
      };
    case types.PROCESS_SUBSCRIPTION_REQUEST_COMPLETED:
      return {
        ...state,
        completed: true,
      };
    default:
      return state;
  }
}

export function fetchUserSubscriptionsListReducer(
  state = processSubscriptionInitialState,
  action
) {
  switch (action.type) {
    case types.FETCH_USER_SUBSCRIPTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_USER_SUBSCRIPTIONS_FAILURE:
      return {
        ...processSubscriptionInitialState,
        error_data: action.payload.data,
        failed: true,
      };
    case types.FETCH_USER_SUBSCRIPTIONS_SUCCESS:
      return {
        ...processSubscriptionInitialState,
        data: action.payload.data.results,
      };
    case types.FETCH_USER_SUBSCRIPTIONS_COMPLETED:
      return {
        ...state,
        data: action.payload.data.results,
        completed: true,
      };
    default:
      return state;
  }
}

const listSubscriptionPostsReducer = thunkReducer(
  types.LIST_SUBSCRIPTION_POSTS_REQUEST,
  {
    totalResults: 0,
    results: [],
  },
  mergePreviousResults
);

const publicListSubscriptionPostsReducer = thunkReducer(
  types.PUBLIC_LIST_SUBSCRIPTION_POSTS_REQUEST,
  {
    totalResults: 0,
    results: [],
  },
  mergePreviousResults
);

const currentCelebrityReducer = (state = null, action) =>
  action.type === types.SET_CURRENT_CELEBRITY ? action.payload : state;

export default combineReducers({
  processSubscriptionReducer,
  fetchUserSubscriptionsListReducer,
  listSubscriptionPostsReducer,
  currentCelebrityReducer,
  publicListSubscriptionPostsReducer,
});
