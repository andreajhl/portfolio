import { combineReducers } from "redux";
import * as types from "./types";

const fetchUserSubscriptionsCelebrityAlarmInitialState = {
  data: [],
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" }
};

export function userSubscriptionsCelebrityAlarms(
  state = fetchUserSubscriptionsCelebrityAlarmInitialState,
  action
) {
  switch (action.type) {
    case types.GET_USERS_SUBSCRIPTIONS_ALARMS_REQUEST:
      return {
        ...fetchUserSubscriptionsCelebrityAlarmInitialState,
        loading: true
      };
    case types.GET_USERS_SUBSCRIPTIONS_ALARMS_REQUEST_SUCCESS:
      return {
        ...fetchUserSubscriptionsCelebrityAlarmInitialState,
        loading: true
      };
    case types.GET_USERS_SUBSCRIPTIONS_ALARMS_REQUEST_COMPLETED:
      return {
        ...fetchUserSubscriptionsCelebrityAlarmInitialState,
        completed: true,
        data: action.payload.data
      };
    case types.GET_USERS_SUBSCRIPTIONS_ALARMS_REQUEST_FAILURE:
      return {
        ...fetchUserSubscriptionsCelebrityAlarmInitialState,
        error: action.payload
      };
    default:
      return state;
  }
}

export default combineReducers({
  userSubscriptionsCelebrityAlarms
});
