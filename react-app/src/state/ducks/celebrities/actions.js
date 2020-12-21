import * as types from "./types";
import apiService, { jsonToQueryString } from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess
} from "../../utils";
import * as API_PATHS from "./paths";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import { updateQueryParamsInitialState } from "./reducers";

const getValidParams = (params) => {
  const paramsEntries = Object.entries(params);
  const onlyValidParamsEntries = paramsEntries.filter(([key, value]) =>
    Boolean(value)
  );
  return Object.fromEntries(onlyValidParamsEntries);
};

export const updateQueryParams = (params) => (dispatch) => {
  const newParams = getValidParams(params);
  dispatch({
    type: types.UPDATE_QUERY_PARAMS,
    payload: { params: { ...updateQueryParamsInitialState, ...newParams } }
  });
  if (newParams.offset) {
    history.replace(PATHS.SEARCH_PATH + jsonToQueryString(newParams));
  } else {
    const previousPathname = history.location.pathname;
    if (previousPathname !== PATHS.SEARCH_PATH) {
      dispatch({
        type: types.SET_PREVIOUS_PATH,
        payload: previousPathname
      });
    }
    history.push(PATHS.SEARCH_PATH + jsonToQueryString(newParams));
  }
};

export const get = (object_id, preloaded = false) => {
  return (dispatch) => {
    const TYPE = types.GET_CELEBRITY_REQUEST;
    const FINAL_PATH = API_PATHS.GET + object_id;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null
    })
      .then((res) => {
        if (
          ("status" in res.data && res.data.status === "ERROR") ||
          !res.data.data.username
        ) {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
          history._pushRoute(
            PATHS.CELEBRITY_PROFILE_ERROR.replace(
              ":celebrity_username",
              object_id
            )
          );
          // history._pushRoute(PATHS.ROOT_PATH);
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions
          if (preloaded) {
            dispatch(listReviews(res.data.data.id, { currentPage: 1 }));
            dispatch(listPublicContracts(res.data.data.id, { currentPage: 1 }));
            // dispatch(
            //   listSimilar({
            //     country_id: res.data.data.country_id,
            //     category_id: res.data.data.category_id
            //   })
            // );
          }
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        history._pushRoute(
          PATHS.CELEBRITY_PROFILE_ERROR.replace(
            ":celebrity_username",
            object_id
          )
        );
        handleApiErrors(dispatch, TYPE, err);
        // history._pushRoute(PATHS.ROOT_PATH);
        // handleApiErrors(dispatch, TYPE, {
        //   data: { api_error: err, error: "Server 500" }
        // });
      });
  };
};

export const list = (params) => {
  return (dispatch) => {
    const TYPE = types.FETCH_CELEBRITIES_REQUEST;
    const FINAL_PATH = API_PATHS.LIST;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null
    })
      .then((res) => {
        if (res.data.status === "OK") {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions

          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
        // else {
        //     handleApiResponseFailure(dispatch, TYPE, res);
        //     // Other actions
        //
        // }
      })
      .catch((err) => {
        console.log(err);
        // handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
      });
  };
};

export const listSimilar = (params) => {
  return (dispatch) => {
    const TYPE = types.FETCH_SIMILAR_CELEBRITIES_REQUEST;
    const FINAL_PATH = API_PATHS.LIST;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null
    })
      .then((res) => {
        if (res.data.status === "OK") {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions

          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        } else {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const listReviews = (celebrity_id, params = {}) => {
  if (params["pageSize"] === undefined) params["pageSize"] = 6;
  return (dispatch) => {
    const TYPE = types.FETCH_REVIEWS_REQUEST;
    const FINAL_PATH = API_PATHS.REVIEWS + celebrity_id;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null
    })
      .then((res) => {
        if (res.data.status === "OK") {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions

          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        } else {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const listPublicContracts = (celebrity_id, params = {}) => {
  if (params["pageSize"] === undefined) params["pageSize"] = 8;
  return (dispatch) => {
    const TYPE = types.FETCH_PUBLIC_CONTRACTS_REQUEST;
    const FINAL_PATH = API_PATHS.PUBLIC_CONTRACTS + celebrity_id;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null
    })
      .then((res) => {
        if (res.data.status === "OK") {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions

          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        } else {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const fetchSimilarCelebrities = (celebrityUsername) => (dispatch) => {
  const TYPE = types.FETCH_SIMILAR_CELEBRITIES_REQUEST;
  const FINAL_PATH = API_PATHS.SIMILAR_CELEBRITIES + celebrityUsername;
  dispatch({ type: TYPE, payload: {} });
  apiService({
    method: "GET",
    action: TYPE,
    path: FINAL_PATH,
    async: true,
    body: null
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
        data: { api_error: err, error: "Server 500" }
      });
    });
};

export const cleanPublicContracts = () => ({
  type: types.CLEAN_PUBLIC_CONTRACTS
});
