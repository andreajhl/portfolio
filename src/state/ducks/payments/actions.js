import * as types from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess
} from "../../utils";
import * as API_PATHS from "./paths";
import { AssociateContract } from "../contracts/actions";
import { history } from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";
import { doesNotReject } from "assert";

export const listPaymentGateways = currency => {
  return dispatch => {
    const TYPE = types.FETCH_PAYMENT_GATEWAYS_REQUEST;
    const FINAL_PATH =
      API_PATHS.BASE_PATH + "available-payment-gateways/" + currency + "/";
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
      .then(res => {
        if (res.data.status === "OK") {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions

          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
          dispatch(currencyExchange({ from: "USD", to: currency }));
        } else {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const currencyExchange = params => {
  return dispatch => {
    const TYPE = types.CURRENCY_EXCHANGE_REQUEST;
    const FINAL_PATH = API_PATHS.BASE_PATH + "currency-exchanges/";
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
      .then(res => {
        if (res.data.status === "OK") {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions

          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        } else {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const getContractToPay = contractReference => {
  return async dispatch => {
    setTimeout(function() {
      // Get Contract to Pay
      const TYPE = types.GET_CONTRACT_TO_PAY_REQUEST;
      const FINAL_PATH =
        API_PATHS.BASE_PATH + "contract-to-pay/" + contractReference + "/";
      dispatch({ type: TYPE, payload: {} });
      apiService({
        method: "GET",
        action: TYPE,
        path: FINAL_PATH,
        async: true,
        params: null,
        body: null
      })
        .then(res => {
          if ("status" in res.data && res.data.status === "ERROR") {
            handleApiResponseFailure(dispatch, TYPE, res);
            // Other actions
            history._pushRoute(ROUTING_PATHS.CLIENT_HIRINGS);
          } else {
            handleApiResponseSuccess(dispatch, TYPE, res);
            // Other actions
            dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
          }
        })
        .catch(err => {
          // history._pushRoute(ROUTING_PATHS.ROOT_PATH);
          handleApiErrors(dispatch, TYPE, {
            data: { api_error: err, error: "Server 500" }
          });
        });
    }, 1000);
  };
};

export const createDlocalPayment = data => {
  return dispatch => {
    const TYPE = types.CREATE_DLOCAL_PAYMENT_REQUEST;
    const FINAL_PATH = API_PATHS.BASE_PATH + "create-dlocal-payment/";
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "POST",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: data,
      custom_endpoint: false
    })
      .then(res => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions

          // Validate if it is necessary a redirect
          if (res.data.required_redirect === true) {
            window.location.href = res.data.redirect_uri;
          }

          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch(err => {
        // history._pushRoute(ROUTING_PATHS.ROOT_PATH);
        let error = "Server 500";
        if (err.response.data.error) {
          error = err.response.data.error;
        }
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: error }
        });
      });
  };
};

export const createStripePayment = data => {
  return dispatch => {
    const TYPE = types.CREATE_STRIPE_PAYMENT_REQUEST;
    const FINAL_PATH = API_PATHS.BASE_PATH + "create-stripe-payment/";
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "POST",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: data,
      custom_endpoint: false
    })
      .then(res => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions

          history._pushRoute(
            ROUTING_PATHS.CONTRACT_CREATED.replace(
              ":contract_reference",
              res.data.reference
            )
          );

          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch(err => {
        // history._pushRoute(ROUTING_PATHS.ROOT_PATH);
        let error = "Server 500";
        if (err.response.data.error) {
          error = err.response.data.error;
        }
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: error }
        });
      });
  };
};
