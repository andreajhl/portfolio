import * as types from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import * as API_PATHS from './paths';
import * as ROUTING_PATHS from '../../../routing/Paths';
import {history} from "../../../routing/History";


export const get = (object_id_or_reference) => {
    return dispatch => {
        const TYPE = types.GET_CONTRACT_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH + object_id_or_reference + "/"; // object_id
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
                    console.log("res.data.status:", res.data.status);
                    handleApiResponseFailure(dispatch, TYPE, res);
                    if (res.data.error === "No Client matches the given query.") {
                        history.push(
                            ROUTING_PATHS.ROOT_PATH
                        );
                    }
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

export const list = (params) => {
    return dispatch => {
        const TYPE = types.FETCH_CONTRACTS_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH;
        dispatch({type: TYPE, payload: {}});
        apiService({
            method: "GET",
            action: TYPE,
            path: FINAL_PATH,
            async: true,
            params: params,
            body: null
        })
            .then(res => {
                if (res.data.status === "OK") {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    // Other actions

                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                } else {
                    handleApiResponseFailure(dispatch, TYPE, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const save = (body) => {
    console.log("saving...");
    return dispatch => {
        const TYPE = types.SAVE_CONTRACT_REQUEST;
        const FINAL_PATH = API_PATHS.CREATE_CONTRACT;
        dispatch({type: TYPE, payload: {}});
        apiService({
            method: "POST",
            action: TYPE,
            path: FINAL_PATH,
            async: true,
            params: null,
            body: body
        })
            .then(res => {
                if ("status" in res.data && res.data.status === "ERROR") {
                    handleApiResponseFailure(dispatch, TYPE, res);

                } else {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    // Other actions
                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});

                    history.push(ROUTING_PATHS.CONTRACT_CREATED.replace(":contract_reference", res.data.reference))
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const update = (object_id, body, redirect_path = null) => {
    console.log("updating...");
    return dispatch => {
        const TYPE = types.UPDATE_CONTRACT_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH + object_id + "/"; // object_id
        dispatch({type: TYPE, payload: {}});
        apiService({
            method: "PUT",
            action: TYPE,
            path: FINAL_PATH,
            async: true,
            params: null,
            body: body
        })
            .then(res => {
                if ("status" in res.data && res.data.status === "ERROR") {
                    handleApiResponseFailure(dispatch, TYPE, res);
                } else {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                    if (redirect_path) {
                        history.push(redirect_path);
                    } else {
                        // redirect to..
                    }
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};


export const listMyContracts = (params=null) => {
    return dispatch => {
        const TYPE = types.FETCH_MY_CONTRACTS_REQUEST;
        const FINAL_PATH = API_PATHS.FETCH_MY_CONTRACTS;
        dispatch({type: TYPE, payload: {}});
        apiService({
            method: "GET",
            action: TYPE,
            path: FINAL_PATH,
            async: true,
            params: params,
            body: null
        })
            .then(res => {
                if (res.data.status === "OK") {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    // Other actions

                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                } else {
                    handleApiResponseFailure(dispatch, TYPE, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};
