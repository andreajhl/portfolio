import * as types from "./types";
import apiService from "../../utils/apiService";
import {
  handleApiErrors,
  handleApiResponseFailure,
  handleApiResponseSuccess
} from "../../utils";
import * as API_PATHS from "./paths";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";


export const postProcessSubscription = (subscription_data)  => {
  const TYPE = types.PROCESS_SUBSCRIPTION_REQUEST;
  const FINAL_PATH = API_PATHS.PROCESS_SUBSCRIPTION_PATH;
  return new Promise((resolutionFunc,rejectionFunc)=>{
    apiService({
      method: 'POST',
      action: TYPE,
      path: FINAL_PATH,
      async: true,
      body: subscription_data,
    })
      .then((res) => {
        if (res.data.status === 'OK') {
          resolutionFunc(res.data.data);

        } else {
          rejectionFunc(res.data.error);

        }
      })
      .catch((err) => {
        rejectionFunc(err);
      });
  })
};
