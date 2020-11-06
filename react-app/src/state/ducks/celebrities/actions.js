import * as types from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess
} from "../../utils";
import * as API_PATHS from "./paths";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";

export const updateQueryParams = (params, applyFetch = true) => {
  console.trace();

  return (dispatch) => {
    dispatch({ type: types.UPDATE_QUERY_PARAMS, payload: { params } });
    if (applyFetch) {
      dispatch(list(params));
    }
  };
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
        console.log("res", res);
        if (!res.data.data.username) {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
          history._pushRoute(
            PATHS.CELEBRITY_PROFILE_ERROR.replace(
              ":celebrity_username",
              object_id
            )
          );
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions
          if (preloaded) {
            dispatch(listReviews(res.data.data.id, { currentPage: 1 }));
            dispatch(listPublicContracts(res.data.data.id, { currentPage: 1 }));
            dispatch(
              listSimilar({
                country_id: res.data.data["countryId"],
                category_id: res.data.data["categoryId"]
              })
            );
          }
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        // Other actions
        history._pushRoute(
          PATHS.CELEBRITY_PROFILE_ERROR.replace(
            ":celebrity_username",
            object_id
          )
        );
        handleApiErrors(dispatch, TYPE, err);
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
        handleApiErrors(dispatch, TYPE, err);
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
        handleApiErrors(dispatch, TYPE, err);
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
        handleApiErrors(dispatch, TYPE, err);
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
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};
