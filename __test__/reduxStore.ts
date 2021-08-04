import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import * as reducers from "../react-app/src/state/ducks";

const combinedReducers = combineReducers(reducers);

export const store = createStore(
  combinedReducers,
  {},
  applyMiddleware(thunkMiddleware)
);
