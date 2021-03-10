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
