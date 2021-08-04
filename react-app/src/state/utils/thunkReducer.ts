function thunkReducer<T>(type: string, initialState: T) {
  if (typeof type !== "string") {
    throw new TypeError('Argument "type" must be a string');
  }

  const initialReducerState = {
    loading: false,
    failed: false,
    completed: false,
    error_data: { error: "" },
    data: initialState,
  };

  return function (
    state = initialReducerState,
    action: { payload: any; type: string }
  ) {
    switch (action.type) {
      case type:
        return {
          ...initialReducerState,
          loading: true,
        };
      case `${type}_FAILURE`:
        return {
          ...initialReducerState,
          error_data: action.payload.data,
          failed: true,
        };
      case `${type}_SUCCESS`:
        return {
          ...initialReducerState,
          data: action.payload.data.data || action.payload.data,
        };
      case `${type}_COMPLETED`:
        return {
          ...state,
          completed: true,
        };
      default:
        return state;
    }
  };
}

export default thunkReducer;
