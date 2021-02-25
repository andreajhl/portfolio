import { combineReducers } from "redux";
import * as types from "./types";

const signInWithEmailInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const changePasswordInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const createPasswordInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const verifySecurityCodeInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const sendSMSSecurityCodeReducerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const validateSMSSecurityCodeReducerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const sendEmailSecurityCodeReducerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const validateEmailSecurityCodeReducerInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const validateIfEmailIsRegisteredInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const resetPasswordInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const completeProfileInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};
const getUserInformationInitialState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
  data: {}
};

const setRedirectUnauthorizedInitialState = false;

export const setRedirectUnauthorizedReducer = (
  state = setRedirectUnauthorizedInitialState,
  { type, payload }
) => {
  if (type === types.SET_REDIRECT_UNAUTHORIZED) return payload;
  return state;
};

export function signInWithEmailReducer(
  state = signInWithEmailInitialState,
  action
) {
  switch (action.type) {
    case types.SIGN_IN_WITH_EMAIL_REQUEST:
      return {
        ...signInWithEmailInitialState,
        loading: true
      };
    case types.SIGN_IN_WITH_EMAIL_REQUEST_FAILURE:
      return {
        ...signInWithEmailInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.SIGN_IN_WITH_EMAIL_REQUEST_SUCCESS:
      return {
        ...signInWithEmailInitialState,
        data: action.payload.data
      };
    case types.SIGN_IN_WITH_EMAIL_REQUEST_COMPLETED:
      return {
        ...signInWithEmailInitialState,
        data: action.payload.data,
        completed: true
      };
    default:
      return state;
  }
}

export function changePasswordReducer(
  state = changePasswordInitialState,
  action
) {
  switch (action.type) {
    case types.CHANGE_PASSWORD_REQUEST:
      return {
        ...changePasswordInitialState,
        loading: true
      };
    case types.CHANGE_PASSWORD_REQUEST_FAILURE:
      return {
        ...changePasswordInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.CHANGE_PASSWORD_REQUEST_SUCCESS:
      return {
        ...changePasswordInitialState,
        data: action.payload.data.data
      };
    case types.CHANGE_PASSWORD_REQUEST_COMPLETED:
      return {
        ...changePasswordInitialState,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export function createPasswordReducer(
  state = createPasswordInitialState,
  action
) {
  switch (action.type) {
    case types.CREATE_PASSWORD_REQUEST:
      return {
        ...createPasswordInitialState,
        loading: true
      };
    case types.CREATE_PASSWORD_REQUEST_FAILURE:
      return {
        ...createPasswordInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.CREATE_PASSWORD_REQUEST_SUCCESS:
      return {
        ...createPasswordInitialState,
        data: action.payload.data
      };
    case types.CREATE_PASSWORD_REQUEST_COMPLETED:
      return {
        ...createPasswordInitialState,
        data: action.payload.data,
        completed: true
      };
    default:
      return state;
  }
}

export function verifySecurityCodeReducer(
  state = verifySecurityCodeInitialState,
  action
) {
  switch (action.type) {
    case types.VERIFY_SECURITY_CODE_REQUEST:
      return {
        ...verifySecurityCodeInitialState,
        loading: true
      };
    case types.VERIFY_SECURITY_CODE_REQUEST_FAILURE:
      return {
        ...verifySecurityCodeInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.VERIFY_SECURITY_CODE_REQUEST_SUCCESS:
      return {
        ...verifySecurityCodeInitialState,
        data: action.payload.data
      };
    case types.VERIFY_SECURITY_CODE_REQUEST_COMPLETED:
      return {
        ...verifySecurityCodeInitialState,
        data: action.payload.data,
        completed: true
      };
    default:
      return state;
  }
}

export function sendSMSSecurityCodeReducer(
  state = sendSMSSecurityCodeReducerInitialState,
  action
) {
  switch (action.type) {
    case types.SEND_SMS_SECURITY_CODE_REQUEST:
      return {
        ...sendSMSSecurityCodeReducerInitialState,
        loading: true
      };
    case types.SEND_SMS_SECURITY_CODE_REQUEST_FAILURE:
      return {
        ...sendSMSSecurityCodeReducerInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.SEND_SMS_SECURITY_CODE_REQUEST_SUCCESS:
      return {
        ...sendSMSSecurityCodeReducerInitialState,
        data: action.payload.data.data
      };
    case types.SEND_SMS_SECURITY_CODE_REQUEST_COMPLETED:
      return {
        ...sendSMSSecurityCodeReducerInitialState,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export function validateSMSSecurityCodeReducer(
  state = validateSMSSecurityCodeReducerInitialState,
  action
) {
  switch (action.type) {
    case types.VALIDATE_SMS_SECURITY_CODE_REQUEST:
      return {
        ...validateSMSSecurityCodeReducerInitialState,
        loading: true
      };
    case types.VALIDATE_SMS_SECURITY_CODE_REQUEST_FAILURE:
      return {
        ...validateSMSSecurityCodeReducerInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.VALIDATE_SMS_SECURITY_CODE_REQUEST_SUCCESS:
      return {
        ...validateSMSSecurityCodeReducerInitialState,
        data: action.payload.data.data
      };
    case types.VALIDATE_SMS_SECURITY_CODE_REQUEST_COMPLETED:
      console.log("action.payload.data.data", action.payload.data.data);
      return {
        ...validateSMSSecurityCodeReducerInitialState,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export function sendEmailSecurityCodeReducer(
  state = sendEmailSecurityCodeReducerInitialState,
  action
) {
  switch (action.type) {
    case types.SEND_EMAIL_SECURITY_CODE_REQUEST:
      return {
        ...sendEmailSecurityCodeReducerInitialState,
        loading: true
      };
    case types.SEND_EMAIL_SECURITY_CODE_REQUEST_FAILURE:
      return {
        ...sendEmailSecurityCodeReducerInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.SEND_EMAIL_SECURITY_CODE_REQUEST_SUCCESS:
      return {
        ...sendEmailSecurityCodeReducerInitialState,
        data: action.payload.data
      };
    case types.SEND_EMAIL_SECURITY_CODE_REQUEST_COMPLETED:
      return {
        ...sendEmailSecurityCodeReducerInitialState,
        data: action.payload.data,
        completed: true
      };
    default:
      return state;
  }
}

export function validateEmailSecurityCodeReducer(
  state = validateEmailSecurityCodeReducerInitialState,
  action
) {
  switch (action.type) {
    case types.VALIDATE_EMAIL_SECURITY_CODE_REQUEST:
      return {
        ...validateEmailSecurityCodeReducerInitialState,
        loading: true
      };
    case types.VALIDATE_EMAIL_SECURITY_CODE_REQUEST_FAILURE:
      return {
        ...validateEmailSecurityCodeReducerInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.VALIDATE_EMAIL_SECURITY_CODE_REQUEST_SUCCESS:
      return {
        ...validateEmailSecurityCodeReducerInitialState,
        data: action.payload.data.data
      };
    case types.VALIDATE_EMAIL_SECURITY_CODE_REQUEST_COMPLETED:
      return {
        ...validateEmailSecurityCodeReducerInitialState,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export function validateIfEmailIsRegisteredReducer(
  state = validateIfEmailIsRegisteredInitialState,
  action
) {
  switch (action.type) {
    case types.VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST:
      return {
        ...validateIfEmailIsRegisteredInitialState,
        loading: true
      };
    case types.VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST_FAILURE:
      return {
        ...validateIfEmailIsRegisteredInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST_SUCCESS:
      return {
        ...validateIfEmailIsRegisteredInitialState,
        data: action.payload.data.data
      };
    case types.VALIDATE_IF_EMAIL_IS_REGISTERED_REQUEST_COMPLETED:
      return {
        ...validateIfEmailIsRegisteredInitialState,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export function resetPasswordReducer(
  state = resetPasswordInitialState,
  action
) {
  switch (action.type) {
    case types.RESET_PASSWORD_REQUEST:
      return {
        ...resetPasswordInitialState,
        loading: true
      };
    case types.RESET_PASSWORD_REQUEST_FAILURE:
      return {
        ...resetPasswordInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.RESET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...resetPasswordInitialState,
        data: action.payload.data
      };
    case types.RESET_PASSWORD_REQUEST_COMPLETED:
      return {
        ...resetPasswordInitialState,
        data: action.payload.data,
        completed: true
      };
    default:
      return state;
  }
}

export function completeProfileReducer(
  state = completeProfileInitialState,
  action
) {
  switch (action.type) {
    case types.COMPLETE_PROFILE_REQUEST:
      return {
        ...completeProfileInitialState,
        loading: true
      };
    case types.COMPLETE_PROFILE_REQUEST_FAILURE:
      return {
        ...completeProfileInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.COMPLETE_PROFILE_REQUEST_SUCCESS:
      return {
        ...completeProfileInitialState,
        data: action.payload.data
      };
    case types.COMPLETE_PROFILE_REQUEST_COMPLETED:
      return {
        ...completeProfileInitialState,
        data: action.payload.data,
        completed: true
      };
    default:
      return state;
  }
}

export function getUserInformationReducer(
  state = getUserInformationInitialState,
  action
) {
  switch (action.type) {
    case types.GET_USER_INFORMATION:
      return {
        ...getUserInformationInitialState,
        loading: true
      };
    case types.GET_USER_INFORMATION_FAILURE:
      return {
        ...getUserInformationInitialState,
        error_data: action.payload.data,
        failed: true
      };
    case types.GET_USER_INFORMATION_SUCCESS:
      return {
        ...getUserInformationInitialState,
        data: action.payload.data.data
      };
    case types.GET_USER_INFORMATION_COMPLETED:
      return {
        ...getUserInformationInitialState,
        data: action.payload.data.data,
        completed: true
      };
    default:
      return state;
  }
}

export default combineReducers({
  signInWithEmailReducer,
  changePasswordReducer,
  createPasswordReducer,
  verifySecurityCodeReducer,
  sendSMSSecurityCodeReducer,
  validateSMSSecurityCodeReducer,
  resetPasswordReducer,
  completeProfileReducer,
  sendEmailSecurityCodeReducer,
  validateEmailSecurityCodeReducer,
  validateIfEmailIsRegisteredReducer,
  getUserInformationReducer,
  setRedirectUnauthorizedReducer
});
