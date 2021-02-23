import { setRedirectUnauthorized } from "../ducks/authentication/actions";
const _FAILURE = "_FAILURE";
const INVALID_TOKEN_ERRORS = [
  "unauthorized, a User Session is required",
  "token contains an invalid number of segments",
  "Invalid audience.",
  "no token string was provided",
  "Unable to find appropriate key.",
  "illegal base64 data at input byte 121",
  "signing method (alg) is unavailable.",
  "invalid character '!' looking for beginning of object key string"
];

const UNAUTHORIZED_STATUS_CODE = 401;

export const invalidSessionWatcher = (store) => (next) => (action) => {
  if (
    action.type.endsWith(_FAILURE) &&
    (String(action.payload?.data?.error).startsWith("invalid token") ||
      (action.payload?.data?.api_error?.response?.status ===
        UNAUTHORIZED_STATUS_CODE &&
        INVALID_TOKEN_ERRORS.includes(action.payload?.data?.error)))
  ) {
    return store.dispatch(setRedirectUnauthorized(true));
  }

  next(action);
};
