import { combineReducers } from "redux";
import thunkReducer from "../../utils/thunkReducer";
import { mergePreviousResults } from "../../utils/mergePreviousResults";
import * as types from "./types";

const thunkListSubscriptionBenefitsReducer = thunkReducer(
  types.LIST_SUBSCRIPTION_BENEFITS_REQUEST,
  {
    totalResults: 0,
    results: [],
    currentParams: { offset: 0 },
  },
  (action, previousState) => {
    const mergedPayload = mergePreviousResults(action, previousState);
    return { ...mergedPayload, currentParams: action?.payload?.config?.params };
  }
);

const listSubscriptionBenefitsReducer = (state, action) => {
  if (action.type === types.SET_LIST_SUBSCRIPTION_BENEFITS_OFFSET) {
    return {
      ...state,
      data: {
        ...state.data,
        currentParams: { ...state.data.currentParams, offset: action.payload },
      },
    };
  }
  return thunkListSubscriptionBenefitsReducer(state, action);
};

export default combineReducers({
  listSubscriptionBenefitsReducer,
});
