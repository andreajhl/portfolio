import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess
} from "../../utils";
import * as API_PATHS from "./paths";
import * as types from "./types";

export const subscribeToEmailNotifications = (celebrity_id) => {
  const FINAL_PATH = API_PATHS.SUBSCRIBE_CELEBRITY_ALARM;
  const data = {
    celebrityId: celebrity_id
  };
  return new Promise((resolve, reject) => {
    apiService({
      method: "POST",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: data,
      custom_endpoint: false
    })
      .then((res) => resolve(res))
      .catch((error) => {
        reject(error);
      });
  });
};

export const listUsersSubscriptionsAlarms = () => {
  return (dispatch) => {
    const TYPE = types.GET_USERS_SUBSCRIPTIONS_ALARMS_REQUEST;
    const FINAL_PATH = API_PATHS.LIST_USERS_SUBSCRIPTIONS_ALARMS;
    dispatch({ type: TYPE, payload: {} });
    return apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};
