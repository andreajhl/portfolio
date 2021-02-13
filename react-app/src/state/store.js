import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import * as reducers from "./ducks";
import { batchDispatchMiddleware } from "redux-batched-actions";
import { checkNext } from "./middlewares";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const hidrateReducer = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ ...reducers, hidrateReducer });

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

// create a makeStore function
const makeStore = (context) =>
  createStore(
    reducer,
    {},
    applyMiddleware(batchDispatchMiddleware, checkNext, thunkMiddleware)
  );

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
});

export default function initStore(initialState) {
  const rootReducer = combineReducers({ ...reducers, hidrateReducer });
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(batchDispatchMiddleware, checkNext, thunkMiddleware)
  );
  return store;
}

// export const initializeStore = (preloadedState) => {
//   let _store = store ?? initStore(preloadedState);

//   // After navigating to a page with an initial Redux state, merge that state
//   // with the current state in the store, and create a new store
//   if (preloadedState && store) {
//     _store = initStore({
//       ...store.getState(),
//       ...preloadedState
//     });
//     // Reset the current store
//     store = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === "undefined") return _store;
//   // Create the store once in the client
//   if (!store) store = _store;

//   return _store;
// };

// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState]);
//   return store;
// }
