import * as types from "./types";
import apiService from "../../utils/apiService";
import * as API_PATHS from "./paths";
import thunkAction from "../../utils/thunkAction";

export const getReferralCode = () =>
  thunkAction(types.GET_CODE_REQUEST, () =>
    apiService({
      method: "GET",
      path: API_PATHS.GET_CODE_PATH,
    })
  );

const defaultGetUserReferralsListParams = {
  offset: 0,
  limit: 5,
};

export const getUserReferralsList = (
  params = defaultGetUserReferralsListParams
) =>
  thunkAction(types.GET_USER_REFERRALS_LIST_REQUEST, () =>
    apiService({
      method: "GET",
      path: API_PATHS.GET_USER_REFERRALS_LIST_PATH,
      params,
    })
  );

export const registerReferralUser = (referrerCode = "") =>
  apiService({
    method: "POST",
    path: API_PATHS.REGISTER_REFERRAL_USER_PATH,
    body: { code: referrerCode },
  })
    .then((response) => {
      if (response?.data?.status !== "OK") throw response?.data?.error;
      return response?.data;
    })
    .catch((error) => {
      const errorMessage = error?.response?.data?.error || error?.toString?.();
      throw errorMessage;
    });
