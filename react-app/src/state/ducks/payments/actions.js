import * as types from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess
} from "../../utils";
import { history } from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";
import { AVAILABLE_CURRENCIES } from "../../../components/layouts/currency-dropdown/constants";
import * as GTM from "../../utils/gtm";
// import { reduxStore } from "../../../";

const reduxStore = {
  dispatch() {}
};

export const listPaymentGateways = (currency) => {
  return (dispatch) => {
    const TYPE = types.FETCH_PAYMENT_GATEWAYS_REQUEST;
    const FINAL_PATH =
      "/custom-endpoints/gateway-payment-methods/available-payment-methods/" +
      currency;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
      custom_endpoint: false
    })
      .then((res) => {
        if (res.data.status === "OK") {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions

          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        } else {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};

export const currencyExchange = (params) => {
  return (dispatch) => {
    const TYPE = types.CURRENCY_EXCHANGE_REQUEST;
    const FINAL_PATH =
      "custom-endpoints/gateway-payment-methods/currency-exchange";
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null,
      custom_endpoint: false
    })
      .then((res) => {
        if (res.data.status === "OK") {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions

          if (
            !AVAILABLE_CURRENCIES.find(
              (x) => x.implemented_by_dlocal === false && x.name === params.to
            )
          ) {
            dispatch(listPaymentGateways(params.to));
          } else {
            dispatch(listPaymentGateways("USD"));
          }
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        } else {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};

export const getContractToPay = (contractReference) => {
  return async (dispatch) => {
    setTimeout(function () {
      // Get Contract to Pay
      const TYPE = types.GET_CONTRACT_TO_PAY_REQUEST;
      const FINAL_PATH =
        "custom-endpoints/contracts/contract-to-pay/" + contractReference;
      dispatch({ type: TYPE, payload: {} });
      apiService({
        method: "GET",
        action: TYPE,
        path: FINAL_PATH,
        async: true,
        params: null,
        body: null
      })
        .then((res) => {
          if ("status" in res.data && res.data.status === "ERROR") {
            handleApiResponseFailure(dispatch, TYPE, res);
            // Other actions
            // history._pushRoute(ROUTING_PATHS.CLIENT_HIRINGS);
          } else {
            if (res.data.data.status >= 7) {
              history._pushRoute(
                ROUTING_PATHS.RESUMEN_DE_COMPRA.replace(
                  ":contract_reference",
                  res.data.data.reference
                )
              );
            } else {
              handleApiResponseSuccess(dispatch, TYPE, res);
              // Other actions
              dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
            }
          }
        })
        .catch((err) => {
          // history._pushRoute(ROUTING_PATHS.HOME_PATH);
          handleApiErrors(dispatch, TYPE, err);
        });
    }, 1000);
  };
};

export const processStripePayment = (
  contractReference,
  sourceId,
  discountCouponId
) => {
  const FINAL_PATH = "custom-endpoints/user-payments/process-stripe-payment";
  const data = {
    contractReference: contractReference,
    sourceId: sourceId,
    discountCouponId: discountCouponId
  };
  return new Promise((resolve, reject) => {
    apiService({
      method: "POST",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: data,
      custom_endpoint: false
    })
      .then(resolve)
      .catch((error) => {
        handleApiErrors(
          reduxStore.dispatch,
          types.CREATE_STRIPE_PAYMENT_REQUEST,
          error
        );
        reject(error);
      });
  });
};
export const processDlocalPayment = (
  contractReference,
  paymentMethodId,
  buyerFullName,
  buyerEmail,
  buyerDocument,
  discountCouponId,
  cardToken,
  deviceId
) => {
  const FINAL_PATH = "custom-endpoints/user-payments/process-dlocal-payment";
  const data = {
    contractReference: contractReference,
    paymentMethodId: paymentMethodId,
    buyerFullName: buyerFullName,
    buyerEmail: buyerEmail,
    buyerDocument: buyerDocument,
    discountCouponId: discountCouponId,
    cardToken: cardToken,
    deviceId: deviceId
  };
  return new Promise((resolutionFunc, rejectionFunc) => {
    apiService({
      method: "POST",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: data,
      custom_endpoint: false
    })
      .then((res) => {
        if (res.data.status === "OK") {
          resolutionFunc(res.data.data);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          rejectionFunc(err.response.data.error);
        } else {
          rejectionFunc("Ha ocurrido un error inesperado");
        }
      });
  });
};

export const processPayPalPayment = (
  contractReference,
  orderId,
  authorizationId,
  discountCouponId
) => {
  const FINAL_PATH = "custom-endpoints/user-payments/process-paypal-payment";
  const data = {
    contractReference: contractReference,
    orderId: orderId,
    authorizationId: authorizationId,
    discountCouponId: discountCouponId
  };
  return new Promise((resolutionFunc, rejectionFunc) => {
    apiService({
      method: "POST",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: data,
      custom_endpoint: false
    })
      .then((res) => {
        if (res.data.status === "ERROR") {
          handleApiErrors(
            reduxStore.dispatch,
            types.CREATE_PAYPAL_PAYMENT_REQUEST,
            res
          );
          rejectionFunc(res.data.error);
        } else {
          resolutionFunc(res.data.data);
        }
      })
      .catch((error) => {
        handleApiErrors(
          reduxStore.dispatch,
          types.CREATE_PAYPAL_PAYMENT_REQUEST,
          error
        );
        if (error.response) {
          if (error.response.data) {
            rejectionFunc(error.response.data.error);
          }
        } else {
          rejectionFunc("Ocurrió un error procesando tu pago,");
        }
      });
  });
};

export const retrieveUserCards = () => {
  const FINAL_PATH =
    "custom-endpoints/user-payments/retrieve-stripe-customer-sources";
  return new Promise((resolutionFunc, rejectionFunc) => {
    apiService({
      method: "GET",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
      custom_endpoint: false
    })
      .then((res) => {
        if (res.data.status === "ERROR") {
          rejectionFunc(res.data.error);
        } else {
          resolutionFunc(res.data.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data) {
            rejectionFunc(error.response.data.error);
          }
        } else {
          rejectionFunc("ERROR");
        }
      });
  });
};

export const removeSource = (sourceId) => {
  const FINAL_PATH =
    "custom-endpoints/user-payments/remove-stripe-source/" + sourceId;
  return new Promise((resolutionFunc, rejectionFunc) => {
    apiService({
      method: "DELETE",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
      custom_endpoint: false
    })
      .then((res) => {
        if (res.data.status === "ERROR") {
          rejectionFunc(res.data.error);
        } else {
          resolutionFunc(res.data.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data) {
            rejectionFunc(error.response.data.error);
          }
        } else {
          rejectionFunc("ERROR");
        }
      });
  });
};

export const clearCouponData = () => {
  return (dispatch) => {
    dispatch({ type: types.APLY_DISCOUNT_COUPON_CLEAR, payload: {} });
  };
};

export const discountCouponsGateways = (contractReference, discountCoupon) => {
  const data = {
    contractReference: contractReference,
    discountCoupon: discountCoupon
  };
  return (dispatch) => {
    const TYPE = types.APPLY_DISCOUNT_COUPON;
    const FINAL_PATH = "custom-endpoints/user-payments/apply-discount-coupon";

    apiService({
      method: "POST",
      path: FINAL_PATH,
      async: true,
      params: null,
      body: data
    })
      .then((res) => {
        if (res.data.status === "OK") {
          const couponData = res.data;
          if (
            couponData.data.isPercentageDiscount &&
            couponData.data.discount_amount > 1
          ) {
            couponData.data.discount_amount =
              couponData.data.discount_amount / 100;
          }
          handleApiResponseSuccess(dispatch, TYPE, couponData);
          // Other actions
          dispatch({ type: `${TYPE}_COMPLETED`, payload: couponData });
        } else {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        }
      })
      .catch((err) => {
        if (err.response) {
          handleApiResponseFailure(dispatch, TYPE, err.response.data);
        }
      });
  };
};
