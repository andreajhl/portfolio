import * as types from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess,
} from "../../utils";
import * as API_PATHS from "./paths";
import thunkAction from "../../utils/thunkAction";

export const postProcessSubscription = (subscription_data) => {
  const TYPE = types.PROCESS_SUBSCRIPTION_REQUEST;
  const FINAL_PATH = API_PATHS.PROCESS_SUBSCRIPTION_PATH;
  return new Promise((resolutionFunc, rejectionFunc) => {
    apiService({
      method: "POST",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      body: subscription_data,
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

export const fetchUserSubscriptionsList = (user_data) => (dispatch) => {
  const TYPE = types.FETCH_USER_SUBSCRIPTIONS_REQUEST;
  const FINAL_PATH = API_PATHS.USER_SUBSCRIPTIONS_PATH;
  dispatch({ type: TYPE, payload: {} });
  apiService({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    async: true,
    body: null,
  })
    .then((res) => {
      if (res.data.status === "OK") {
        handleApiResponseSuccess(dispatch, TYPE, res);
        dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
      } else {
        handleApiResponseFailure(dispatch, TYPE, res);
      }
    })
    .catch((err) => {
      handleApiErrors(dispatch, TYPE, {
        data: { api_error: err, error: "Server 500" },
      });
    });
};

const defaultListSubscriptionPostsParams = {
  celebrityId: "",
  offset: 0,
  limit: 2,
};

// This endpoint should go to /celebrity-subscription-post.
export const listSubscriptionPosts = (
  params = defaultListSubscriptionPostsParams
) =>
  thunkAction(types.LIST_SUBSCRIPTION_POSTS_REQUEST, () =>
    apiService({
      method: "GET",
      path: API_PATHS.LIST_SUBSCRIPTION_POSTS_PATH,
      params,
    })
  );

export const publicListSubscriptionPosts = (
  params = defaultListSubscriptionPostsParams
) =>
  thunkAction(types.PUBLIC_LIST_SUBSCRIPTION_POSTS_REQUEST, () =>
    apiService({
      method: "GET",
      path: API_PATHS.PUBLIC_LIST_SUBSCRIPTION_POSTS_PATH,
      params,
    })
  );

export const setCurrentCelebrity = (currentCelebrity) => ({
  type: types.SET_CURRENT_CELEBRITY,
  payload: currentCelebrity,
});
