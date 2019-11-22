import * as TYPES from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import * as API_PATHS from './paths';

export const saveRequest = (contractData) => {
    return dispatch => {
        const TYPE = TYPES.SAVE_CELEBRITY_REQUEST_REQUEST;
        const FINAL_PATH = API_PATHS.VIEWSETS_PATH;
        dispatch({type: TYPE, payload: {}});
        apiService({
            method: "POST",
            action: TYPE,
            path: FINAL_PATH,
            async: true,
            params: null,
            body: contractData
        })
            .then(res => {
                if ("status" in res.data && res.data.status === "ERROR") {
                    handleApiResponseFailure(dispatch, TYPE, res);
                    // Other actions

                } else {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                    // Other actions
                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};


