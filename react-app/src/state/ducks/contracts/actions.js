import * as TYPES from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess,
} from "../../utils";
import * as API_PATHS from "./paths";
import * as ROUTING_PATHS from "../../../routing/Paths";
import { history } from "../../../routing/History";
import * as types from "../celebrities/types";
import { Session } from "../../utils/session";
import thunkAction from "../../utils/thunkAction";

export const updateQueryParams = (params, applyFetch = true) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_QUERY_PARAMS, payload: { params } });
    if (applyFetch) {
      dispatch(listTrending(params));
    }
  };
};

export const playVideo = (params) => {
  return (dispatch) => {
    dispatch({ type: types.PLAY_VIDEO, payload: { params } });
  };
};

export const getContract = (contractReference) => {
  return (dispatch) => {
    const TYPE = TYPES.GET_CONTRACT_REQUEST;
    const FINAL_PATH = API_PATHS.GET_CONTRACT_BY_REFERENCE + contractReference;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // history._pushRoute(ROUTING_PATHS.HOME_PATH);
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        // history._pushRoute(ROUTING_PATHS.HOME_PATH);
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};

export const getContractWithPayments = (contractReference) => {
  return (dispatch) => {
    const TYPE = TYPES.GET_CONTRACT_WITH_PAYMENTS_REQUEST;
    const FINAL_PATH = API_PATHS.GET_CONTRACT_WITH_PAYMENTS + contractReference;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          history._pushRoute(ROUTING_PATHS.HOME_PATH);
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        console.log(err);
        handleApiErrors(dispatch, TYPE, err);
        history._pushRoute(ROUTING_PATHS.HOME_PATH);
      });
  };
};

export const AssociateContract = (hash) => {
  return (dispatch) => {
    const FINAL_PATH = "AssociateContract" + "associate-contract/" + hash + "/";
    apiService({
      method: "GET",
      action: null,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          // Other actions
          localStorage.removeItem("redirectTo");
          localStorage.removeItem("hash");
          history._pushRoute(ROUTING_PATHS.HOME_PATH);
        } else {
          // Other actions
          localStorage.removeItem("redirectTo");
          localStorage.removeItem("hash");
        }
      })
      .catch((err) => {
        history._pushRoute(ROUTING_PATHS.HOME_PATH);
      });
  };
};

export const listTrending = (params) => {
  return (dispatch) => {
    const TYPE = types.FETCH_TRENDING_CONTRACTS_REQUEST;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: API_PATHS.TRENDING_CONTRACTS,
      params: params,
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

export const saveClientContract = (contractData) => {
  // eliminates leading and trailing spaces
  if (contractData.deliveryContact) {
    contractData.deliveryContact.trim();
  }
  return (dispatch) => {
    const TYPE = TYPES.SAVE_CLIENT_CONTRACT_REQUEST;
    const FINAL_PATH = API_PATHS.CREATE_CONTRACT;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "POST",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: contractData,
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // dispatch(getContract(res.data.contractReference));
          dispatch({
            type: TYPES.SAVE_CONTRACT_TO_PAY,
            payload: res.data.data,
          });
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });

          // Other actions
          if (res.data.data.sessionToken) {
            const session = new Session();
            session.initSession(res.data.data.sessionToken);
            localStorage.setItem("finalRedirect", ROUTING_PATHS.CLIENT_HIRINGS);
            localStorage.setItem("hash", res.data.data.contractHash);

            history._pushRoute(
              ROUTING_PATHS.PAYMENT_METHODS.replace(
                ":contract_reference",
                res.data.data.reference
              )
            );
          } else {
            history._pushRoute(
              ROUTING_PATHS.PAYMENT_METHODS.replace(
                ":contract_reference",
                res.data.data.reference
              )
            );
          }
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};

const getSanitizedContractData = (contractData) => {
  if (!contractData.deliveryContact) return contractData;
  return {
    ...contractData,
    deliveryContact: contractData.deliveryContact.trim(),
  };
};

export const createContract = (contractData) =>
  apiService({
    method: "POST",
    path: API_PATHS.CREATE_CONTRACT_V2,
    body: getSanitizedContractData(contractData),
  }).then((response) => {
    if (response?.data?.status === "OK") {
      return response.data.data;
    }
    throw response?.data?.error;
  });

// Update Client Contract Data

export const updateClientContract = (contractData) => {
  return (dispatch) => {
    const TYPE = TYPES.SAVE_CLIENT_CONTRACT_REQUEST;
    const FINAL_PATH = API_PATHS.UPDATE_CONTRACT;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "PUT",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: contractData,
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // dispatch(getContract(res.data.contractReference));
          dispatch({
            type: TYPES.SAVE_CONTRACT_TO_PAY,
            payload: res.data.data,
          });
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });

          // Other actions
          if (contractData.status === 10) {
            return history.push(ROUTING_PATHS.CLIENT_HIRINGS);
          }
          if (res.data.data.sessionToken) {
            const session = new Session();
            session.initSession(res.data.data.sessionToken);
            localStorage.setItem("finalRedirect", ROUTING_PATHS.CLIENT_HIRINGS);
            localStorage.setItem("hash", res.data.data.contractHash);

            history._pushRoute(
              ROUTING_PATHS.PAYMENT_METHODS.replace(
                ":contract_reference",
                res.data.data.reference
              )
            );
          } else {
            history._pushRoute(
              ROUTING_PATHS.PAYMENT_METHODS.replace(
                ":contract_reference",
                res.data.data.reference
              )
            );
          }
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};

export const updateContractStep = (contractData, step = 1) =>
  apiService({
    method: "PUT",
    path: API_PATHS.UPDATE_CONTRACT_V2,
    body: { ...contractData, status: step },
  }).then((response) => {
    if (response?.data?.status === "OK") {
      return response.data.data;
    }
    throw response?.data?.error;
  });

export const getUserContractInProgress = (celebrityUsername) =>
  thunkAction(TYPES.GET_USER_CONTRACT_IN_PROGRESS_REQUEST, () =>
    apiService({
      method: "GET",
      path: API_PATHS.GET_USER_CONTRACT_IN_PROGRESS + celebrityUsername,
    })
  );

export const cleanUserContractInProgress = () => ({
  type: TYPES.CLEAN_USER_CONTRACT_IN_PROGRESS,
});

export const listClientContracts = () => {
  return (dispatch) => {
    const TYPE = TYPES.LIST_CLIENT_CONTRACTS_REQUEST;
    const FINAL_PATH = API_PATHS.ACCOUNT_CONTRACTS;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};

export const listUserContracts = (params) =>
  thunkAction(TYPES.LIST_USER_CONTRACTS_REQUEST, () =>
    apiService({
      method: "GET",
      path: API_PATHS.USER_CONTRACTS,
      params,
    })
  );

export const listContractComments = (contractReference, params) => {
  return (dispatch) => {
    const TYPE = TYPES.LIST_CONTRACT_COMMENTS_REQUEST;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: API_PATHS.GET_CONTRACT_COMMENTS + contractReference,
      params: params,
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};

export const addContractComment = (contractReference, body) => {
  return (dispatch) => {
    const TYPE = TYPES.ADD_CONTRACT_COMMENTS_REQUEST;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "POST",
      action: TYPE,
      path: API_PATHS.ADD_CONTRACT_COMMENTS + contractReference,
      body: body,
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // Other actions
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, err);
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
    .then((res) => {
      if (res.data.status === "OK") {
        response.markedByMe = res.data.data.markedByMe;
        response.count = res.data.data.count;
      }
    })
    .catch((err) => console.log(err));
  return response;
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
    .then((res) => {
      if (res.data.status === "OK") {
        response.count = res.data.data.count;
      }
    })
    .catch((err) => console.log(err));
  return response;
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
    .then((res) => {
      if (res.data.status === "OK") {
        response.markedByMe = res.data.data.markedByMe;
        response.count = res.data.data.count;
      }
    })
    .catch((err) => console.log(err));
  return response;
};

export const saveClientContractReview = async (
  contractReference,
  reviewData
) => {
  let response = {};
  await apiService({
    method: "POST",
    path: API_PATHS.SAVE_CONTRACT_REVIEW + contractReference,
    body: reviewData,
  })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log(err));
  return response;
};

export const saveContractToPay = (contractToPay) => {
  return (dispatch) => {
    dispatch({
      type: TYPES.SAVE_CONTRACT_TO_PAY,
      payload: contractToPay,
    });
  };
};

export const updateContract = (body) => {
  return (dispatch) => {
    const TYPE = TYPES.UPDATE_CONTRACT_REQUEST;
    const FINAL_PATH = API_PATHS.UPDATE_CONTRACT;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "PUT",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body,
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          // Other actions
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        history._pushRoute(ROUTING_PATHS.HOME_PATH);
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};

export const saveContractToPayClear = () => ({
  type: TYPES.SAVE_CONTRACT_TO_PAY_CLEAR,
});

export const updateContractIsPublic = async (body) => {
  const FINAL_PATH = API_PATHS.UPDATE_CONTRACT_IS_PUBLIC;
  try {
    const response = await apiService({
      method: "PUT",
      path: FINAL_PATH,
      async: true,
      body,
    });
    if (response.data.status !== "OK") {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSimilarContracts = (celebrityUsername) => {
  return (dispatch) => {
    const TYPE = TYPES.FETCH_SIMILAR_CONTRACTS_REQUEST;
    const FINAL_PATH = API_PATHS.SIMILAR_CONTRACTS + celebrityUsername;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
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
};

export const fetchSimilarContractsV2 = (celebrityUsername) =>
  thunkAction(TYPES.FETCH_SIMILAR_CONTRACTS_REQUEST, () =>
    apiService({
      method: "GET",
      path: API_PATHS.SIMILAR_CONTRACTS_V2 + celebrityUsername,
    })
  );

export const getPurchaseSummaryV2 = (contractReference) => {
  return (dispatch) => {
    const TYPE = TYPES.GET_PURCHASE_SUMMARY_REQUEST;
    const FINAL_PATH = API_PATHS.GET_PURCHASE_SUMMARY_V2 + contractReference;
    dispatch({ type: TYPE, payload: {} });
    apiService({
      method: "GET",
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      params: null,
      body: null,
    })
      .then((res) => {
        if ("status" in res.data && res.data.status === "ERROR") {
          handleApiResponseFailure(dispatch, TYPE, res);
          // history._pushRoute(ROUTING_PATHS.HOME_PATH);
        } else {
          handleApiResponseSuccess(dispatch, TYPE, res);
          dispatch({ type: `${TYPE}_COMPLETED`, payload: res });
        }
      })
      .catch((err) => {
        handleApiErrors(dispatch, TYPE, err);
      });
  };
};

const getDataWithContractReference = (response, contractReference) => ({
  data: {
    ...response.data,
    data: {
      ...response.data.data,
      contractReference,
    },
  },
});

export const getHiringPreviewConfiguration = (contractReference) =>
  thunkAction(TYPES.GET_HIRING_PREVIEW_CONFIGURATION_REQUEST, () =>
    apiService({
      method: "GET",
      path: API_PATHS.GET_HIRING_PREVIEW_CONFIGURATION + contractReference,
    }).then((response) =>
      getDataWithContractReference(response, contractReference)
    )
  );

const getSaveHiringPreviewConfigurationBody = (hiringPreviewConfiguration) => ({
  contractReference: hiringPreviewConfiguration.contractReference,
  previewTitle: hiringPreviewConfiguration.cardTitle,
  previewMessage: hiringPreviewConfiguration.cardMessage,
  previewCardColor: hiringPreviewConfiguration.cardColor,
  previewBackgroundUrl: hiringPreviewConfiguration.pageBackgroundUrl,
  previewButtonsBackgroundColor:
    hiringPreviewConfiguration.actionsButtonBackgroundColor,
});

export const saveHiringPreviewConfiguration = (hiringPreviewConfiguration) =>
  apiService({
    method: "POST",
    path: API_PATHS.SAVE_HIRING_PREVIEW_CONFIGURATION,
    body: getSaveHiringPreviewConfigurationBody(hiringPreviewConfiguration),
  });

export const saveSendConfiguration = (sendConfiguration) =>
  apiService({
    method: "POST",
    path: API_PATHS.SAVE_SEND_CONFIGURATION,
    body: sendConfiguration,
  });

export const updateHiredContract = (contract_reference, params) =>
  apiService({
    method: "PUT",
    path: API_PATHS.UPDATE_CONTRACT_HIRED_PATH + contract_reference,
    body: params,
  }).then((res) => {
    if (res.data.status === "OK") {
      return res.data.data;
    } else {
      throw res.data.error;
    }
  });
