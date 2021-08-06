import * as TYPES from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess,
} from "../../utils";
import * as API_PATHS from "./paths";
import debug from "react-app/src/utils/debug";
import { swapCelebritiesPositions } from "react-app/src/utils/swapCelebritiesPositionInSection";

export const fetchCelebritySections = (
  params,
  rotationForCelebritiesSections = null
) => (dispatch) => {
  const TYPE = TYPES.FETCH_CELEBRITIES_SECTIONS;
  const FINAL_PATH = API_PATHS.FETCH_CELEBRITY_SECTIONS;
  dispatch({ type: TYPE });
  return apiService({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    params,
  })
    .then((res) => {
      if ("status" in res.data && res.data.status === "ERROR") {
        debug("ERROR fetchCelebritySections", res.data);
        handleApiResponseFailure(dispatch, TYPE, res);
      } else {
        let results = rotationForCelebritiesSections
          ? res.data.results.map((celebritySection) =>
              swapCelebritiesPositions({
                celebritySectionObject: celebritySection,
                rotateAmount: Number(rotationForCelebritiesSections) / 100,
              })
            )
          : res.data.results;
        handleApiResponseSuccess(dispatch, TYPE, {
          ...res,
          data: {
            ...res.data,
            results,
          },
        });
        dispatch({
          type: `${TYPE}_COMPLETED`,
          payload: {
            ...res,
            data: {
              ...res.data,
              results,
            },
          },
        });
      }
    })
    .catch((err) => {
      debug("ERROR fetchCelebritySection", err);

      handleApiErrors(dispatch, TYPE, err);
    });
};

export const setPlayingVideo = (videoKey) => ({
  type: TYPES.PLAY_VIDEO,
  payload: videoKey,
});
export const toggleAudio = () => ({
  type: TYPES.TOGGLE_AUDIO,
});
