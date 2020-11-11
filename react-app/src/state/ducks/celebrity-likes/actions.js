import * as TYPES from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess
} from "../../utils";
import * as API_PATHS from "./paths";

export const fetchUserCelebrityLikes = (params) => (dispatch) => {
  const TYPE = TYPES.FETCH_USER_CELEBRITY_LIKES;
  const FINAL_PATH = API_PATHS.FETCH_USER_CELEBRITY_LIKES;
  dispatch({ type: TYPE });
  apiService({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    params
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
