import { Store, Dispatch } from "redux";
import { handleApiResponseFailure, handleApiResponseSuccess } from ".";

type ThunkAPIType = {
  dispatch: Dispatch;
  store: Store;
};

type PayloadCreatorCallbackType = (thunkAPI: ThunkAPIType) => Promise<any>;

function thunkAction(
  actionType: string,
  payloadCreatorCallback: PayloadCreatorCallbackType
) {
  if (typeof payloadCreatorCallback !== "function") {
    throw new TypeError('Argument "payloadCreatorCallback" is not a function');
  }

  return async (dispatch?: Dispatch, store?: Store) => {
    dispatch({ type: actionType });
    try {
      const payload = await payloadCreatorCallback({ dispatch, store });
      if (payload.data.status !== "OK") {
        return handleApiResponseFailure(dispatch, actionType, payload);
      }
      handleApiResponseSuccess(dispatch, actionType, payload);
      dispatch({ type: `${actionType}_COMPLETED`, payload });
    } catch (error) {
      handleApiResponseFailure(dispatch, actionType, {
        data: { api_error: error, error: "Server 500" },
      });
    }
  };
}

export default thunkAction;
