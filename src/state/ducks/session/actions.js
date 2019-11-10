import * as types from "./types";
import * as PATHS from "./paths";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";

export const getSession = () => {
    return dispatch => {
        const path = PATHS.GET_SESSION;
        const type = types.GET_SESSION_REQUEST;
        dispatch({type: type, payload: {}});
        apiService({
            action: type,
            async: true,
            path: path,
            method: "GET",
            params: null,
            body: null
        })
            .then(res => {
                if ("status" in res.data && res.data.status === "ERROR") {
                    handleApiResponseFailure(dispatch, type, res);

                } else {
                    handleApiResponseSuccess(dispatch, type, res);
                    // Other actions

                    dispatch({type: `${type}_COMPLETED`, payload: res});
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const updateSession = (body) => {
    return dispatch => {
        const path = PATHS.UPDATE_SESSION;
        const type = types.UPDATE_SESSION_REQUEST;
        dispatch({type: type, payload: {}});
        apiService({
            action: type,
            async: true,
            path: path,
            method: "PUT",
            params: null,
            body: body
        })
            .then(res => {
                if ("status" in res.data && res.data.status === "ERROR") {
                    console.log("res.data.status:", res.data.status);
                    handleApiResponseFailure(dispatch, type, res);

                } else {
                    handleApiResponseSuccess(dispatch, type, res);
                    // Other actions

                    dispatch({type: `${type}_COMPLETED`, payload: res});
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};
