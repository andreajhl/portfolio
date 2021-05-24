import * as TYPES from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess,
} from "../../utils";
import * as API_PATHS from "./paths";
import debug from "react-app/src/utils/debug";

export const fetchLandings = (params) => (dispatch) => {
  const TYPE = TYPES.FETCH_LANDINGS;
  const FINAL_PATH = API_PATHS.FETCH_LANDINGS;
  dispatch({ type: TYPE });
  return apiService({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    params,
  })
    .then((res) => {
      if ("status" in res.data && res.data.status === "ERROR") {
        debug("ERROR fetchLandings", res.data);
        handleApiResponseFailure(dispatch, TYPE, res);
      } else {
        handleApiResponseSuccess(dispatch, TYPE, res);
        dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
      }
    })
    .catch((err) => {
      debug("ERROR fetchLandings", err);
      handleApiErrors(dispatch, TYPE, err);
    });
};
