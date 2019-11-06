import * as TYPES from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import * as API_PATHS from './paths';
import * as ROUTING_PATHS from '../../../routing/Paths';
import {history} from "../../../routing/History";


export const saveClientContract = (contractData) => {
    return dispatch => {
        const TYPE = TYPES.SAVE_CLIENT_CONTRACT_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH;
        dispatch({type: TYPE, payload: {}});
        apiService({
            method: "POST",
            action: TYPE,
            path: FINAL_PATH,
            async: true,
            params: null,
            body: contractData
        })
            .then(res => {
                if ("status" in res.data && res.data.status === "ERROR") {
                    handleApiResponseFailure(dispatch, TYPE, res);
                    // Other actions

                } else {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                    // Other actions
                    history._pushRoute(ROUTING_PATHS.CONTRACT_CREATED.replace(":contract_reference", res.data.reference));
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const listClientContracts = () => {
    return dispatch => {
        const TYPE = TYPES.LIST_CLIENT_CONTRACTS_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH;
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
                } else {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    // Other actions
                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const getClientContract = (contractID) => {
    return dispatch => {
        const TYPE = TYPES.GET_CLIENT_CONTRACT_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH + contractID + "/";
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
                    history._pushRoute(ROUTING_PATHS.CLIENT_HIRINGS);

                } else {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    // Other actions
                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const saveClientContractReview = (contractID, reviewData) => {
    return dispatch => {
        const TYPE = TYPES.SAVE_CLIENT_CONTRACT_REVIEW_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH + contractID + "/reviews/";
        dispatch({type: TYPE, payload: {}});
        apiService({
            method: "POST",
            action: TYPE,
            path: FINAL_PATH,
            async: true,
            params: null,
            body: reviewData
        })
            .then(res => {
                if ("status" in res.data && res.data.status === "ERROR") {
                    handleApiResponseFailure(dispatch, TYPE, res);
                    // Other actions

                } else {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    // Other actions
                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const listClientContractReviews = (contractID) => {
    return dispatch => {
        const TYPE = TYPES.LIST_CLIENT_CONTRACT_REVIEWS_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH + contractID + "/reviews/";
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
                } else {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    // Other actions
                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};
