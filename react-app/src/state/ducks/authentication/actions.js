import * as types from "./types";
import * as PATHS from "./paths";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import {Session} from "../../utils/session";
import {history} from "../../../routing/History";
import * as ROUTE_PATHS from "../../../routing/Paths";

const afterLogin = (res) => {
    const session = new Session();
    if(res.data.token){
        session.setSession(res.data.token);
    }
    const authRedirect = localStorage.getItem("authRedirect");
    const finalRedirect = localStorage.getItem("finalRedirect");
    if (authRedirect !== null) {
        localStorage.removeItem("authRedirect");
        return history._pushRoute(authRedirect);
    } else if (finalRedirect !== null) {
        switch (session.getSession().status) {
            // CHANGE PASSWORD REQUIRED
            case 10:
                return history._pushRoute(ROUTE_PATHS.CREATE_PASSWORD_PATH);
            // COMPLETE PROFILE REQUIRED
            case 20:
                return history._pushRoute(ROUTE_PATHS.COMPLETE_PROFILE_PATH);
            // FINAL REDIRECT
            default:
                localStorage.removeItem("finalRedirect");
                return history._pushRoute(finalRedirect);
        }
    } else {
        return history._pushRoute(ROUTE_PATHS.HOME_PATH);
    }
};

export const signInWithEmail = body => {
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
                    afterLogin(res);
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(error => {
                handleApiErrors(dispatch, type, error);
            });
    };
};

export const changePassword = (body) => {
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
                    afterLogin(res);
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, err);
            });
    };
};

export const createPassword = body => {
    return dispatch => {
        const path = PATHS.CREATE_CLIENT_PASSWORD;
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
                    afterLogin(res);
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, err);
            });
    };
};

export const sendSMSSecurityCode = body => {
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
                    localStorage.setItem("authRedirect", ROUTE_PATHS.VALIDATE_SECURITY_CODE.replace(
                        ":form",
                        "cellphone-form",
                    ));
                    afterLogin(res);
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, err);
            });
    };
};

export const validateSMSSecurityCode = body => {
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
                    afterLogin(res);
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, err);
            });
    };
};

export const sendEmailSecurityCode = body => {
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
                handleApiErrors(dispatch, type, err);
            });
    };
};

export const validateEmailSecurityCode = (body) => {
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
                    localStorage.setItem("authRedirect", ROUTE_PATHS.CREATE_PASSWORD_PATH);
                    afterLogin(res);
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, err);
            });
    };
};

export const validateIfEmailIsRegistered = body => {
    return dispatch => {
        const path = PATHS.VALIDATE_IF_EMAIL_IS_REGISTERED;
        const type = types.VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST;
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
                    if (res.data.data["emailIsRegistered"] === true) {
                        localStorage.setItem("authRedirect", ROUTE_PATHS.SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(
                            ":form",
                            "email-form"
                            ) +
                            "?email=" +
                            res.data.data.email);
                        afterLogin(res);
                    } else {
                        dispatch(sendEmailSecurityCode(res.data.data));
                        localStorage.setItem("authRedirect", ROUTE_PATHS.VALIDATE_SECURITY_CODE.replace(":form", "email-form"));
                        afterLogin(res);
                    }
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, err);
            });
    };
};

export const completeProfile = body => {
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
                    afterLogin(res);
                } else {
                    handleApiResponseFailure(dispatch, type, res);
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, type, err);
            });
    };
};

export const resetPassword = body => {
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
                handleApiErrors(dispatch, type, err);
            });
    };
};

export const newsletterSubscrition = email => {
    apiService({
        action: "type",
        async: true,
        path: PATHS.NEWSLETTER_SUBSCRIPTION + "/" + email,
        method: "GET",
    })
        .then(res => {

        })
        .catch(err => {

        });
};
