import * as types from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import * as API_PATHS from "./paths";
import {history} from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";
import {AVAILABLE_CURRENCIES} from "../../../components/layouts/currency-dropdown/constants";

export const listPaymentGateways = currency => {
  return dispatch => {
    const TYPE = types.FETCH_PAYMENT_GATEWAYS_REQUEST;
    const FINAL_PATH = "/custom-endpoints/gateway-payment-methods/available-payment-methods/" + currency;
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
        } else {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};

export const currencyExchange = params => {
  return dispatch => {
    const TYPE = types.CURRENCY_EXCHANGE_REQUEST;
    const FINAL_PATH = "custom-endpoints/gateway-payment-methods/currency-exchange";
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

          if (!AVAILABLE_CURRENCIES.find(
              x => x.implemented_by_dlocal === false && x.name ===params.to
          )) {
            dispatch(listPaymentGateways(params.to))
          } else {
            dispatch(listPaymentGateways("USD"))
          }
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        } else {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};

export const getContractToPay = contractReference => {
  return async dispatch => {
    setTimeout(function() {
      // Get Contract to Pay
      const TYPE = types.GET_CONTRACT_TO_PAY_REQUEST;
      const FINAL_PATH = "custom-endpoints/contracts/contract-to-pay/" + contractReference;
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
              if (res.data.data.status >= 6) {
                history._pushRoute(
                    ROUTING_PATHS.CONTRACT_CREATED.replace(
                        ":contract_reference",
                        res.data.data.reference
                    )
                );
              } else {
                handleApiResponseSuccess(dispatch, TYPE, res);
                // Other actions
                dispatch({type: `${TYPE}_COMPLETED`, payload: res});
              }
            }
          })
          .catch(err => {
            // history._pushRoute(ROUTING_PATHS.HOME_PATH);
            handleApiErrors(dispatch, TYPE, err);
          });
    }, 1000);
  };
};
