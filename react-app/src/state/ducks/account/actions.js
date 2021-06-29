import * as TYPES from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess,
} from "../../utils";
import * as API_PATHS from "./paths";

export const fetchUserFavoritesCelebrities = (params) => (dispatch) => {
  const TYPE = TYPES.FETCH_USER_FAVORITES_CELEBRITIES;
  const FINAL_PATH = API_PATHS.FETCH_USER_FAVORITES_CELEBRITIES_PATH;
  dispatch({ type: TYPE });
  apiService({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    params,
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
      console.log(err);
      handleApiErrors(dispatch, TYPE, err);
    });
};

export const fetchUserFavoritesContracts = (params) => (dispatch) => {
  const TYPE = TYPES.FETCH_USER_FAVORITES_CONTRACTS;
  const FINAL_PATH = API_PATHS.FETCH_USER_FAVORITES_CONTRACTS_PATH;
  dispatch({ type: TYPE });
  apiService({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    params,
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
      console.log(err);
      handleApiErrors(dispatch, TYPE, err);
    });
};

export const toggleContractLike = (contract_reference) => {
  const FINAL_PATH = API_PATHS.SAVE_USER_LIKE_CONTRACT_PATH;
  return new Promise((resolutionFunc, rejectionFunc) => {
    apiService({
      method: "POST",
      path: FINAL_PATH + contract_reference,
      async: true,
    })
      .then((res) => {
        if (res.data.status === "OK") {
          resolutionFunc(res.data.data);
        } else {
          rejectionFunc(res.data.error);
        }
      })
      .catch((err) => {
        rejectionFunc(err);
      });
  });
};

export const updateUserGender = (newGender) => {
  const FINAL_PATH = API_PATHS.UPDATE_USER_GENDER_PATH;
  return new Promise((resolutionFunc, rejectionFunc) => {
    apiService({
      method: "POST",
      path: FINAL_PATH,
      async: true,
      body: {
        gender: newGender,
      },
    })
      .then((res) => {
        if (res.data.status === "OK") {
          resolutionFunc(res.data.data);
        } else {
          rejectionFunc(res.data.error);
        }
      })
      .catch((err) => {
        rejectionFunc(err);
      });
  });
};
export const updateUserBirthdayDate = (newBirthdayDate) => {
  const FINAL_PATH = API_PATHS.UPDATE_USER_BIRTHDAY_DATE_PATH;
  return new Promise((resolutionFunc, rejectionFunc) => {
    apiService({
      method: "POST",
      path: FINAL_PATH,
      async: true,
      body: {
        BirthdayDate: newBirthdayDate,
      },
    })
      .then((res) => {
        if (res.data.status === "OK") {
          resolutionFunc(res.data.data);
        } else {
          rejectionFunc(res.data.error);
        }
      })
      .catch((err) => {
        rejectionFunc(err);
      });
  });
};

export const fetchUserLikesContractsWithReference = (params) => (dispatch) => {
  const TYPE = TYPES.FETCH_USER_LIKES_CONTRACTS_WITH_REFERENCE;
  const FINAL_PATH = API_PATHS.FETCH_USER_LIKES_CONTRACTS_REFERENCES_PATH;
  dispatch({ type: TYPE });
  apiService({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    params,
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

export const toggleContractLikeFromList = (contract_reference) => ({
  type: TYPES.TOGGLE_CONTRACT_LIKE_FROM_LIST,
  payload: contract_reference,
});
