import { useReducer } from "react";

const TYPES = {
  SET_FIELD_VALUE: "SET_FIELD_VALUE",
  SET_FIELD_TOUCHED: "SET_FIELD_TOUCHED",
  SET_FIELD_ERROR: "SET_FIELD_ERROR",
  FORM_SUBMITTED: "FORM_SUBMITTED",
};

const useFormInitialState = {
  errors: {},
  values: {},
  touched: {},
};

type PayloadType =
  | any
  | {
      name: any;
      value: any;
    };

type ActionType = {
  type: string;
  payload?: PayloadType;
};

type UseFormInitialState = typeof useFormInitialState;

type TouchedType<ValuesType> = {
  [Property in keyof ValuesType]: boolean;
};

type ErrorType = string | null;

type ErrorsType<ValuesType> = {
  [Property in keyof ValuesType]?: ErrorType;
};

type State<ValuesType> = {
  values: ValuesType;
  errors: ErrorsType<ValuesType>;
  touched: TouchedType<ValuesType>;
};

const setFieldProperty = (
  state: UseFormInitialState,
  property: string,
  payload: PayloadType
) => ({
  ...state,
  [property]: {
    ...state[property],
    [payload.name]: payload.value,
  },
});

function formReducer(
  state: UseFormInitialState,
  action: ActionType
): UseFormInitialState {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_FIELD_VALUE:
      return setFieldProperty(state, "values", payload);
    case TYPES.SET_FIELD_TOUCHED:
      return setFieldProperty(state, "touched", payload);
    case TYPES.SET_FIELD_ERROR:
      return setFieldProperty(state, "errors", payload);
    case TYPES.FORM_SUBMITTED:
      return {
        ...state,
        touched: Object.assign(
          {},
          ...Object.keys(state.values).map((key) => ({ [key]: true }))
        ),
      };
    default:
      return state;
  }
}

const getInitialState = <InitialValuesType>(
  initialValues: InitialValuesType | null
) => {
  return initialValues
    ? {
        ...useFormInitialState,
        values: { ...initialValues },
      }
    : useFormInitialState;
};

export type ValidationsType<ValuesType> = {
  [Property in keyof ValuesType]?: (
    value: ValuesType[Property],
    state: State<ValuesType>
  ) => ErrorType;
};

type UseFormParam<InitialValuesType> = {
  initialValues: InitialValuesType;
  validations?: ValidationsType<InitialValuesType>;
  validateOnChange?: boolean;
  onSubmit?: (values: InitialValuesType) => any;
};

function useForm<InitialValuesType = { [key: string]: any }>({
  initialValues,
  validations,
  validateOnChange = true,
  onSubmit,
}: UseFormParam<InitialValuesType>) {
  const [state, dispatch] = useReducer(
    formReducer,
    getInitialState<InitialValuesType>(initialValues)
  );

  function validateField(field: string, value?: any) {
    const fieldValidator = validations?.[field];
    if (!fieldValidator) return true;
    if (typeof fieldValidator !== "function") {
      throw new TypeError(
        `The validation for field '${field}' is not a valid function.`
      );
    }
    const fieldError = fieldValidator(value ?? state.values[field], state);
    setFieldError(field, fieldError);
    return !fieldError;
  }

  function setFieldValue(
    name: string,
    value: any,
    shouldValidate = validateOnChange
  ) {
    dispatch({ type: TYPES.SET_FIELD_VALUE, payload: { name, value } });
    if (!shouldValidate) return;
    validateField(name, value);
  }

  function onChangeField({ target: { name, value } }) {
    setFieldValue(name, value);
  }

  function onFocusField({ target }) {
    dispatch({
      type: TYPES.SET_FIELD_TOUCHED,
      payload: { name: target.name, value: true },
    });
  }

  function setFieldTouched(name: string, value: boolean) {
    dispatch({
      type: TYPES.SET_FIELD_TOUCHED,
      payload: { name, value },
    });
  }

  function setFieldError(name: string, error: any) {
    dispatch({
      type: TYPES.SET_FIELD_ERROR,
      payload: { name, value: error },
    });
  }

  function validateFields() {
    if (!validations) return true;
    let fieldsAreValid = true;
    const valuesEntries = Object.entries(state.values);
    valuesEntries.forEach(([field, value]) => {
      if (!validateField(field)) fieldsAreValid = false;
    });
    return fieldsAreValid;
  }

  function validateBeforeSubmit(event?: { preventDefault: () => void }) {
    event?.preventDefault?.();
    dispatch({ type: TYPES.FORM_SUBMITTED });
    if (!validateFields()) return;
    return onSubmit?.(state.values as InitialValuesType);
  }

  function touchedFieldsAreInvalid() {
    return Object.keys(state.touched).some((field) => !validateField(field));
  }

  function getTouchedFieldValues() {
    if (touchedFieldsAreInvalid()) return null;
    return Object.entries(state.values).reduce(
      (valuesToSave, [field, value]) => {
        if (state.touched[field]) {
          valuesToSave[field] = value;
        }
        return valuesToSave;
      },
      {}
    );
  }

  return {
    ...(state as State<InitialValuesType>),
    setFieldValue,
    onChangeField,
    setFieldTouched,
    setFieldError,
    onFocusField,
    validateFields,
    validateField,
    getTouchedFieldValues,
    validateBeforeSubmit,
    submitForm: validateBeforeSubmit,
  };
}

export default useForm;
