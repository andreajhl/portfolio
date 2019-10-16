import * as types from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import {Session} from "../../utils/session";

const afterActionRedirect = (dispatch, type, token) => {
    const session = new Session();
    session.setSession(token);
    dispatch({type: `${type}_COMPLETED`, payload: {}});
};


export const login = (path, body) => {
    return dispatch => {
        const type = types.LOGIN_REQUEST;
        dispatch({type: type, payload: {}});
        apiService({
            action: type,
            async: true,
            path: path,
            method: "POST",
            params: null,
            body: body
        })
            .then(res => {
                if (res.data.status === "OK") {
                    handleApiResponseSuccess(dispatch, type, res);
                    afterActionRedirect(dispatch, type, res.data.token)
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const changePassword = (path, body) => {
    return dispatch => {
        const type = types.CHANGE_PASSWORD_REQUEST;
        dispatch({type: type, payload: {}});
        apiService({
            action: type,
            async: true,
            path: path,
            method: "POST",
            params: null,
            body: body
        })
            .then(res => {
                if (res.data.status === "OK") {
                    handleApiResponseSuccess(dispatch, type, res);
                    afterActionRedirect(dispatch, type, res.data.token)
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const verifySecurityCode = (path, body) => {
    return dispatch => {
        const type = types.VERIFY_SECURITY_CODE_REQUEST;
        dispatch({type: type, payload: {}});
        apiService({
            action: type,
            async: true,
            path: path,
            method: "POST",
            params: null,
            body: body
        })
            .then(res => {
                if (res.data.status === "OK") {
                    handleApiResponseSuccess(dispatch, type, res);
                    afterActionRedirect(dispatch, type, res.data.token)
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};


export const resendSecurityCode = (path, body) => {
    return dispatch => {
            const type = types.RESEND_SECURITY_CODE_REQUEST;
        dispatch({type: type, payload: {}});
        apiService({
            action: type,
            async: true,
            path: path,
            method: "GET",
            params: null,
            body: body
        })
            .then(res => {
                if (res.data.status === "OK") {
                    handleApiResponseSuccess(dispatch, type, res);
                    dispatch({type: `${type}_COMPLETED`, payload: res});
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const resetPassword = (path, body) => {
    return dispatch => {
        const type = types.RESET_PASSWORD_REQUEST;
        dispatch({type: type, payload: {}});
        apiService({
            action: type,
            async: true,
            path: path,
            method: "POST",
            params: null,
            body: body
        })
            .then(res => {
                if (res.data.status === "OK") {
                    handleApiResponseSuccess(dispatch, type, res);
                    dispatch({type: `${type}_COMPLETED`, payload: res});
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};