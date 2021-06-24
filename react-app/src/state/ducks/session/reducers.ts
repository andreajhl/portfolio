import { userDetails } from "./../../../../../desktop-app/types/userDetails";
import { combineReducers } from "redux";
import * as types from "./types";
import thunkReducer from "../../utils/thunkReducer";

const getSessionInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {},
};

const updateSessionInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {},
};

export type typeUserAccountDetailsState = {
  loading: boolean;
  failed: boolean;
  completed: boolean;
  error_data: { error: "" };
  data?: userDetails;
};

const userAccountDetailsInitialState: typeUserAccountDetailsState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
};

export function getSessionReducer(state = getSessionInitialState, action) {
  switch (action.type) {
    case types.GET_SESSION_REQUEST:
      return {
        ...getSessionInitialState,
        loading: true,
      };
    case types.GET_SESSION_REQUEST_FAILURE:
      return {
        ...getSessionInitialState,
        error_data: action.payload.data,
        failed: true,
      };
    case types.GET_SESSION_REQUEST_SUCCESS:
      return {
        ...getSessionInitialState,
        data: action.payload.data.data,
      };
    case types.GET_SESSION_REQUEST_COMPLETED:
      return {
        ...getSessionInitialState,
        data: action.payload.data.data,
        completed: true,
      };
    default:
      return state;
  }
}

export function updateSessionReducer(
  state = updateSessionInitialState,
  action
) {
  switch (action.type) {
    case types.UPDATE_SESSION_REQUEST:
      return {
        ...updateSessionInitialState,
        loading: true,
      };
    case types.UPDATE_SESSION_REQUEST_FAILURE:
      return {
        ...updateSessionInitialState,
        error_data: action.payload.data,
        failed: true,
      };
    case types.UPDATE_SESSION_REQUEST_SUCCESS:
      return {
        ...updateSessionInitialState,
        data: action.payload.data,
      };
    case types.UPDATE_SESSION_REQUEST_COMPLETED:
      return {
        ...updateSessionInitialState,
        data: action.payload.data,
        completed: true,
      };
    default:
      return state;
  }
}

export function userAccountDetails(
  state = userAccountDetailsInitialState,
  action
) {
  switch (action.type) {
    case types.GET_USER_ACCOUNT_DETAILS:
      return {
        ...userAccountDetailsInitialState,
        loading: true,
      };
    case types.GET_USER_ACCOUNT_DETAILS_FAILURE:
      return {
        ...userAccountDetailsInitialState,
        error_data: action.payload.data,
        failed: true,
      };
    case types.GET_USER_ACCOUNT_DETAILS_SUCCESS:
      return {
        ...userAccountDetailsInitialState,
      };
    case types.GET_USER_ACCOUNT_DETAILS_COMPLETED:
      return {
        ...userAccountDetailsInitialState,
        data: action.payload.data?.data,
        completed: true,
      };
    default:
      return state;
  }
}

export const getUserContractReducer = thunkReducer(
  types.GET_USER_CONTRACT_REQUEST,
  {}
);

export const getReceiptsUrlsReducer = thunkReducer(types.GET_RECEIPTS_URLS, {});

export default combineReducers({
  getSessionReducer,
  updateSessionReducer,
  userAccountDetails,
  getUserContractReducer,
  getReceiptsUrlsReducer,
});
