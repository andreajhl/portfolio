import { combineReducers } from "redux";
import pickPropertiesFromAObject from "../../../utils/pickPropertiesFromAObject";
import * as types from "./types";

const getDiscountCouponBannerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {
    couponCode: "",
    discount: 0,
    bannerTime: 0
  }
};

const timeDifferenceInitialState = null;

export function timeDifferenceReducer(
  state = timeDifferenceInitialState,
  action
) {
  if (action.type === types.SET_TIME_DIFFERENCE) {
    return action.payload;
  }
  return state;
}

export function getDiscountCouponBannerReducer(
  state = getDiscountCouponBannerInitialState,
  action
) {
  switch (action.type) {
    case types.GET_DISCOUNT_COUPONS_BANNER:
      return {
        ...state,
        loading: true
      };
    case types.GET_DISCOUNT_COUPONS_BANNER_FAILURE:
      return {
        ...getDiscountCouponBannerInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.GET_DISCOUNT_COUPONS_BANNER_SUCCESS:
      return {
        ...getDiscountCouponBannerInitialState,
        data: pickPropertiesFromAObject(action.payload.data.data, [
          "bannerTime",
          "couponCode",
          "discount_amount"
        ])
      };
    case types.GET_DISCOUNT_COUPONS_BANNER_COMPLETED:
      return {
        ...state,
        completed: true
      };
    default:
      return state;
  }
}

export default combineReducers({
  getDiscountCouponBannerReducer,
  timeDifferenceReducer
});
