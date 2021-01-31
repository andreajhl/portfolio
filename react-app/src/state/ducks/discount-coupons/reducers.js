import { combineReducers } from "redux";
import * as types from "./types";

const getDiscountCouponBannerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {
    coupon: "",
    discount: 0,
    bannerTime: 0
  }
};

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
        data: action.payload.data
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

export default combineReducers({ getDiscountCouponBannerReducer });
