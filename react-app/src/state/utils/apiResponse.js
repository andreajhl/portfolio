// Handle Fetch Errors
import {Session} from "./session";

export function handleApiErrors(dispatch, type, data) {
    return dispatch({type: `${type}_FAILURE`, payload: data})
}

// Handle Fetch Response
export function handleApiResponseSuccess(dispatch, type, data) {
    return dispatch({type: `${type}_SUCCESS`, payload: data})
}

// Handle Fetch Response
export function handleApiResponseFailure(dispatch, type, data) {
    if(data.data.error === "Signature has expired.") {
        alert("Signature has expired.");
        const session = new Session();
        session.removeSession();
    }
    return dispatch({type: `${type}_FAILURE`, payload: data})
}
