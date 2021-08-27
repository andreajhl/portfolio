import apiService from "../../utils/apiService";
import * as API_PATHS from "./paths";

export const togglePostReaction = (postId) =>
  apiService({
    method: "POST",
    path: API_PATHS.TOGGLE_REACTION_PATH,
    body: { postId },
  }).then((res) => {
    if (res.data.status === "OK") {
      return res.data.data;
    }
    throw res.data.error;
  });

export const addPostComment = ({ comment, postId }) =>
  apiService({
    method: "POST",
    path: API_PATHS.ADD_POST_COMMENT_PATH,
    body: { postId, comment },
  }).then((res) => {
    if (res.data.status === "OK") {
      return res.data.data;
    }
    throw res.data.error;
  });

export const listPostComment = (postId, params) =>
  apiService({
    method: "GET",
    path: API_PATHS.LIST_POST_COMMENT_PATH + postId,
    params,
  }).then((res) => {
    if (res?.data?.status === "ERROR") {
      throw res.data.error;
    }
    return res.data;
  });
