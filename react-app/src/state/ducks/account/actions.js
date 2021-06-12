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
