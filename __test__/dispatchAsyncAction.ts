import { store } from "./reduxStore";
import { handleApiResponseSuccess } from "react-app/src/state/utils";

const dispatchAsyncAction = (type: string, data: any) => {
  const { dispatch } = store;
  const payload = { data: { data } };
  handleApiResponseSuccess(dispatch, type, payload);
  dispatch({ type: `${type}_COMPLETED`, payload });
};

export default dispatchAsyncAction;
