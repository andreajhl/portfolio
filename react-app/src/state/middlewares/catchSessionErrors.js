import { setRedirectUnauthorized } from "../ducks/authentication/actions";
const _FAILURE = "_FAILURE";
const UNAUTHORIZED_ERROR = "unauthorized, a User Session is required";
const AUTH0_INVALID_TOKEN_ERRORS = [
  "token contains an invalid number of segments",
  "Invalid audience.",
  "no token string was provided",
  "Unable to find appropriate key.",
  "illegal base64 data at input byte 121"
];

const UNAUTHORIZED_STATUS_CODE = 401;

export const invalidSessionWatcher = (store) => (next) => (action) => {
  if (
    action.type.endsWith(_FAILURE) &&
    (AUTH0_INVALID_TOKEN_ERRORS.includes(action.payload?.data?.error) ||
      action.payload?.data?.error === UNAUTHORIZED_ERROR ||
      action.payload?.data?.api_error?.response?.status ===
        UNAUTHORIZED_STATUS_CODE)
  ) {
    return store.dispatch(setRedirectUnauthorized(true));
  }

  next(action);
};
