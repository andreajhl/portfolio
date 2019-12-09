import * as types from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import * as API_PATHS from './paths';
import {history} from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";

export const listPaymentGateways = (currency) => {
    return dispatch => {
        const TYPE = types.FETCH_PAYMENT_GATEWAYS_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH + "available-payment-gateways/" + currency + "/";
        dispatch({type: TYPE, payload: {}});
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

                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                    dispatch(currencyExchange({from: "USD", to: currency}))
                } else {
                    handleApiResponseFailure(dispatch, TYPE, res);
                    // Other actions

                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const currencyExchange = (params) => {
    return dispatch => {
        const TYPE = types.CURRENCY_EXCHANGE_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH + "currency-exchanges/";
        dispatch({type: TYPE, payload: {}});
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

                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                } else {
                    handleApiResponseFailure(dispatch, TYPE, res);
                    // Other actions

                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const getContractToPay = (contractReference) => {
    return dispatch => {
        const TYPE = types.GET_CONTRACT_TO_PAY_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH + "contract-to-pay/" + contractReference + "/";
        dispatch({type: TYPE, payload: {}});
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
                    // history._pushRoute(ROUTING_PATHS.ROOT_PATH);

                } else {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    // Other actions
                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                }
            })
            .catch(err => {
                // history._pushRoute(ROUTING_PATHS.ROOT_PATH);
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const createContractPayment = (data) => {
    return dispatch => {
        const TYPE = types.CREATE_CONTRACT_PAYMENT_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH + "create-payment/";
        dispatch({type: TYPE, payload: {}});
        apiService({
            method: "POST",
            action: TYPE,
            path: FINAL_PATH,
            async: true,
            params: null,
            body: data
        })
            .then(res => {
                if ("status" in res.data && res.data.status === "ERROR") {
                    handleApiResponseFailure(dispatch, TYPE, res);

                } else {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    // Other actions
                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                }
            })
            .catch(err => {
                // history._pushRoute(ROUTING_PATHS.ROOT_PATH);
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};
