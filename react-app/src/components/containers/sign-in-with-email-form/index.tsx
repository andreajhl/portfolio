import React, { useState } from "react";
import { analytics } from "../../../state/utils/gtm";
import isEmail from "validator/lib/isEmail";
import styles from "./styles.module.scss";
import { FormattedMessage, IntlFormatters, useIntl } from "react-intl";
import { AuthFormField } from "../../layouts/auth-form-field";
import classes from "classnames";
import { TRANSLATION_LOGIN_ERROR_MESSAGES } from "react-app/src/constants/messages";
import { SubmitText } from "../../common/widgets/submit-button-text";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import usePromise from "lib/hooks/usePromise";
import { CollapsibleErrorMessage } from "../../common/widgets/collapsible-error-message";
import { signInWithEmailAndPassword } from "lib/famosos-auth";
import { AuthPasswordField } from "../../layouts/auth-password-field";
import useAuthenticationEmail from "lib/hooks/useAuthenticationEmail";

const initialRequestErrorValue = null;

function trackClickOnSignIn(email: string) {
  analytics.track("CLICK_ON_SIGN_IN_WITH_EMAIL_PASSWORD", {
    email,
  });
}

function getInitialValues(email: string) {
  return { email: email || "", password: "" };
}

type FormValuesType = ReturnType<typeof getInitialValues>;

function getValidations(
  formatMessage: IntlFormatters["formatMessage"]
): ValidationsType<FormValuesType> {
  return {
    email(value) {
      if (!isEmail(value)) {
        return formatMessage(TRANSLATION_LOGIN_ERROR_MESSAGES["Invalid email"]);
      }
    },
    password(value) {
      if (value === "") {
        return formatMessage(
          TRANSLATION_LOGIN_ERROR_MESSAGES["Password field is required"]
        );
      }
    },
  };
}

type SignInEmailPasswordFormProps = {
  email: string;
};

function SignInEmailPasswordForm({ email }: SignInEmailPasswordFormProps) {
  const { formatMessage } = useIntl();
  const { values, errors, setFieldValue, validateBeforeSubmit } = useForm({
    initialValues: getInitialValues(email),
    validations: getValidations(formatMessage),
    onSubmit,
  });

  const setAuthEmail = useAuthenticationEmail()[1];

  const [requestError, setRequestError] = useState(initialRequestErrorValue);
  const { handle, status } = usePromise();
  const isLoading = status === "loading";

  function onSubmit(formValues: FormValuesType) {
    if (isLoading) return;
    resetRequestError();
    trackClickOnSignIn(formValues.email);
    requestSignIn(formValues);
  }

  function resetRequestError() {
    setRequestError(initialRequestErrorValue);
  }

  function setTranslatedRequestError(error: any) {
    const errorMessage = error?.message || error;
    const errorTranslation = TRANSLATION_LOGIN_ERROR_MESSAGES[errorMessage];
    const unexpectedError = formatMessage(
      TRANSLATION_LOGIN_ERROR_MESSAGES.unexpectedError
    );
    const translatedError = errorTranslation
      ? formatMessage(errorTranslation)
      : errorMessage || unexpectedError;
    setRequestError(translatedError);
  }

  async function requestSignIn(formValues: FormValuesType) {
    try {
      await handle(signInWithEmailAndPassword(formValues));
    } catch (error) {
      setTranslatedRequestError(error);
    }
  }

  function changePasswordValue({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setFieldValue("password", value);
  }

  function changeEmailValue({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setFieldValue("email", value);
    setAuthEmail(value);
  }

  const disableForm = isLoading || status === "completed";

  return (
    <form onSubmit={validateBeforeSubmit}>
      <h3 className={styles.SignInBoxTitle}>
        <FormattedMessage defaultMessage="o ingresa con tu correo electrónico" />
      </h3>
      <AuthFormField
        type="email"
        name="email"
        label={<FormattedMessage defaultMessage="Correo electrónico" />}
        placeholder="usuario@dominio.com"
        value={values.email}
        onChange={changeEmailValue}
        error={errors.email}
        formNoValidate
        disabled={disableForm}
      />
      <AuthPasswordField
        autoComplete="current-password"
        name="current-password"
        label={<FormattedMessage defaultMessage="Contraseña" />}
        placeholder="**********"
        value={values.password}
        error={errors.password}
        disabled={disableForm}
        onChange={changePasswordValue}
      />
      <button
        type="submit"
        className={classes("btn btn-primary", styles.SignInBoxSubmitButton)}
        disabled={disableForm}
      >
        <SubmitText
          baseText={<FormattedMessage defaultMessage="Ingresar" />}
          status={status}
        />
      </button>
      <CollapsibleErrorMessage
        className={styles.SignInErrorMessage}
        errorMessage={requestError}
        unmountOnExit
      />
    </form>
  );
}

export { SignInEmailPasswordForm };
