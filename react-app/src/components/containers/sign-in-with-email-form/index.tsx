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

const initialRequestErrorValue = null;

function notifyClickOnSignIn(email: string) {
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
  const {
    values,
    errors,
    setFieldValue,
    onChangeField,
    validateBeforeSubmit,
  } = useForm({
    initialValues: getInitialValues(email),
    validations: getValidations(formatMessage),
    onSubmit,
  });

  const [requestError, setRequestError] = useState(initialRequestErrorValue);
  const { handle, status } = usePromise();
  const isLoading = status === "loading";

  function onSubmit(formValues: FormValuesType) {
    if (isLoading) return;
    resetRequestError();
    notifyClickOnSignIn(formValues.email);
    requestSignIn(formValues);
  }

  function resetRequestError() {
    setRequestError(initialRequestErrorValue);
  }

  function setTranslatedRequestError(error: any) {
    const errorTranslation = TRANSLATION_LOGIN_ERROR_MESSAGES[error];
    const unexpectedError = formatMessage(
      TRANSLATION_LOGIN_ERROR_MESSAGES.unexpectedError
    );
    const translatedError = errorTranslation
      ? formatMessage(errorTranslation)
      : error || unexpectedError;
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
        onChange={onChangeField}
        error={errors.email}
        formNoValidate
      />
      <AuthPasswordField
        autoComplete="current-password"
        name="current-password"
        label={<FormattedMessage defaultMessage="Contraseña" />}
        placeholder="**********"
        value={values.password}
        error={errors.password}
        onChange={changePasswordValue}
      />
      <button
        type="submit"
        className={classes("btn btn-primary", styles.SignInBoxSubmitButton)}
        disabled={isLoading}
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
