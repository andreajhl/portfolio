import axios from "axios";
import {Session} from "./session"


const setHeaders = (params = {}, addFamososAuthorizationHeader = true) => {
    const session = new Session();
    let options = {};
    if (session.getSession() && addFamososAuthorizationHeader) {
        options.headers = { 'authorization': "JWT " + localStorage.getItem(session.sessionName) };
    }
    if (jsonToQueryString(params) !== "?") {
        options.params = params;
        // history.push({
        //     pathname: history.location.pathname,
        //     search: jsonToQueryString(params)
        // })
    }
    return options;
};

export const jsonToQueryString = (json) => {
    if(json) {
        return '?' +
            Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
    }
    return ""
};

export const queryStringToJSON = (query_string) => {
    const pairs = query_string.slice(1).split('&');
    const result = {};
    pairs.forEach(function (pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
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
        url = `${process.env.REACT_APP_ENDPOINT}${meta.path}`;
        addFamososAuthorizationHeader = true
    }

    let request = axios.create();
    switch (meta.method) {
        case 'GET':
        default:
            request = axios.get(url, setHeaders(meta.params, addFamososAuthorizationHeader));
            break;
        case 'POST':
            request = axios.post(url, meta.body, setHeaders(meta.params, addFamososAuthorizationHeader));
            break;
        case 'PUT':
            request = axios.put(url, meta.body, setHeaders(meta.params, addFamososAuthorizationHeader));
            break;
        case 'DELETE':
            request = axios.delete(url, setHeaders(meta.params, addFamososAuthorizationHeader));
            break;
    }
    return request;
};

export default apiService;
