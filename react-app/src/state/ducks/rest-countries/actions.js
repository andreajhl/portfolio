import * as types from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import * as API_PATHS from './paths';

export const list = (params) => {
    return dispatch => {
        const TYPE = types.FETCH_COUNTRIES_REQUEST;
        const FINAL_PATH = API_PATHS.BASE_PATH;
        dispatch({type: TYPE, payload: {}});
        apiService({
            method: "GET",
            action: TYPE,
            path: FINAL_PATH,
            async: true,
            params: params,
            body: null,
            custom_endpoint: true
        })
            .then(res => {
                if (res.status === 200) {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    // Other actions

                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                } else {
                    handleApiResponseFailure(dispatch, TYPE, res);
                    // Other actions

                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};
