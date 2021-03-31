import { useReducer } from "react";

const TYPES = {
  SET_FIELD_VALUE: "SET_FIELD_VALUE",
  SET_FIELD_TOUCHED: "SET_FIELD_TOUCHED",
  SET_FIELD_ERROR: "SET_FIELD_ERROR",
  FORM_SUBMITTED: "FORM_SUBMITTED"
};

const setFieldProperty = (state, property, payload) => ({
  ...state,
  [property]: {
    ...state[property],
    [payload.name]: payload.value
  }
});

const initialState = {
  errors: {},
  values: {},
  touched: {}
};

function formReducer(state, action) {
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
        )
      };
    default:
      break;
  }
}

const getInitialState = (initialValues) => {
  return initialValues
    ? {
        ...initialState,
        values: { ...initialValues }
      }
    : initialState;
};

type UseFormParam<InitialValuesType> = {
  initialValues: InitialValuesType | { [key: string]: any };
  validations?: { [key: string]: any };
  onSubmit: (values: InitialValuesType) => void;
};

function useForm<InitialValuesType>({
  initialValues,
  validations,
  onSubmit
}: UseFormParam<InitialValuesType>) {
  const [state, dispatch] = useReducer(
    formReducer,
    getInitialState(initialValues)
  );

  function onChangeField({ target }) {
    dispatch({ type: TYPES.SET_FIELD_VALUE, payload: target });
  }

  function setFieldValue(name: string, value: any) {
    dispatch({ type: TYPES.SET_FIELD_VALUE, payload: { name, value } });
  }

  function onFocusField({ target }) {
    dispatch({
      type: TYPES.SET_FIELD_TOUCHED,
      payload: { name: target.name, value: true }
    });
  }

  function setFieldTouched(name: string, value: boolean) {
    dispatch({
      type: TYPES.SET_FIELD_TOUCHED,
      payload: { name, value }
    });
  }

  function setFieldError(name: string, error: any) {
    dispatch({
      type: TYPES.SET_FIELD_ERROR,
      payload: { name, value: error }
    });
  }

  function validateFields() {
    if (!validations) return true;
    let fieldsAreValid = true;
    const valuesEntries = Object.entries(state.values);
    valuesEntries.forEach(([field, value]) => {
      const fieldValidator = validations[field];
      if (!fieldValidator) return;
      if (typeof fieldValidator !== "function") {
        throw new TypeError(
          `The validation for field '${field}' is not a valid function.`
        );
      }
      const fieldError = fieldValidator(value, state);
      setFieldError(field, fieldError);
      if (fieldError) fieldsAreValid = false;
    });
    return fieldsAreValid;
  }

  function validateBeforeSubmit(event) {
    event.preventDefault();
    dispatch({ type: TYPES.FORM_SUBMITTED });
    if (!validateFields()) return;
    onSubmit(state.values);
  }

  return {
    ...state,
    setFieldValue,
    onChangeField,
    setFieldTouched,
    setFieldError,
    onFocusField,
    validateBeforeSubmit
  };
}

export default useForm;
