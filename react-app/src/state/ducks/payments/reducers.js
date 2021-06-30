import {
  CURRENT_CURRENCY_TRM_CODE,
  CURRENT_CURRENCY_TRM_RATE
} from "constants/keys";
import getCookie from "react-app/src/utils/getCookie";
import { combineReducers } from "redux";
import * as types from "./types";

const fetchPaymentGatewaysInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: []
};
const fetchPaymentGatewaysDLocalInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: []
};

const currencyExchangeInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {
    to:
      typeof window !== "undefined"
        ? getCookie(CURRENT_CURRENCY_TRM_CODE) || "USD"
        : "USD",
    rate:
      typeof window !== "undefined"
        ? getCookie(CURRENT_CURRENCY_TRM_RATE) || ""
        : ""
  }
};

const getContractToPayInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const createDlocalPaymentInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const createStripePaymentInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: null },
  data: {}
};

const createPayPalPaymentInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const applyDiscountCouponInitialState = {
  loading: false,
  data: {},
  completed: false,
  error_data: null
};

export const processStripePaymentReducer = (
  state = { error_data: { error: "" } },
  { type, action }
) => {
  if (type === types.CREATE_STRIPE_PAYMENT_REQUEST_FAILURE) {
    return {
      ...state,
      error_data: action.payload.error
    };
  }
  return state;
};

export const processPaypalPaymentReducer = (
  state = { error_data: { error: "" } },
  { type, action }
) => {
  if (type === types.CREATE_PAYPAL_PAYMENT_REQUEST_FAILURE) {
    return {
      ...state,
      error_data: action.payload.error
    };
  }
  return state;
};

export function fetchDiscountCouponReducer(
  state = applyDiscountCouponInitialState,
  action
) {
  switch (action.type) {
    case types.APPLY_DISCOUNT_COUPON:
      return {
        ...state,
        loading: true
      };
    case types.APPLY_DISCOUNT_COUPON_SUCCESS:
      return {
        ...applyDiscountCouponInitialState,
        data: action.payload.data
      };
    case types.APPLY_DISCOUNT_COUPON_FAILURE:
      return {
        ...applyDiscountCouponInitialState,
        error_data: action.payload.error
      };
    case types.APLY_DISCOUNT_COUPON_COMPLETED:
      return {
        ...state,
        data: action.payload.data,
        completed: true
      };
    case types.APLY_DISCOUNT_COUPON_CLEAR:
      return {
        ...applyDiscountCouponInitialState
      };

    default:
      return state;
  }
}

export function fetchPaymentGatewaysReducer(
  state = fetchPaymentGatewaysInitialState,
  action
) {
  switch (action.type) {
    case types.FETCH_PAYMENT_GATEWAYS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_PAYMENT_GATEWAYS_REQUEST_FAILURE:
      return {
        ...fetchPaymentGatewaysInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.FETCH_PAYMENT_GATEWAYS_REQUEST_SUCCESS:
      return {
        ...fetchPaymentGatewaysInitialState,
        data: action.payload.data.data
      };
    case types.FETCH_PAYMENT_GATEWAYS_REQUEST_COMPLETED:
      // const data = action.payload.data;
      // data.data = action.payload.data.data.reverse();
      return {
        ...state,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export function currencyExchangeReducer(
  state = currencyExchangeInitialState,
  action
) {
  switch (action.type) {
    case types.CURRENCY_EXCHANGE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.CURRENCY_EXCHANGE_REQUEST_FAILURE:
      return {
        ...currencyExchangeInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.CURRENCY_EXCHANGE_REQUEST_SUCCESS:
      return {
        ...currencyExchangeInitialState,
        data: action.payload.data.data
      };
    case types.CURRENCY_EXCHANGE_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export function getContractToPayReducer(
  state = getContractToPayInitialState,
  action
) {
  switch (action.type) {
    case types.GET_CONTRACT_TO_PAY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.GET_CONTRACT_TO_PAY_REQUEST_FAILURE:
      return {
        ...getContractToPayInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.GET_CONTRACT_TO_PAY_REQUEST_SUCCESS:
      return {
        ...getContractToPayInitialState,
        data: action.payload.data.data
      };
    case types.GET_CONTRACT_TO_PAY_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export default combineReducers({
  fetchPaymentGatewaysReducer,
  currencyExchangeReducer,
  getContractToPayReducer,
  fetchDiscountCouponReducer
});
