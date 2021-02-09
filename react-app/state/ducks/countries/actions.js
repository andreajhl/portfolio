import * as types from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import * as API_PATHS from './paths';


export const listAsync = async (params) => {
    const FINAL_PATH = API_PATHS.PUBLIC_LIST;
    return apiService({
        method: "GET",
        path: FINAL_PATH,
        async: true,
        params: params,
        body: null
    })
};

export const getAsync = async (id) => {
    const FINAL_PATH = API_PATHS.PUBLIC_GET + id;
    return apiService({
        method: "GET",
        path: FINAL_PATH,
        async: true,
        body: null
    })
};

export const list = (params) => {
    return dispatch => {
        const TYPE = types.FETCH_COUNTRIES_REQUEST;
        dispatch({type: TYPE, payload: {}});
        listAsync(params)
            .then(res => {
                if (res.data.status === "OK") {
                    handleApiResponseSuccess(dispatch, TYPE, res);
                    // Other actions

                    dispatch({type: `${TYPE}_COMPLETED`, payload: res});
                } else {
                    handleApiResponseFailure(dispatch, TYPE, res);
                    // Other actions

                }
            })
            .catch(err => {
                handleApiErrors(dispatch, TYPE, err);
            });
    }
};
