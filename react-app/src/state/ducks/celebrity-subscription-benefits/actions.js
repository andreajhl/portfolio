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
