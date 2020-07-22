import * as TYPES from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import * as API_PATHS from "./paths";
import * as ROUTING_PATHS from "../../../routing/Paths";
import {history} from "../../../routing/History";
import * as types from "../celebrities/types";
import {Session} from "../../utils/session";

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

export const getContract = contractReference => {
  return dispatch => {
    const TYPE = TYPES.GET_CONTRACT_REQUEST;
    const FINAL_PATH = API_PATHS.GET_CONTRACT_BY_REFERENCE + contractReference;
    dispatch({type: TYPE, payload: {}});
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
          dispatch({type: `${TYPE}_COMPLETED`, payload: res});
        }
      })
      .catch(err => {
        history._pushRoute(ROUTING_PATHS.ROOT_PATH);
        handleApiErrors(dispatch, TYPE, {
          data: {api_error: err, error: "Server 500"}
        });
      });
  };
};

export const getContractWithPayments = contractReference => {
  return dispatch => {
    const TYPE = TYPES.GET_CONTRACT_WITH_PAYMENTS_REQUEST;
    const FINAL_PATH = API_PATHS.GET_CONTRACT_WITH_PAYMENTS + contractReference;
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

export const AssociateContract = hash => {
  return dispatch => {
    const FINAL_PATH = "AssociateContract" + "associate-contract/" + hash + "/";
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

export const listTrending = params => {
  return dispatch => {
    const TYPE = types.FETCH_TRENDING_CONTRACTS_REQUEST;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: API_PATHS.TRENDING_CONTRACTS,
      params: params,
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
    const FINAL_PATH = API_PATHS.CREATE_CONTRACT;
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
          // dispatch(getContract(res.data.contractReference));
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });

          // Other actions
          const session = new Session();
          if (!session.getSession()) {

            const session = new Session();
            session.setSession(res.data.data.sessionToken);
            localStorage.setItem("redirectPaymentTo", ROUTING_PATHS.CLIENT_HIRINGS);
            localStorage.setItem("hash", res.data.data.contractHash);

            history._pushRoute(
              ROUTING_PATHS.PAYMENT_METHODS.replace(
                ":contract_reference",
                  res.data.data.contractReference
              )
            );

          } else {
            history._pushRoute(
              ROUTING_PATHS.PAYMENT_METHODS.replace(
                ":contract_reference",
                  res.data.data.contractReference
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
    const FINAL_PATH = API_PATHS.ACCOUNT_CONTRACTS;
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

export const listContractComments = (contractReference, params) => {
  return dispatch => {
    const TYPE = TYPES.LIST_CONTRACT_COMMENTS_REQUEST;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: API_PATHS.GET_CONTRACT_COMMENTS + contractReference,
      params: params,
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
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "POST",
      action: TYPE,
      path: API_PATHS.ADD_CONTRACT_COMMENTS + contractReference,
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

export const getContractLikesData = async (contractReference) => {
  const response = {
    markedByMe: false,
    count: 0,
  };
  await apiService({
    method: "GET",
    path: API_PATHS.GET_CONTRACT_LIKES_DATA + contractReference,
    async: true,
  })
      .then(res => {
        if (res.data.status === "OK") {
          response.markedByMe = res.data.data.markedByMe;
          response.count = res.data.data.count;
        }
      })
      .catch(err => console.log(err));
  return response
};

export const getContractCommentsData = async (contractReference) => {
  const response = {
    count: 0,
  };
  await apiService({
    method: "GET",
    path: API_PATHS.GET_CONTRACT_COMMENTS_DATA + contractReference,
    async: true,
  })
      .then(res => {
        if (res.data.status === "OK") {
          response.count = res.data.data.count;
        }
      })
      .catch(err => console.log(err));
  return response
};

export const addOrRemoveContractLike = async (contractReference) => {
  const response = {
    markedByMe: false,
    count: 0,
  };
  await apiService({
    method: "GET",
    path: API_PATHS.ADD_OR_REMOVE_CONTRACT_LIKE + contractReference,
    async: true,
  })
      .then(res => {
        if (res.data.status === "OK") {
          response.markedByMe = res.data.data.markedByMe;
          response.count = res.data.data.count;
        }
      })
      .catch(err => console.log(err));
  return response
};

export const saveClientContractReview = async (contractReference, reviewData) => {
  let response = {};
  await apiService({
    method: "POST",
    path: API_PATHS.SAVE_CONTRACT_REVIEW + contractReference,
    body: reviewData
  })
      .then(res => {
        response = res.data;
      })
      .catch(err => console.log(err));
  return response
};
