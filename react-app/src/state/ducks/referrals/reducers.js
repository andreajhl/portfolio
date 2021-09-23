import { combineReducers } from "redux";
import thunkReducer from "../../utils/thunkReducer";
import * as types from "./types";

const getCodeReducer = thunkReducer(types.GET_CODE_REQUEST, "");

export default combineReducers({ getCodeReducer });
