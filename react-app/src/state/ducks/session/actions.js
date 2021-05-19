import * as types from "./types";
import * as PATHS from "./paths";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess,
} from "../../utils";

export const getToken = () => {
  return (dispatch) => {
    const path = PATHS.GET_SESSION;
    const type = types.GET_SESSION_REQUEST;
    dispatch({ type: type, payload: {} });
    apiService({
      action: type,
      async: true,
      path: path,
      method: "GET",
      params: null,
      body: null,
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, type, res);
        } else {
          handleApiResponseSuccess(dispatch, type, res);
          // Other actions

          dispatch({ type: `${type}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, type, err);
      });
  };
};

export const updateSession = (body) => {
  return (dispatch) => {
    const path = PATHS.UPDATE_SESSION;
    const type = types.UPDATE_SESSION_REQUEST;
    dispatch({ type: type, payload: {} });
    apiService({
      action: type,
      async: true,
      path: path,
      method: "PUT",
      params: null,
      body: body,
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, type, res);
        } else {
          handleApiResponseSuccess(dispatch, type, res);
          // Other actions

          dispatch({ type: `${type}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, type, err);
      });
  };
};

export const updateNotificationsLang = (body) => {
  const FINAL_PATH = "custom-endpoints/users/update-app-lang";
  return new Promise((resolve, reject) => {
    apiService({
      method: "PUT",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: body,
      custom_endpoint: false,
    })
      .then(resolve)
      .catch((error) => {
        reject(error);
      });
  });
};
