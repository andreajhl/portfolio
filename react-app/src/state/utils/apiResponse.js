// Handle Fetch Errors
import { Session } from "./session";

function getCleanObject(object) {
  const cleanObject = JSON.parse(JSON.stringify(object));
  const cleanObjectEntries = Object.entries(cleanObject).map(([key, value]) => [
    key,
    value || "",
  ]);

  return cleanObjectEntries.reduce((newObject, [key, value]) => {
    newObject[key] = value;
    return newObject;
  }, {});
}
/**
 * To prevent SSR Redux error when passing unparseable object.
 */
function getParseableError(error) {
  if (typeof error?.toJSON === "function") {
    return getCleanObject(error.toJSON());
  }

  /* Default value to prevent errors. */
  return {
    data: {
      message: String(
        error?.data?.api_error?.response?.data?.error ||
          error?.message ||
          "Invalid error message"
      ),
      response: {
        status: error?.data?.api_error?.response?.status || 500,
      },
    },
  };
}

export function handleApiErrors(dispatch, type, error) {
  // CHECK SESSION
  const session = new Session();
  session.tokenExpired();

  let payload = {};

  // Error 😨
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    if (error.response.data) {
      payload = {
        data: { api_error: error, error: error.response.data.error },
      };
    } else {
      payload = {
        data: {
          api_error: error,
          error: "The request was made but no response was received",
        },
      };
    }
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    payload = {
      data: {
        api_error: error,
        error: "The request was made but no response was received",
      },
    };
  } else {
    // Something happened in setting up the request and triggered an Error
    payload = {
      data: {
        api_error: error,
        error:
          "Something happened in setting up the request and triggered an Error",
      },
    };
  }

  return dispatch({
    type: `${type}_FAILURE`,
    payload: {
      ...payload,
      data: { ...payload.data, api_error: getParseableError(error) },
    },
  });
}

// Handle Fetch Response
export function handleApiResponseSuccess(dispatch, type, data) {
  const session = new Session();
  session.tokenExpired();
  return dispatch({ type: `${type}_SUCCESS`, payload: data });
}

// Handle Fetch Response
export function handleApiResponseFailure(dispatch, type, data) {
  const session = new Session();
  session.tokenExpired();
  return dispatch({
    type: `${type}_FAILURE`,
    payload: getParseableError(data),
  });
}
