import { combineReducers } from "redux";
import { mergePreviousResults } from "../../utils/mergePreviousResults";
import thunkReducer from "../../utils/thunkReducer";
import * as types from "./types";

const getCodeReducer = thunkReducer(types.GET_CODE_REQUEST, "");

const getUserReferralsListReducer = thunkReducer(
  types.GET_USER_REFERRALS_LIST_REQUEST,
  {
    results: [],
    totalResults: 0,
  },
  mergePreviousResults
);

export default combineReducers({ getCodeReducer, getUserReferralsListReducer });
