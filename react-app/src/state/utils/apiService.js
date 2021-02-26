import axios from "axios";
import { Session } from "./session";

const setHeaders = (
  params = {},
  addFamososAuthorizationHeader = true,
  cancelToken
) => {
  const sessionToken = new Session().getToken();
  let options = {};
  if (sessionToken && addFamososAuthorizationHeader) {
    options.headers = {
      authorization: "Bearer " + sessionToken
    };
  }
  if (params !== "?") {
    options.params = params;
  }

  if (cancelToken) {
    options.cancelToken = cancelToken;
  }
  return options;
};

export const jsonToQueryString = (json) => {
  if (json) {
    return (
      "?" +
      Object.keys(json)
        .map(function (key) {
          return `${key}=${encodeURIComponent(json[key])}`;
        })
        .join("&")
    );
  }
  return "";
};

export const queryStringToJSON = (query_string) => {
  const pairs = query_string.slice(1).split("&");
  const result = {};
  pairs.forEach(function (pair) {
    pair = pair.split("=");
    result[pair[0]] = decodeURIComponent(pair[1] || "");
  });
  return JSON.parse(JSON.stringify(result));
};

const apiService = (meta) => {
  // Path is Required
  if (!meta.path) {
    throw new Error(`'path' not specified for async action ${meta.action}`);
  }
  let addFamososAuthorizationHeader = false;

  // Final URL
  let url = meta.path;
  if (!meta.custom_endpoint) {
    url = `${process.env.NEXT_PUBLIC_ENDPOINT}${meta.path}`;
    addFamososAuthorizationHeader = true;
  }

  const source = meta.isCancellable ? axios.CancelToken.source() : null;

  const configuration = setHeaders(
    meta.params,
    addFamososAuthorizationHeader,
    source?.token
  );

  let request = axios.create();
  switch (meta.method) {
    case "GET":
    default:
      request = axios.get(url, configuration);
      break;
    case "POST":
      request = axios.post(url, meta.body, configuration);
      break;
    case "PUT":
      request = axios.put(url, meta.body, configuration);
      break;
    case "DELETE":
      request = axios.delete(url, configuration);
      break;
  }

  if (source) request.cancel = source.cancel;

  return request;
};

export default apiService;
