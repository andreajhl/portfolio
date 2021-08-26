import { combineReducers } from "redux";
import thunkReducer from "../../utils/thunkReducer";
import { mergePreviousResults } from "../../utils/mergePreviousResults";
import * as types from "./types";

const listSubscriptionBenefitsReducer = thunkReducer(
  types.LIST_SUBSCRIPTION_BENEFITS_REQUEST,
  {
    totalResults: 0,
    results: [],
  },
  mergePreviousResults
);

export default combineReducers({
  listSubscriptionBenefitsReducer,
});
