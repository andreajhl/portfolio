import * as types from "./types";
import * as PATHS from "./paths";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess,
} from "../../utils";
import thunkAction from "../../utils/thunkAction";
import objectFromEntries from "lib/utils/objectFromEntries";

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

export const getUserAccountDetails = () => {
  return (dispatch) => {
    const path = PATHS.MY_ACCOUNT_PROFILE;
    const type = types.GET_USER_ACCOUNT_DETAILS;
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

export const getUploadProfileImageLink = (fileExtension) =>
  apiService({
    method: "POST",
    body: { fileExtension },
    path: PATHS.GET_UPLOAD_PROFILE_IMAGE_LINK,
  }).then((response) => {
    if (response.data.status !== "OK") {
      throw new Error(
        response.data.error ||
          "There was an error uploading the profile picture"
      );
    }
    return response.data.data;
  });

export const updateUserAvatar = (avatarUrl) =>
  apiService({
    method: "POST",
    path: PATHS.UPDATE_USER_AVATAR,
    body: { avatar: avatarUrl },
  })
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error(
          response.data.error || "There was an error updating the user avatar"
        );
      }
      return response.data.data;
    })
    .catch((error) => {
      if (error?.response?.data?.error) {
        throw new Error(error?.response?.data?.error);
      }
      throw error;
    });

const getUserContractData = (response) => ({
  data: {
    ...response.data,
    data: { ...response.data.data, ...response.data.data.contractData },
  },
});

export const getUserContract = (contractReference) =>
  thunkAction(types.GET_USER_CONTRACT_REQUEST, () =>
    apiService({
      method: "GET",
      path: PATHS.GET_USER_CONTRACT + contractReference,
    }).then(getUserContractData)
  );

const getReceiptUrlsData = (response) => {
  const entriesFromResults = response?.data?.results?.map?.(
    ({ contractId, url }) => [contractId, { url }]
  );

  return {
    data: {
      ...response.data,
      results: objectFromEntries(entriesFromResults),
    },
  };
};

export const getReceiptsUrls = () =>
  thunkAction(types.GET_RECEIPTS_URLS, () =>
    apiService({
      method: "GET",
      path: PATHS.GET_RECEIPTS_URLS,
    }).then(getReceiptUrlsData)
  );
