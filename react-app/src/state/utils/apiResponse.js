// Handle Fetch Errors
import {Session} from "./session";

export function handleApiErrors(dispatch, type, data) {
    const session = new Session();
    session.tokenExpired();
    return dispatch({type: `${type}_FAILURE`, payload: data})
}

// Handle Fetch Response
export function handleApiResponseSuccess(dispatch, type, data) {
    const session = new Session();
    session.tokenExpired();
    return dispatch({type: `${type}_SUCCESS`, payload: data})
}

// Handle Fetch Response
export function handleApiResponseFailure(dispatch, type, data) {
    const session = new Session();
    session.tokenExpired();
    return dispatch({type: `${type}_FAILURE`, payload: data})
}
