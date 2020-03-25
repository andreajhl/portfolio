import * as types from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import * as API_PATHS from './paths';
import {history} from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";


export const updateQueryParams = (params: {}, applyFetch=true) => {
    return dispatch => {
        dispatch({type: types.UPDATE_QUERY_PARAMS, payload: {params}});
        if(applyFetch){
            dispatch(list(params))
        }
    }
};

export const get = (object_id) => {
    return dispatch => {
        const TYPE = types.GET_CELEBRITY_REQUEST;
        const FINAL_PATH = API_PATHS.GET + object_id;
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
                    history._pushRoute(PATHS.ROOT_PATH);

                } else {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    // Other actions

                    dispatch(listReviews(res.data.id, {page: 1}));
                    dispatch(listPublicContracts(res.data.id, {page: 1}));
                    dispatch(listSimilar( {
                        country__code: res.data.country_code,
                        category__title: res.data.category
                    }));

                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                }
            })
            .catch(err => {
                history._pushRoute(PATHS.ROOT_PATH);
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const list = (params) => {
    return dispatch => {
        const TYPE = types.FETCH_CELEBRITIES_REQUEST;
        const FINAL_PATH = API_PATHS.LIST;
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

export const listSimilar = (params) => {
    return dispatch => {
        const TYPE = types.FETCH_SIMILAR_CELEBRITIES_REQUEST;
        const FINAL_PATH = API_PATHS.LIST;
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

export const listReviews = (celebrity_id, params={}) => {
    if (params["page_size"] === undefined) params["page_size"] = 6;
    return dispatch => {
        const TYPE = types.FETCH_REVIEWS_REQUEST;
        const FINAL_PATH = API_PATHS.REVIEWS;
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

export const listPublicContracts = (celebrity_id, params={}) => {
    if (params["page_size"] === undefined) params["page_size"] = 8;
    return dispatch => {
        const TYPE = types.FETCH_PUBLIC_CONTRACTS_REQUEST;
        const FINAL_PATH = API_PATHS.PUBLIC_CONTRACTS.replace(":celebrity_username", celebrity_id);
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
