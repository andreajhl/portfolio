import { combineReducers } from "redux";
import * as TYPES from "./types";

const getCountryCodeInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { country_code: null }
};

export function getCountryCodeReducer(
  state = getCountryCodeInitialState,
  action
) {
  switch (action.type) {
    case TYPES.GET_COUNTRY_CODE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case TYPES.GET_COUNTRY_CODE_REQUEST_FAILURE:
      return {
        ...getCountryCodeInitialState,
        error_data: action.payload,
        failed: true
      };
    case TYPES.GET_COUNTRY_CODE_REQUEST_SUCCESS:
      return {
        ...getCountryCodeInitialState,
        data: action.payload
      };
    case TYPES.GET_COUNTRY_CODE_REQUEST_COMPLETED:
      return {
        ...state,
        completed: true
      };
    default:
      return state;
  }
}

export default combineReducers({
  getCountryCodeReducer
});
