import * as types from "./types";
import apiService from "../../utils/apiService";
import * as mediumApiService from "../../../state/utils/mediumApiService";

export const saveBlogData = (data) =>{
    return dispatch =>{
        dispatch({
            type: types.FETCH_BLOGS_REQUEST,
            payload: data
        })
    }
}

export const getBlogData = () => {
  return (dispatch) => {
    dispatch({  type: types.FETCH_BLOGS_DATA, payload: {} });
    mediumApiService.getPost()
      .then((res) => {
        dispatch({  type: types.FETCH_BLOGS_DATA_SUCCESS, payload: res });
      })
      .catch((err) => {
        dispatch({  type: types.FETCH_BLOGS_DATA_FAILURE, payload: {err} });
      });
  };
};