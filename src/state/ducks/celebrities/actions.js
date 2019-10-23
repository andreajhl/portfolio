import * as types from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import * as API_PATHS from './paths';
import {celebritySocialNetworkOperations} from "../celebrity-social-networks";
import {contractReviewOperations} from "../contract-reviews";

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

                    dispatch(celebritySocialNetworkOperations.list({celebrity__id: res.data.id}));
                    dispatch(contractReviewOperations.list({celebrity__id: res.data.id}));
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
    if (!"status" in params) params["status"] = 50;
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
    if (!"status" in params) params["status"] = 50;
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
