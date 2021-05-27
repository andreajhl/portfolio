import * as TYPES from "./types";
import thunkAction from "../../utils/thunkAction";
import apiService from "../../utils/apiService";
import { LIST_HASHTAGS } from "./paths";

export const list = (params = {}) =>
  thunkAction(TYPES.LIST_HASHTAGS, () =>
    apiService({
      method: "GET",
      path: LIST_HASHTAGS,
      params,
    })
  );
