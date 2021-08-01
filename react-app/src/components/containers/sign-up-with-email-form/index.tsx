import { useState } from "react";
import styles from "./styles.module.scss";
import { FormattedMessage, IntlFormatters, useIntl } from "react-intl";
import { AuthFormField } from "../../layouts/auth-form-field";
import classes from "classnames";
import FormCheck from "react-bootstrap/FormCheck";
import Maybe from "../../common/helpers/maybe";
import { TRANSLATION_SIGN_UP_ERROR_MESSAGES } from "react-app/src/constants/messages";
import { SubmitText } from "../../common/widgets/submit-button-text";
import useForm from "lib/hooks/useForm";
import { analytics } from "react-app/src/state/utils/gtm";
import { signUpWithEmailAndPassword } from "lib/famosos-auth";
import usePromise from "lib/hooks/usePromise";
import { CollapsibleErrorMessage } from "../../common/widgets/collapsible-error-message";
import { getDateValidator, getEmailValidator } from "lib/validations/common";
import getAge from "lib/utils/getAge";

const initialRequestErrorValue = null;

function trackClickOnSignUp(email: string) {
  analytics.track("CLICK_ON_SIGN_UP_WITH_EMAIL_PASSWORD", {
    email
  });
}

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthDate: "",
  allowNotifications: true
};

type FormValuesType = typeof initialValues;
type InitialValuesType = {
  [Property in keyof FormValuesType]?: FormValuesType[Property];
};

function getInitialValues(initialValuesFromProps: InitialValuesType) {
  return Object.assign({}, initialValues, initialValuesFromProps);
}

function getValidations(formatMessage: IntlFormatters["formatMessage"]) {
  return {
    fullName(value: string) {
      if (value === "") {
        return formatMessage(
          TRANSLATION_SIGN_UP_ERROR_MESSAGES["Name field is required"]
        );
      }
    },
    email: getEmailValidator(formatMessage),
    password(value: string) {
      if (value.length < 6) {
        return formatMessage(
          TRANSLATION_SIGN_UP_ERROR_MESSAGES[
            "Password length must contains least 6 characters"
          ]
        );
      }
    },
    confirmPassword(value: string, { values: { password } }) {
      if (value !== password) {
        return formatMessage(
          TRANSLATION_SIGN_UP_ERROR_MESSAGES["Passwords do not match"]
        );
      }
    },
    birthDate(value: string) {
      const dateValidationError = getDateValidator(formatMessage)(value);
      if (dateValidationError) return dateValidationError;
      if (getAge(value) < 13) {
        return formatMessage(
          TRANSLATION_SIGN_UP_ERROR_MESSAGES.under13YearsOld
        );
      }
    }
  };
}

export type SignUpEmailPasswordFormProps = {
  willRedirect: boolean;
  initialValues?: InitialValuesType;
  onSignUpSuccess?: (signUpDate: FormValuesType) => void;
};

function SignUpEmailPasswordForm({
  willRedirect,
  initialValues: initialValuesFromProps,
  onSignUpSuccess
}: SignUpEmailPasswordFormProps) {
  const { formatMessage, locale } = useIntl();
  const {
    values,
    errors,
    setFieldValue,
    onChangeField,
    validateBeforeSubmit
  } = useForm({
    initialValues: getInitialValues(initialValuesFromProps),
    validations: getValidations(formatMessage),
    onSubmit
  });

  const [requestError, setRequestError] = useState(initialRequestErrorValue);
  const { handle, status } = usePromise();
  const isLoading = status === "loading";
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPasswordState() {
    setShowPassword((previousShowPassword) => !previousShowPassword);
  }

  function onSubmit(formValues: FormValuesType) {
    if (isLoading) return;
    resetRequestError();
    trackClickOnSignUp(formValues.email);
    requestSignUp(formValues);
  }

  function resetRequestError() {
    setRequestError(initialRequestErrorValue);
  }

  function setTranslatedRequestError(error: any) {
    const errorMessage = error?.message || error;
    const errorTranslation = TRANSLATION_SIGN_UP_ERROR_MESSAGES[errorMessage];
    const unexpectedError = formatMessage(
      TRANSLATION_SIGN_UP_ERROR_MESSAGES.unexpectedError
    );
    const translatedError = errorTranslation
      ? formatMessage(errorTranslation)
      : errorMessage || unexpectedError;
    setRequestError(translatedError);
  }

  async function requestSignUp(formValues: FormValuesType) {
    try {
      const { confirmPassword, ...signUpData } = formValues;
      await handle(
        signUpWithEmailAndPassword({
          ...signUpData,
          locale
        })
      );
      onSignUpSuccess(formValues);
    } catch (error) {
      setTranslatedRequestError(error);
    }
  }

  function changePasswordValue({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) {
    setFieldValue("password", value);
  }

  function changeFullNameValue({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) {
    setFieldValue("fullName", value);
  }

  function toggleAllowNotifications() {
    setFieldValue("allowNotifications", !values.allowNotifications);
  }

  const disableForm = isLoading || status === "completed";

  return (
    <form onSubmit={validateBeforeSubmit} onChange={resetRequestError}>
      <h3 className={styles.SignUpBoxTitle}>
        <FormattedMessage defaultMessage="o regístrate con tu correo electrónico" />
      </h3>
      <AuthFormField
        name="name"
        label={<FormattedMessage defaultMessage="Nombre" />}
        placeholder="Marcos"
        value={values.fullName}
        onChange={changeFullNameValue}
        disabled={disableForm}
        error={errors.fullName}
      />
      <AuthFormField
        name="birthDate"
        type="date"
        label={<FormattedMessage defaultMessage="Fecha de nacimiento" />}
        placeholder="DD / MM / AA"
        value={values.birthDate}
        onChange={onChangeField}
        disabled={disableForm}
        error={errors.birthDate}
      />
      <AuthFormField
        type="email"
        name="email"
        label={<FormattedMessage defaultMessage="Correo electrónico" />}
        placeholder="usuario@dominio.com"
        value={values.email}
        onChange={onChangeField}
        disabled={disableForm}
        formNoValidate
        error={errors.email}
      />
      <AuthFormField
        autoComplete="new-password"
        name="new-password"
        type={showPassword ? "text" : "password"}
        label={<FormattedMessage defaultMessage="Contraseña" />}
        placeholder="**********"
        value={values.password}
        onChange={changePasswordValue}
        onIconClick={toggleShowPasswordState}
        disabled={disableForm}
        error={errors.password}
        iconElement={
          showPassword ? (
            <i className="fas fa-eye-slash cursor-pointer" />
          ) : (
            <i className="fas fa-eye cursor-pointer" />
          )
        }
      />
      <AuthFormField
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        label={<FormattedMessage defaultMessage="Confirmar" />}
        placeholder="**********"
        value={values.confirmPassword}
        onChange={onChangeField}
        disabled={disableForm}
        error={errors.confirmPassword}
      />
      <FormCheck
        id="accept-offers-and-benefits"
        name="allowNotifications"
        className={styles.SignUpBoxSwitcher}
        type="switch"
        label={
          <FormattedMessage defaultMessage="Quiero recibir ofertas y beneficios exclusivos." />
        }
        checked={values.allowNotifications}
        onChange={toggleAllowNotifications}
        disabled={disableForm}
      />
      <button
        type="submit"
        className={classes("btn btn-primary", styles.SignUpBoxSubmitButton)}
        disabled={disableForm}
      >
        <SubmitText
          baseText={
            <Maybe
              it={willRedirect}
              orElse={<FormattedMessage defaultMessage="Registrarme" />}
            >
              <FormattedMessage defaultMessage="Registrarme y continuar" />
            </Maybe>
          }
          status={status}
        />
      </button>
      <CollapsibleErrorMessage
        className={styles.SignUpErrorMessage}
        errorMessage={requestError}
        unmountOnExit
      />
    </form>
  );
}

export { SignUpEmailPasswordForm };
