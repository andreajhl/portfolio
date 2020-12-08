import { combineReducers } from "redux";
import * as TYPES from "./types";
import { getTotalColumns } from "../../utils/gridSystem";
import * as types from "../celebrities/types";

const updateQueryParamsInitialState = {
  currentPage: 1,
  search: "",
  pageSize: getTotalColumns() * 7
};

const playVideoInitialState = {
  contract_reference: null
};

const fetchTrendingContractsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { results: [], informationPage: {} }
};

const saveClientContractInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};
const listClientContractsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};
const getContractInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};
const getContractWithPaymentsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: { contract: {}, payments: [], celebrity: {} }
};
const saveClientContractReviewInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};
const listContractCommmentsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};
const addContractCommmentInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const updateContractInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const saveContractToPayInitialState = {
  data: {},
  completed: false
};

const getSimilarContractsInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

export function queryParamsReducer(
  state = updateQueryParamsInitialState,
  action
) {
  if (action.type === types.UPDATE_QUERY_PARAMS) {
    return action.payload.params;
  } else {
    return state;
  }
}

export function playVideoReducer(state = playVideoInitialState, action) {
  if (action.type === types.PLAY_VIDEO) {
    return action.payload.params;
  } else {
    return state;
  }
}

export function fetchTrendingContractsReducer(
  state = fetchTrendingContractsInitialState,
  action
) {
  switch (action.type) {
    case types.FETCH_TRENDING_CONTRACTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_TRENDING_CONTRACTS_REQUEST_FAILURE:
      return {
        ...fetchTrendingContractsInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.FETCH_TRENDING_CONTRACTS_REQUEST_SUCCESS:
      return {
        ...fetchTrendingContractsInitialState,
        data: action.payload.data
      };
    case types.FETCH_TRENDING_CONTRACTS_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data,
        completed: true
      };
    default:
      return state;
  }
}

export function saveClientContractReducer(
  state = saveClientContractInitialState,
  action
) {
  switch (action.type) {
    case TYPES.SAVE_CLIENT_CONTRACT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case TYPES.SAVE_CLIENT_CONTRACT_REQUEST_FAILURE:
      return {
        ...saveClientContractInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case TYPES.SAVE_CLIENT_CONTRACT_REQUEST_SUCCESS:
      return {
        ...saveClientContractInitialState,
        data: action.payload.data
      };
    case TYPES.SAVE_CLIENT_CONTRACT_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data,
        completed: true
      };
    default:
      return state;
  }
}

export function listClientContractsReducer(
  state = listClientContractsInitialState,
  action
) {
  switch (action.type) {
    case TYPES.LIST_CLIENT_CONTRACTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case TYPES.LIST_CLIENT_CONTRACTS_REQUEST_FAILURE:
      return {
        ...listClientContractsInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case TYPES.LIST_CLIENT_CONTRACTS_REQUEST_SUCCESS:
      return {
        ...listClientContractsInitialState,
        data: action.payload.data.data
      };
    case TYPES.LIST_CLIENT_CONTRACTS_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data.results,
        completed: true
      };
    default:
      return state;
  }
}

export function getContractReducer(state = getContractInitialState, action) {
  switch (action.type) {
    case TYPES.GET_CONTRACT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case TYPES.GET_CONTRACT_REQUEST_FAILURE:
      return {
        ...getContractInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case TYPES.GET_CONTRACT_REQUEST_SUCCESS:
      return {
        ...getContractInitialState,
        data: action.payload.data.data
      };
    case TYPES.GET_CONTRACT_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export function getContractWithPaymentsReducer(
  state = getContractWithPaymentsInitialState,
  action
) {
  switch (action.type) {
    case TYPES.GET_CONTRACT_WITH_PAYMENTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case TYPES.GET_CONTRACT_WITH_PAYMENTS_REQUEST_FAILURE:
      return {
        ...getContractWithPaymentsInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case TYPES.GET_CONTRACT_WITH_PAYMENTS_REQUEST_SUCCESS:
      return {
        ...getContractWithPaymentsInitialState,
        data: action.payload.data.data
      };
    case TYPES.GET_CONTRACT_WITH_PAYMENTS_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export function listContractCommentsReducer(
  state = listContractCommmentsInitialState,
  action
) {
  switch (action.type) {
    case TYPES.LIST_CONTRACT_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case TYPES.LIST_CONTRACT_COMMENTS_REQUEST_FAILURE:
      return {
        ...listContractCommmentsInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case TYPES.LIST_CONTRACT_COMMENTS_REQUEST_SUCCESS:
      if (action.payload.data.informationPage.currentPage > 1) {
        action.payload.data.results = state.data.results.concat(
          action.payload.data.results
        );
        return {
          ...listContractCommmentsInitialState,
          data: action.payload.data
        };
      } else {
        return {
          ...listContractCommmentsInitialState,
          data: action.payload.data
        };
      }
    case TYPES.LIST_CONTRACT_COMMENTS_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data,
        completed: true
      };
    default:
      return state;
  }
}

export function addContractCommentReducer(
  state = addContractCommmentInitialState,
  action
) {
  switch (action.type) {
    case TYPES.ADD_CONTRACT_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case TYPES.ADD_CONTRACT_COMMENTS_REQUEST_FAILURE:
      return {
        ...addContractCommmentInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case TYPES.ADD_CONTRACT_COMMENTS_REQUEST_SUCCESS:
      return {
        ...addContractCommmentInitialState,
        data: action.payload.data.data
      };
    case TYPES.ADD_CONTRACT_COMMENTS_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export function saveContractToPayReducer(
  state = saveContractToPayInitialState,
  action
) {
  switch (action.type) {
    case TYPES.SAVE_CONTRACT_TO_PAY:
      return {
        ...state,
        data: action.payload,
        completed: true
      };
    case TYPES.SAVE_CONTRACT_TO_PAY_CLEAR:
      return {
        ...saveContractToPayInitialState
      };

    default:
      return state;
  }
}

export function updateContractReducer(
  state = updateContractInitialState,
  action
) {
  switch (action.type) {
    case TYPES.UPDATE_CONTRACT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case TYPES.UPDATE_CONTRACT_REQUEST_FAILURE:
      return {
        ...addContractCommmentInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case TYPES.UPDATE_CONTRACT_REQUEST_SUCCESS:
      return {
        ...addContractCommmentInitialState,
        data: action.payload.data.data
      };
    case TYPES.UPDATE_CONTRACT_REQUEST_COMPLETED:
      return {
        ...state,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export function getSimilarContractsReducer(
  state = getSimilarContractsInitialState,
  action
) {
  switch (action.type) {
    case TYPES.GET_SIMILAR_CONTRACTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case TYPES.GET_SIMILAR_CONTRACTS_REQUEST_FAILURE:
      return {
        ...getSimilarContractsInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case TYPES.GET_SIMILAR_CONTRACTS_REQUEST_SUCCESS:
      return {
        ...getSimilarContractsInitialState,
        data: action.payload.data
      };
    case TYPES.GET_SIMILAR_CONTRACTS_REQUEST_COMPLETED:
      return {
        ...state,
        completed: true
      };
    default:
      return state;
  }
}

export default combineReducers({
  saveClientContractReducer,
  listClientContractsReducer,
  getContractReducer,
  listContractCommentsReducer,
  addContractCommentReducer,
  fetchTrendingContractsReducer,
  queryParamsReducer,
  playVideoReducer,
  getContractWithPaymentsReducer,
  saveContractToPayReducer,
  updateContractReducer,
  getSimilarContractsReducer
});
