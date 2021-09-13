import * as types from "./types";
import apiService from "../../utils/apiService";
import * as API_PATHS from "./paths";
import thunkAction from "../../utils/thunkAction";

const defaultListSubscriptionBenefitsParams = {
  celebrityId: "",
  offset: 0,
  limit: 2,
};

export const listSubscriptionBenefits = (
  params = defaultListSubscriptionBenefitsParams
) =>
  thunkAction(types.LIST_SUBSCRIPTION_BENEFITS_REQUEST, () =>
    apiService({
      method: "GET",
      path: API_PATHS.LIST_SUBSCRIPTION_BENEFITS_PATH,
      params,
    })
  );

export const setListSubscriptionBenefitsOffset = (offset = 0) => ({
  type: types.SET_LIST_SUBSCRIPTION_BENEFITS_OFFSET,
  payload: offset,
});

export const publicListSubscriptionBenefits = (
  params = defaultListSubscriptionBenefitsParams
) =>
  thunkAction(types.PUBLIC_LIST_SUBSCRIPTION_BENEFITS_REQUEST, () =>
    apiService({
      method: "GET",
      path: API_PATHS.PUBLIC_LIST_SUBSCRIPTION_BENEFITS_PATH,
      params,
    })
  );

export const setPublicListSubscriptionBenefitsOffset = (offset = 0) => ({
  type: types.SET_PUBLIC_LIST_SUBSCRIPTION_BENEFITS_OFFSET,
  payload: offset,
});
