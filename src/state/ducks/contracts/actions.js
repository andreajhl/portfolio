import * as TYPES from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess
} from "../../utils";
import * as API_PATHS from "./paths";
import * as ROUTING_PATHS from "../../../routing/Paths";
import { history } from "../../../routing/History";
import * as types from "../celebrities/types";
import { Session } from "../../utils/session";

export const updateQueryParams = (params: {}, applyFetch = true) => {
  return dispatch => {
    dispatch({ type: types.UPDATE_QUERY_PARAMS, payload: { params } });
    if (applyFetch) {
      dispatch(listTrending(params));
    }
  };
};

export const playVideo = (params: {}) => {
  return dispatch => {
    dispatch({ type: types.PLAY_VIDEO, payload: { params } });
  };
};

export const AssociateContract = hash => {
  return dispatch => {
    const FINAL_PATH =
      API_PATHS.CONTRACT_BASE_PATH + "associate-contract/" + hash + "/";
    apiService({
      method: "GET",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null
    })
      .then(res => {
        if ("status" in res.data && res.data.status === "ERROR") {
          // Other actions
          localStorage.removeItem("redirectPaymentTo");
          localStorage.removeItem("hash");
          history._pushRoute(ROUTING_PATHS.ROOT_PATH);
        } else {
          // Other actions
          localStorage.removeItem("redirectPaymentTo");
          localStorage.removeItem("hash");
        }
      })
      .catch(err => {
        history._pushRoute(ROUTING_PATHS.ROOT_PATH);
      });
  };
};

export const getContract = contractReference => {
  return dispatch => {
    const TYPE = TYPES.GET_CONTRACT_REQUEST;
    const FINAL_PATH = API_PATHS.CONTRACT_BASE_PATH + contractReference + "/";
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null
    })
      .then(res => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
          history._pushRoute(ROUTING_PATHS.ROOT_PATH);
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch(err => {
        history._pushRoute(ROUTING_PATHS.ROOT_PATH);
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const getContractWithPayments = contractReference => {
  return dispatch => {
    const TYPE = TYPES.GET_CONTRACT_WITH_PAYMENTS_REQUEST;
    const FINAL_PATH =
      API_PATHS.CONTRACT_BASE_PATH +
      "contract-with-payments/" +
      contractReference;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null
    })
      .then(res => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
          history._pushRoute(ROUTING_PATHS.ROOT_PATH);
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch(err => {
        history._pushRoute(ROUTING_PATHS.ROOT_PATH);
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const listTrending = params => {
  return dispatch => {
    const TYPE = types.FETCH_TRENDING_CONTRACTS_REQUEST;
    const FINAL_PATH = API_PATHS.CONTRACT_BASE_PATH + "all/trending/";
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null
    })
      .then(res => {
        if (res.data.status === "OK") {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions

          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        } else {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const saveClientContract = contractData => {
  return dispatch => {
    const TYPE = TYPES.SAVE_CLIENT_CONTRACT_REQUEST;
    const FINAL_PATH = API_PATHS.BASE_PATH;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "POST",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: contractData
    })
      .then(res => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);

          dispatch(getContract(res.data.reference));

          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });

          // Other actions
          const session = new Session();
          if (!session.getSession()) {
            localStorage.setItem(
              "redirectPaymentTo",
              ROUTING_PATHS.PAYMENT_METHODS.replace(
                ":contract_reference",
                res.data.reference
              )
            );
            localStorage.setItem("hash", res.data.hash);
            history._pushRoute(ROUTING_PATHS.SIGN_IN_WITH_SPECIFIC_FORM_PATH + "?title=Inicia sesión para continuar con el pago.");
          } else {
            history._pushRoute(
              ROUTING_PATHS.PAYMENT_METHODS.replace(
                ":contract_reference",
                res.data.reference
              )
            );
          }
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const listClientContracts = () => {
  return dispatch => {
    const TYPE = TYPES.LIST_CLIENT_CONTRACTS_REQUEST;
    const FINAL_PATH = API_PATHS.BASE_PATH;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null
    })
      .then(res => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const saveClientContractReview = (contractID, reviewData) => {
  return dispatch => {
    const TYPE = TYPES.SAVE_CLIENT_CONTRACT_REVIEW_REQUEST;
    const FINAL_PATH = API_PATHS.BASE_PATH + contractID + "/reviews/";
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "POST",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: reviewData
    })
      .then(res => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const listContractComments = (contractReference, params) => {
  return dispatch => {
    const TYPE = TYPES.LIST_CONTRACT_COMMENTS_REQUEST;
    const FINAL_PATH =
      API_PATHS.CONTRACT_BASE_PATH + contractReference + "/comments/";
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: params,
      body: null
    })
      .then(res => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};

export const addContractComment = (contractReference, body) => {
  return dispatch => {
    const TYPE = TYPES.ADD_CONTRACT_COMMENTS_REQUEST;
    const FINAL_PATH =
      API_PATHS.CONTRACT_BASE_PATH + contractReference + "/comments/";
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "POST",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: body
    })
      .then(res => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch(err => {
        handleApiErrors(dispatch, TYPE, {
          data: { api_error: err, error: "Server 500" }
        });
      });
  };
};
