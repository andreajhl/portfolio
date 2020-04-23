import * as types from "./types";
import apiService from "../../utils/apiService";
import {handleApiErrors, handleApiResponseFailure, handleApiResponseSuccess} from "../../utils";
import * as API_PATHS from './paths';


export const listAsync = async (params) => {
    // COUNTRY ID IS REQUIRED
    if (!params) {
        params = {country_id: 0}
    }
    const FINAL_PATH = API_PATHS.VIEWSETS_PATH + "categories/";
    return apiService({
        method: "GET",
        path: FINAL_PATH,
        async: true,
        params: params,
        body: null
    })
};


export const list = (params) => {
    return dispatch => {
        const TYPE = types.FETCH_CELEBRITY_CATEGORIES_REQUEST;
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
                handleApiErrors(dispatch, TYPE, {data: {api_error: err, error: "Server 500"}})
            });
    }
};
