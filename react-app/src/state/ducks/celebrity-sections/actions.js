import * as TYPES from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess
} from "../../utils";
import * as API_PATHS from "./paths";
import debug from "react-app/src/utils/debug";

export const fetchCelebritySections = (params) => (dispatch) => {
  const TYPE = TYPES.FETCH_CELEBRITIES_SECTIONS;
  const FINAL_PATH = API_PATHS.FETCH_CELEBRITY_SECTIONS;
  dispatch({ type: TYPE });
  return apiService({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    params
  })
    .then((res) => {
      if ("status" in res.data && res.data.status === "ERROR") {
        debug("ERROR fetchCelebritySections", res.data);
        handleApiResponseFailure(dispatch, TYPE, res);
      } else {
        handleApiResponseSuccess(dispatch, TYPE, res);
        dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
      }
    })
    .catch((err) => {
      debug("ERROR fetchCelebritySection", err);

      handleApiErrors(dispatch, TYPE, err);
    });
};

export const setPlayingVideo = (videoKey) => ({
  type: TYPES.PLAY_VIDEO,
  payload: videoKey
});
