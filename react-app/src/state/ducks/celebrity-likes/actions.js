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

export const fetchUserCelebrityLikesCleanUp = () => ({
  type: TYPES.FETCH_USER_CELEBRITY_LIKES_CLEAN_UP
});

export const addOrRemoveLike = async (celebrityId) => {
  const TYPE = TYPES.ADD_OR_REMOVE_LIKE;
  const FINAL_PATH = API_PATHS.ADD_OR_REMOVE_LIKE;
  // dispatch({ type: TYPE });
  try {
    const response = await apiService({
      method: "POST",
      action: TYPE,
      path: FINAL_PATH.replace(":celebrity_id", celebrityId)
    });
    if ("status" in response.data && response.data.status === "ERROR") {
      // handleApiResponseFailure(dispatch, TYPE, response);
    } else {
      return response.data;
      // handleApiResponseSuccess(dispatch, TYPE, response);
      // dispatch({ type: `${TYPE}_COMPLETED`, payload: response });
    }
  } catch (error) {
    console.log(error);
    // handleApiErrors(dispatch, TYPE, error);
  }
};

export const fetchUserCelebrityLikesWithOffset = (params) => (dispatch) => {
  const TYPE = TYPES.FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET;
  const FINAL_PATH = API_PATHS.FETCH_USER_CELEBRITY_LIKES_WITH_OFFSET;
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
      console.log(err);
      handleApiErrors(dispatch, TYPE, err);
    });
};
