type ActionType = {
  payload: any;
  type: string;
};

const initialReducersState = {
  loading: false,
  failed: false,
  completed: false,
  error_data: { error: "" },
};

type PreviousReducerState<StateType> = {
  data: StateType;
} & typeof initialReducersState;

type GetActionDataType<StateType> = (
  action: ActionType,
  previousState?: PreviousReducerState<StateType>
) => StateType;

const defaultGetActionData: GetActionDataType<any> = (action) =>
  action.payload.data.data || action.payload.data;

function thunkReducer<StateType>(
  type: string,
  initialState: StateType,
  getActionData?: GetActionDataType<StateType>
) {
  if (typeof type !== "string") {
    throw new TypeError('Argument "type" must be a string');
  }

  const initialReducerState = { ...initialReducersState, data: initialState };

  return function (state = initialReducerState, action: ActionType) {
    switch (action.type) {
      case type:
        return {
          ...state,
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
          data:
            typeof getActionData === "function"
              ? getActionData(action, state)
              : defaultGetActionData(action),
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
