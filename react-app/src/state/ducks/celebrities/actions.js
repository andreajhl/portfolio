import * as types from "./types";
import apiService, { jsonToQueryString } from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess,
} from "../../utils";
import * as API_PATHS from "./paths";
import * as PATHS from "../../../routing/Paths";
import { updateQueryParamsInitialState } from "./reducers";
import thunkAction from "../../utils/thunkAction";
// import * as firestoreService from "../../../firebase/firestoreService";

const firestoreService = { getDocuments() {} };

const getValidParams = (params) => {
  const paramsEntries = Object.entries(params);
  const onlyValidParamsEntries = paramsEntries.filter(([key, value]) =>
    Boolean(value)
  );
  return Object.fromEntries(onlyValidParamsEntries);
};

export const updateQueryParams = (params, router) => (dispatch) => {
  const newParams = getValidParams(params);
  dispatch({
    type: types.UPDATE_QUERY_PARAMS,
    payload: { params: { ...updateQueryParamsInitialState, ...newParams } },
  });
  if (newParams.offset) {
    router.replace(PATHS.SEARCH_PATH + jsonToQueryString(newParams));
  } else {
    const previousPathname = router.pathname;
    if (previousPathname !== PATHS.SEARCH_PATH) {
      dispatch({
        type: types.SET_PREVIOUS_PATH,
        payload: previousPathname,
      });
    }
    router.push(PATHS.SEARCH_PATH + jsonToQueryString(newParams));
  }
};

export const get = (object_id, preloaded = false, v2 = false) => {
  return (dispatch) => {
    const TYPE = types.GET_CELEBRITY_REQUEST;
    const FINAL_PATH =
      API_PATHS.GET.replace(":version", v2 ? "/v2" : "") + object_id;
    dispatch({ type: TYPE, payload: {} });
    return apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
    })
      .then((res) => {
        if (
          ("status" in res.data && res.data.status === "ERROR") ||
          !res.data.data.username
        ) {
          handleApiResponseFailure(dispatch, TYPE, res);
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          if (preloaded) {
            dispatch(listReviews(res.data.data.id, { currentPage: 1 }));
            dispatch(listPublicContracts(res.data.data.id, { currentPage: 1 }));
          }
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};

export const list = (params, mergeResults = true) => {
  return (dispatch, getStore) => {
    getStore().celebrities.fetchCelebritiesReducer?.requestCancel?.();
    const TYPE = types.FETCH_CELEBRITIES_REQUEST;
    const FINAL_PATH = API_PATHS.LIST;
    const request = apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: {
        ...params,
        limit: params.limit || updateQueryParamsInitialState.limit,
      },
      body: null,
      isCancellable: true,
    });
    dispatch({
      type: TYPE,
      payload: { requestCancel: request.cancel, mergeResults },
    });
    request
      .then((res) => {
        if (res.data.status === "OK") {
          handleApiResponseSuccess(dispatch, TYPE, { ...res, mergeResults });
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
        if (err.constructor.name === "Cancel") return;
        console.log(err);
        // handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
      });
    return request;
  };
};

export const saveLastQueryParams = (params) => {
  return (dispatch) => {
    const TYPE = types.SAVE_LAST_QUERY_PARAMS;
    dispatch({
      type: TYPE,
      payload: params,
    });
  };
};

export const fetchSimilarResults = (params) => {
  return (dispatch, getStore) => {
    getStore().celebrities.fetchCelebritiesReducer?.requestCancel?.();
    const TYPE = types.FETCH_CELEBRITIES_SIMILAR_RESULTS_REQUEST;
    const FINAL_PATH = API_PATHS.SUGGESTED_PUBLIC_LIST;
    const request = apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: {
        ...params,
        limit: params.limit || updateQueryParamsInitialState.limit,
      },
      body: null,
      isCancellable: true,
    });
    dispatch({ type: TYPE, payload: { requestCancel: request.cancel } });
    request
      .then((res) => {
        if (res.data.status === "OK") {
          handleApiResponseSuccess(dispatch, TYPE, res);
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        if (err.constructor.name === "Cancel") return;
        console.log(err);
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
      body: null,
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
          data: { api_error: err, error: "Server 500" },
        });
      });
  };
};

export const listReviews = (
  celebrity_id,
  params = {},
  mergeResults = false
) => {
  if (params["pageSize"] === undefined) params["pageSize"] = 6;
  return (dispatch) => {
    const TYPE = types.FETCH_REVIEWS_REQUEST;
    const FINAL_PATH = API_PATHS.REVIEWS + celebrity_id;
    dispatch({ type: TYPE, payload: {} });
    return apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null,
    })
      .then((res) => {
        if (res.data.status === "OK") {
          const payload = { data: res.data, mergeResults };
          handleApiResponseSuccess(dispatch, TYPE, payload);
          // Other actions

          dispatch({ type: `${TYPE}_COMPLETED`, payload });
        } else {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" },
        });
      });
  };
};

const getListReviewsParams = (params) =>
  Object.assign(params, { pageSize: params.pageSize || 6 });

export const listReviewsV2 = (
  celebrityUsername,
  params = {},
  mergeResults = false
) =>
  thunkAction(types.FETCH_REVIEWS_REQUEST, () =>
    apiService({
      method: "GET",
      path: API_PATHS.REVIEWS_V2 + celebrityUsername,
      params: getListReviewsParams(params),
    }).then(({ data }) => ({
      data,
      mergeResults,
    }))
  );

export const listPublicContracts = (celebrity_id, params = {}) => {
  if (params["pageSize"] === undefined) params["pageSize"] = 8;
  return (dispatch) => {
    const TYPE = types.FETCH_PUBLIC_CONTRACTS_REQUEST;
    const FINAL_PATH = API_PATHS.PUBLIC_CONTRACTS + celebrity_id;
    dispatch({ type: TYPE, payload: {} });
    return apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null,
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
          data: { api_error: err, error: "Server 500" },
        });
      });
  };
};

export const listPublicContractsV2 = (celebrityUsername) =>
  thunkAction(types.FETCH_PUBLIC_CONTRACTS_REQUEST, () =>
    apiService({
      method: "GET",
      path: API_PATHS.PUBLIC_CONTRACTS_V2 + celebrityUsername,
    })
  );

export const fetchSimilarCelebrities = (celebrityUsername) => (dispatch) => {
  const TYPE = types.FETCH_SIMILAR_CELEBRITIES_REQUEST;
  const FINAL_PATH = API_PATHS.SIMILAR_CELEBRITIES + celebrityUsername;
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

export const cleanPublicContracts = () => ({
  type: types.CLEAN_PUBLIC_CONTRACTS,
});

export const fetchFlashDeliveryCelebrities = () => async (dispatch) => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  const TYPE = types.FETCH_FLASH_DELIVERY_CELEBRITIES_REQUEST;
  const FINAL_PATH = `${API_PATHS.FLASH_DELIVERY_CELEBRITIES}${
    environment === "development" ? "_testing" : ""
  }`;
  dispatch({ type: TYPE, payload: {} });
  try {
    const docs = await firestoreService.getDocuments(FINAL_PATH);
    dispatch({ type: `${TYPE}_SUCCESS`, payload: docs });
  } catch (error) {
    dispatch({ type: `${TYPE}_FAILURE`, payload: error });
  } finally {
    dispatch({ type: `${TYPE}_COMPLETED`, payload: {} });
  }
};

export const fetchCelebritySubscriptionPlans = (celebrityUsername) => (
  dispatch
) => {
  const TYPE = types.FETCH_CELEBRITY_SUBSCRIPTION_PLANS_REQUEST;
  const FINAL_PATH = API_PATHS.CELEBRITY_SUBSCRIPTION_PLANS.replace(
    ":celebrity_username",
    celebrityUsername
  );
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

export const setCelebrityProfileVersion = (payload) => ({
  type: types.SET_CELEBRITY_PROFILE_VERSION,
  payload,
});
