import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import * as reducers from "./ducks";
import { batchDispatchMiddleware } from "redux-batched-actions";
import { checkNext, invalidSessionWatcher } from "./middlewares";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { getStateFromServer } from "./utils/getStateFromServer";

const combinedReducers = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) return getStateFromServer(state, action.payload);
  return combinedReducers(state, action);
};

// create a makeStore function
const makeStore = (context) =>
  createStore(
    rootReducer,
    {},
    applyMiddleware(
      batchDispatchMiddleware,
      checkNext,
      thunkMiddleware,
      invalidSessionWatcher
    )
  );

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
});
