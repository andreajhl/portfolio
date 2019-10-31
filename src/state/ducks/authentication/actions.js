import * as types from "./types";
import * as PATHS from "./paths";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import {Session} from "../../utils/session";
import {history} from "../../../routing/History";
import * as ROUTE_PATHS from "../../../routing/Paths";

const afterLogin = (res, redirect_path = null) => {
    const session = new Session();
    if(res.data.token) {
        session.setSession(res.data.token);
    }
    if (redirect_path) {
        history.push(redirect_path)
    } else if (session.getSession().client_data.status === 10) {
        history.push(ROUTE_PATHS.COMPLETE_PROFILE_PATH)
    } else {
        history.push(ROUTE_PATHS.ROOT_PATH)
    }
};

export const signInWithEmail = (body) => {
    return dispatch => {
        const path = PATHS.SIGN_IN_REQUEST;
        const type = types.SIGN_IN_WITH_EMAIL_REQUEST;
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
                    afterLogin(res)
                    dispatch(getSession())
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const changePassword = (body, redirect_path=null) => {
    return dispatch => {
        const path = PATHS.CHANGE_PASSWORD;
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
                    dispatch({type: `${type}_COMPLETED`, payload: res});
                    afterLogin(res, redirect_path)
                    dispatch(getSession())
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const createPassword = (body, redirect_path=null) => {
    return dispatch => {
        const path = PATHS.CREATE_PASSWORD;
        const type = types.CREATE_PASSWORD_REQUEST;
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
                if (res.data.status === "OK") {
                    handleApiResponseSuccess(dispatch, type, res);
                    dispatch({type: `${type}_COMPLETED`, payload: res});
                    afterLogin(res, redirect_path)
                    dispatch(getSession())
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const sendSMSSecurityCode = (body) => {
    return dispatch => {
        const path = PATHS.CREATE_ACCOUNT_TO_VALIDATE_BY_SMS;
        const type = types.SEND_SMS_SECURITY_CODE_REQUEST;
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

export const validateSMSSecurityCode = (body) => {
    return dispatch => {
        const path = PATHS.VALIDATE_SMS_SECURITY_CODE;
        const type = types.VALIDATE_SMS_SECURITY_CODE_REQUEST;
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
                    afterLogin(res)
                    dispatch(getSession())
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const sendEmailSecurityCode = (body) => {
    return dispatch => {
        const path = PATHS.CREATE_ACCOUNT_TO_VALIDATE_BY_EMAIL;
        const type = types.SEND_EMAIL_SECURITY_CODE_REQUEST;
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

export const validateEmailSecurityCode = (body, redirect_path=null) => {
    return dispatch => {
        const path = PATHS.VALIDATE_EMAIL_SECURITY_CODE;
        const type = types.VALIDATE_EMAIL_SECURITY_CODE_REQUEST;
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
                    afterLogin(res, redirect_path)
                    dispatch(getSession())
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const completeProfile = (body) => {
    return dispatch => {
        const path = PATHS.COMPLETE_PROFILE;
        const type = types.COMPLETE_PROFILE_REQUEST;
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
                if (res.data.status === "OK") {
                    handleApiResponseSuccess(dispatch, type, res);
                    dispatch({type: `${type}_COMPLETED`, payload: res});
                    afterLogin(res, ROUTE_PATHS.ROOT_PATH)
                    dispatch(getSession())
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, {data: {api_error: err, error: "Server 500"}})
            });
    }
};

export const resetPassword = (body) => {
    return dispatch => {
        const path = PATHS.RESET_PASSWORD;
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

export const getSession = () => {
    return dispatch => {
        const path = PATHS.CLIENT_SESSION;
        const type = types.SESSION_REQUEST;
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
