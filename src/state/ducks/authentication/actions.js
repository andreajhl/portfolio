import * as types from "./types";
import * as PATHS from "./paths";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess
} from "../../utils";
import { Session } from "../../utils/session";
import { history } from "../../../routing/History";
import * as ROUTE_PATHS from "../../../routing/Paths";
const afterLogin = (res, redirect_path = null, dispatch = null) => {
  if (res.data.token) {
    const session = new Session();
    session.setSession(res.data.token);
    if (localStorage.getItem("redirectPaymentTo")) {
      history._pushRoute(localStorage.getItem("redirectPaymentTo"));
      localStorage.removeItem("redirectPaymentTo");
      localStorage.removeItem("hash");
      return;
    }
    switch (session.getSession().status) {
      // CHANGE PASSWORD REQUIRED
      case 10:
        return history._pushRoute(ROUTE_PATHS.CREATE_PASSWORD_PATH);
      // COMPLETE PROFILE REQUIRED
      case 20:
        return history._pushRoute(ROUTE_PATHS.COMPLETE_PROFILE_PATH);
      // HOME
      default:
        if (redirect_path) {
          return history._pushRoute(redirect_path);
        } else {
          return history._pushRoute(ROUTE_PATHS.ROOT_PATH);
        }
    }
  } else if (redirect_path) {
    history._pushRoute(redirect_path);
  } else {
    history._pushRoute(ROUTE_PATHS.ROOT_PATH);
  }
};

export const signInWithEmail = body => {
  return dispatch => {
    const path = PATHS.SIGN_IN_REQUEST;
    const type = types.SIGN_IN_WITH_EMAIL_REQUEST;
    dispatch({ type: type, payload: {} });
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
          dispatch({ type: `${type}_COMPLETED`, payload: res });
          afterLogin(res, null, dispatch);
        } else {
          handleApiResponseFailure(dispatch, type, res);
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, type, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const changePassword = (body, redirect_path = null) => {
  return dispatch => {
    const path = PATHS.CHANGE_PASSWORD;
    const type = types.CHANGE_PASSWORD_REQUEST;
    dispatch({ type: type, payload: {} });
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
          dispatch({ type: `${type}_COMPLETED`, payload: res });
          afterLogin(res, redirect_path);
        } else {
          handleApiResponseFailure(dispatch, type, res);
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, type, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const createPassword = body => {
  return dispatch => {
    const path = PATHS.CREATE_CLIENT_PASSWORD;
    const type = types.CREATE_PASSWORD_REQUEST;
    dispatch({ type: type, payload: {} });
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
          dispatch({ type: `${type}_COMPLETED`, payload: res });
          afterLogin(res);
        } else {
          handleApiResponseFailure(dispatch, type, res);
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, type, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const sendSMSSecurityCode = body => {
  return dispatch => {
    const path = PATHS.CREATE_ACCOUNT_TO_VALIDATE_BY_SMS;
    const type = types.SEND_SMS_SECURITY_CODE_REQUEST;
    dispatch({ type: type, payload: {} });
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
          dispatch({ type: `${type}_COMPLETED`, payload: res });
          afterLogin(
            res,
            ROUTE_PATHS.VALIDATE_SECURITY_CODE.replace(
              ":form",
              "cellphone-form",
              dispatch
            )
          );
        } else {
          handleApiResponseFailure(dispatch, type, res);
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, type, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const validateSMSSecurityCode = body => {
  return dispatch => {
    const path = PATHS.VALIDATE_SMS_SECURITY_CODE;
    const type = types.VALIDATE_SMS_SECURITY_CODE_REQUEST;
    dispatch({ type: type, payload: {} });
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
          dispatch({ type: `${type}_COMPLETED`, payload: res });
          afterLogin(res);
        } else {
          handleApiResponseFailure(dispatch, type, res);
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, type, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const sendEmailSecurityCode = body => {
  return dispatch => {
    const path = PATHS.CREATE_ACCOUNT_TO_VALIDATE_BY_EMAIL;
    const type = types.SEND_EMAIL_SECURITY_CODE_REQUEST;
    dispatch({ type: type, payload: {} });
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
          dispatch({ type: `${type}_COMPLETED`, payload: res });
        } else {
          handleApiResponseFailure(dispatch, type, res);
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, type, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const validateEmailSecurityCode = (body, redirect_path = null) => {
  return dispatch => {
    const path = PATHS.VALIDATE_EMAIL_SECURITY_CODE;
    const type = types.VALIDATE_EMAIL_SECURITY_CODE_REQUEST;
    dispatch({ type: type, payload: {} });
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
          dispatch({ type: `${type}_COMPLETED`, payload: res });
          afterLogin(res, redirect_path);
        } else {
          handleApiResponseFailure(dispatch, type, res);
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, type, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const validateIfEmailIsRegistered = body => {
  return dispatch => {
    const path = PATHS.VALIDATE_IF_EMAIL_IS_REGISTERED;
    const type = types.VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST;
    dispatch({ type: type, payload: {} });
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
          dispatch({ type: `${type}_COMPLETED`, payload: res });
          if (res.data.data.emailIsRegistered) {
            afterLogin(
              res,
              ROUTE_PATHS.SIGN_IN_WITH_SPECIFIC_FORM_PATH.replace(
                ":form",
                "email-form"
              ) +
                "?email=" +
                res.data.data.email
            );
          } else {
            dispatch(sendEmailSecurityCode(res.data.data));
            afterLogin(
              res,
              ROUTE_PATHS.VALIDATE_SECURITY_CODE.replace(":form", "email-form")
            );
          }
        } else {
          handleApiResponseFailure(dispatch, type, res);
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, type, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const completeProfile = body => {
  return dispatch => {
    const path = PATHS.COMPLETE_PROFILE;
    const type = types.COMPLETE_PROFILE_REQUEST;
    dispatch({ type: type, payload: {} });
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
          dispatch({ type: `${type}_COMPLETED`, payload: res });
          afterLogin(res);
        } else {
          handleApiResponseFailure(dispatch, type, res);
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, type, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const resetPassword = body => {
  return dispatch => {
    const path = PATHS.RESET_PASSWORD;
    const type = types.RESET_PASSWORD_REQUEST;
    dispatch({ type: type, payload: {} });
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
          dispatch({ type: `${type}_COMPLETED`, payload: res });
        } else {
          handleApiResponseFailure(dispatch, type, res);
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, type, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};
