import React, { useReducer } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-input-2";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { Session } from "../../../state/utils/session";

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

const formReducer = (state, action) => {
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
          ...Object.keys(state.values).map((key) => ({ [key]: true }))
        )
      };
    default:
      break;
  }
};

const initialState = {
  errors: {},
  values: {
    userEmail: "",
    userFullName: "",
    cellphoneCountryCode: "co",
    cellphoneNumber: "",
    celebrityName: "",
    desiredPrice: ""
  },
  touched: {}
};

const formValidations = {
  userEmail: (value) => {
    if (isEmpty(value)) return "Debes introducir tu correo electrónico";
    if (!isEmail(value)) return "Correo electrónico inválido";
  },
  userFullName: (value) =>
    isEmpty(value) ? "Debes introducir tu nombre completo" : null,
  cellphoneNumber: (value) =>
    isEmpty(value) ? "Debes introducir tu número de teléfono" : null,
  desiredPrice: (value) =>
    isEmpty(value) ? "Debes seleccionar una opción" : null,
  celebrityName: (value) =>
    isEmpty(value) ? "Debes escribir el nombre de un famoso" : null
};

const FormField = ({
  label,
  children,
  className,
  type,
  placeholder,
  name,
  value,
  onChange,
  onFocus,
  error,
  touched
}) => (
  <Form.Group className={`col-12 col-md-6 ${className || ""}`}>
    <Form.Label>{label}</Form.Label>
    {children || (
      <Form.Control
        className={error && touched ? "border-danger" : ""}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
    )}
    {error && touched ? (
      <Form.Text className="text-danger">{error}</Form.Text>
    ) : null}
  </Form.Group>
);

const getInitialState = (userData) => {
  const userIsLogged = new Session().getSession();
  return userIsLogged && userData.userId
    ? {
        ...initialState,
        values: {
          ...initialState.values,
          userEmail: userData.email,
          userFullName: userData.fullName,
          cellphoneNumber: userData.cellphoneNumber,
          cellphoneCountryCode: userData.countryCode.slice(0, -1).toLowerCase()
        }
      }
    : initialState;
};

const VideoCallsResearchForm = ({ onSubmit, formId, userData }) => {
  const [state, dispatch] = useReducer(formReducer, getInitialState(userData));

  const onChangeField = ({ target }) =>
    dispatch({ type: TYPES.SET_FIELD_VALUE, payload: target });

  const onCellphoneChange = (cellphoneNumber, country) => {
    dispatch({
      type: TYPES.SET_FIELD_VALUE,
      payload: { name: "cellphoneCountryCode", value: country.countryCode }
    });
    dispatch({
      type: TYPES.SET_FIELD_VALUE,
      payload: { name: "cellphoneNumber", value: cellphoneNumber }
    });
  };

  const onFocusField = ({ target }) =>
    dispatch({
      type: TYPES.SET_FIELD_TOUCHED,
      payload: { name: target.name, value: true }
    });

  const validateFields = () => {
    let fieldsAreValid = true;
    const valuesEntries = Object.entries(state.values);
    valuesEntries.forEach(([field, value]) => {
      const fieldError = formValidations[field]?.(value);
      dispatch({
        type: TYPES.SET_FIELD_ERROR,
        payload: { name: field, value: fieldError }
      });
      if (fieldError) fieldsAreValid = false;
    });
    return fieldsAreValid;
  };

  const validateBeforeSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: TYPES.FORM_SUBMITTED });
    if (validateFields()) {
      onSubmit(state.values);
    }
  };

  return (
    <Form id={formId} onSubmit={validateBeforeSubmit} className="row">
      <p className="text-center mb-4 pb-2 col-12 font-weight-bold">
        Participa por una video llamada con tu Famoso favorito{" "}
        <br className="d-none d-md-block" />
        ayudándonos a responder estas preguntas:
      </p>
      <FormField
        label="Correo electrónico"
        type="email"
        placeholder="Escribe tu correo electrónico"
        name="userEmail"
        value={state.values.userEmail}
        error={state.errors.userEmail}
        touched={state.touched.userEmail}
        onChange={onChangeField}
        onFocus={onFocusField}
      />
      <FormField
        label="Nombre completo"
        type="text"
        placeholder="Escribe tu nombre completo"
        name="userFullName"
        value={state.values.userFullName}
        error={state.errors.userFullName}
        touched={state.touched.userFullName}
        onChange={onChangeField}
        onFocus={onFocusField}
      />
      <FormField
        label="Número de teléfono"
        placeholder="Escribe tu número de teléfono"
        name="cellphoneNumber"
        error={state.errors.cellphoneNumber}
        touched={state.touched.cellphoneNumber}
      >
        <PhoneInput
          enableSearch={true}
          country={state.values.cellphoneCountryCode}
          value={state.values.cellphoneNumber}
          inputClass={
            state.errors.cellphoneNumber && state.touched.cellphoneNumber
              ? "border-danger"
              : ""
          }
          onChange={onCellphoneChange}
          onFocus={onFocusField}
        />
      </FormField>
      <div className="col-6 d-none d-md-block"></div>
      <FormField
        label="¿Con cuál Famoso te gustaría tener una video llamada?"
        type="text"
        placeholder="Escribe el nombre del famoso"
        name="celebrityName"
        value={state.values.celebrityName}
        error={state.errors.celebrityName}
        touched={state.touched.celebrityName}
        onChange={onChangeField}
        onFocus={onFocusField}
      />
      <FormField
        label="¿Cuánto estarías dispuesto a pagar por cada minuto en la video
        llamada?"
        error={state.errors.desiredPrice}
        touched={state.touched.desiredPrice}
      >
        <Form.Control
          as="select"
          name="desiredPrice"
          value={state.values.desiredPrice}
          className={
            state.errors.desiredPrice && state.touched.desiredPrice
              ? "border-danger"
              : ""
          }
          onChange={onChangeField}
        >
          <option value="" selected>
            Seleccione...
          </option>
          <option value="1-3">De 1 dólar a 3 dólares.</option>
          <option value="4-7">De 4 dólares a 7 dólares.</option>
          <option value="8-12">De 8 dólares a 12 dólares.</option>
          <option value="13+">13 dólares o más.</option>
        </Form.Control>
      </FormField>
    </Form>
  );
};

const mapStateToProps = ({ session }) => ({
  userData: session.getSessionReducer.data
});

const _VideoCallsResearchForm = connect(mapStateToProps)(
  VideoCallsResearchForm
);

export { _VideoCallsResearchForm as VideoCallsResearchForm };
