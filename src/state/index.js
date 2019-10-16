import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import * as reducers from "./ducks";
import {batchDispatchMiddleware} from 'redux-batched-actions';
import {checkNext} from "./middlewares";

export default function configureStore( initialState ) {
    const rootReducer = combineReducers( reducers );

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            batchDispatchMiddleware,
            checkNext,
            thunkMiddleware,
        ),
    );
}
