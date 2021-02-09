import apiService from "../../utils/apiService";
import * as TYPES from "./types";
import * as API_PATHS from "./paths";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess
} from "../../utils";

export const getDiscountCouponBanner = () => (dispatch) => {
  const TYPE = TYPES.GET_DISCOUNT_COUPONS_BANNER;
  const FINAL_PATH = API_PATHS.GET_DISCOUNT_COUPONS_BANNER;
  dispatch({ type: TYPE });
  apiService({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH
  })
    .then((res) => {
      if ("status" in res.data && res.data.status === "ERROR") {
        handleApiResponseFailure(dispatch, TYPE, res);
      } else {
        handleApiResponseSuccess(dispatch, TYPE, res);
      }
    })
    .catch((err) => {
      handleApiErrors(dispatch, TYPE, err);
    })
    .finally(() => {
      dispatch({ type: `${TYPE}_COMPLETED`, payload: {} });
    });
};

export const setTimeDifference = (payload) => ({
  type: TYPES.SET_TIME_DIFFERENCE,
  payload
});
