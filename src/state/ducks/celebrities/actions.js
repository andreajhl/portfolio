import * as types from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import * as API_PATHS from './paths';
import {getTotalColumns} from "../../utils/gridSystem";

export const get = (object_id) => {
    return dispatch => {
        const TYPE = types.GET_CELEBRITY_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH + object_id + "/"; // object_id
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

                    dispatch(listReviews(res.data.id, {page: 1}));
                    dispatch(listPublicContracts(res.data.id, {page: 1}));
                    dispatch(listSimilaties({country__id: res.data.country, category__id: res.data.category.id}));

                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const list = (params) => {
    if (params["status"] === undefined) params["status"] = 50;
    params["page_size"] = getTotalColumns() * 3;
    console.log("params:", params);

    return dispatch => {
        const TYPE = types.FETCH_CELEBRITIES_REQUEST;
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
                    // Other actions

                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const listSimilaties = (params) => {
    if (params["status"] === undefined) params["status"] = 50;
    return dispatch => {
        const TYPE = types.FETCH_SIMILAR_CELEBRITIES_REQUEST;
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
                    // Other actions

                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const listReviews = (celebrity_id, params) => {
    if (params["page_size"] === undefined) params["page_size"] = 6;
    return dispatch => {
        const TYPE = types.FETCH_REVIEWS_REQUEST;
        const FINAL_PATH = API_PATHS.VIEWSETS_PATH + celebrity_id + "/reviews/";
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
                    // Other actions

                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const listPublicContracts = (celebrity_id, params) => {
    if (params["page_size"] === undefined) params["page_size"] = 8;
    return dispatch => {
        const TYPE = types.FETCH_PUBLIC_CONTRACTS_REQUEST;
        const FINAL_PATH = API_PATHS.VIEWSETS_PATH + celebrity_id + "/contracts/";
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
                    // Other actions

                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};
