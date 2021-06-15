import * as TYPES from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess,
} from "../../utils";
import * as API_PATHS from "./paths";

export const fetchCommentHiring = (contract_reference) => (dispatch) => {
  const TYPE = TYPES.FETCH_COMMENT_HIRING;
  const FINAL_PATH = API_PATHS.FETCH_COMMENT_HIRING_PATH;
  dispatch({ type: TYPE });
  apiService({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH + contract_reference,
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

export const fetchStatusContractLike = (contract_reference) => {
  const FINAL_PATH = API_PATHS.FETCH_STATUS_CONTRACT_LIKE;
  return new Promise((resolutionFunc, rejectionFunc) => {
    apiService({
      method: "GET",
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
