import { combineReducers } from "redux";
import * as types from "./types";

const processSubscriptionInitialState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: { error: "" },
};

export function processSubscriptionReducer(state = processSubscriptionInitialState, action) {
    switch (action.type) {
      case types.PROCESS_SUBSCRIPTION_REQUEST:
        return {
          ...state,
          loading: true
        };
      case types.PROCESS_SUBSCRIPTION_REQUEST_FAILURE:
        return {
          ...processSubscriptionInitialState,
          error_data: action.payload.data,
          failed: true
        };
      case types.PROCESS_SUBSCRIPTION_REQUEST_SUCCESS:
        return {
          ...processSubscriptionInitialState,
          data: action.payload.data.results
        };
      case types.PROCESS_SUBSCRIPTION_REQUEST_COMPLETED:
        return {
          ...state,
          completed: true
        };
      default:
        return state;
    }
  }
  
  
  export default combineReducers({
    processSubscriptionReducer
  });
  