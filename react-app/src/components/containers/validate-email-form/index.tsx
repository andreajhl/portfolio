import { useState } from "react";
import styles from "./styles.module.scss";
import {
  defineMessages,
  FormattedMessage,
  IntlFormatters,
  useIntl,
} from "react-intl";
import { AuthFormField } from "../../layouts/auth-form-field";
import classes from "classnames";
import { TRANSLATION_RESET_PASSSWORD_MESSAGES } from "react-app/src/constants/messages";
import { SubmitText } from "../../common/widgets/submit-button-text";
import useForm from "lib/hooks/useForm";
import { analytics } from "react-app/src/state/utils/gtm";
import { validateEmailSecurityCode } from "lib/famosos-auth";
import usePromise from "lib/hooks/usePromise";
import { CollapsibleErrorMessage } from "../../common/widgets/collapsible-error-message";
import Maybe from "../../common/helpers/maybe";
import { ResendSecurityCode } from "../resend-security-code";
import { useEffect } from "react";

const messages = defineMessages({
  emptySecurityCodeErro: {
    defaultMessage: "Debes introducir un código de validación",
  },
});

const initialRequestErrorValue = null;

function trackClickOnValidateEmailSecurityCode(email: string) {
  analytics.track("CLICK_ON_VALIDATE_EMAIL_SECURITY_CODE", {
    email,
  });
}

const initialValues = {
  securityCode: "",
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
    securityCode(value: string) {
      if (value === "") {
        return formatMessage(messages.emptySecurityCodeErro);
      }
    },
  };
}

type ValidateEmailFormProps = {
  className?: string;
  initialValues?: InitialValuesType;
  email: string;
  onGoBackButtonClick?: () => void;
  onValidationSuccess?: () => void;
};

function ValidateEmailForm({
  className,
  initialValues: initialValuesFromProps,
  email,
  onGoBackButtonClick,
  onValidationSuccess,
}: ValidateEmailFormProps) {
  const { formatMessage } = useIntl();
  const { values, errors, onChangeField, validateBeforeSubmit } = useForm({
    initialValues: getInitialValues(initialValuesFromProps),
    validations: getValidations(formatMessage),
    onSubmit,
  });

  const [requestError, setRequestError] = useState(initialRequestErrorValue);
  const { handle, status } = usePromise();
  const isLoading = status === "loading";

  function onSubmit(formValues: FormValuesType) {
    if (isLoading) return;
    resetRequestError();
    trackClickOnValidateEmailSecurityCode(email);
    requestValidateEmailSecurityCode(formValues);
  }

  function resetRequestError() {
    setRequestError(initialRequestErrorValue);
  }

  function setTranslatedRequestError(error: any) {
    const errorMessage =
      error?.response?.data?.error || error?.message || error;
    const errorTranslation = TRANSLATION_RESET_PASSSWORD_MESSAGES[errorMessage];
    const unexpectedError = formatMessage(
      TRANSLATION_RESET_PASSSWORD_MESSAGES.unexpectedError
    );
    const translatedError = errorTranslation
      ? formatMessage(errorTranslation)
      : errorMessage || unexpectedError;
    setRequestError(translatedError);
  }

  async function requestValidateEmailSecurityCode({
    securityCode,
  }: FormValuesType) {
    try {
      await handle(
        validateEmailSecurityCode({
          email,
          securityCode,
        })
      );
      onValidationSuccess?.();
    } catch (error) {
      setTranslatedRequestError(error);
    }
  }

  const disableForm = isLoading || status === "completed";

  return (
    <form
      onSubmit={validateBeforeSubmit}
      onChange={resetRequestError}
      className={className}
    >
      <Maybe it={typeof onGoBackButtonClick === "function"}>
        <button
          type="button"
          className={classes("btn", styles.GoBackButton)}
          onClick={onGoBackButtonClick}
        >
          <i className="fa fa-arrow-left" />
          <span>
            <FormattedMessage defaultMessage="Volver" />
          </span>
        </button>
      </Maybe>
      <h3 className={styles.ValidateEmailFormTitle}>
        <FormattedMessage
          defaultMessage="Ingresa el código que enviamos a {email}"
          values={{ email }}
        />
      </h3>
      <AuthFormField
        name="securityCode"
        label={<FormattedMessage defaultMessage="Código de seguridad" />}
        placeholder="123456"
        value={values.securityCode}
        onChange={onChangeField}
        disabled={disableForm}
        error={errors.securityCode}
        autoComplete="off"
      />

      <button
        type="submit"
        className={classes(
          "btn btn-primary",
          styles.ValidateEmailFormSubmitButton
        )}
        disabled={disableForm}
      >
        <SubmitText
          baseText={<FormattedMessage defaultMessage="Continuar" />}
          status={status}
        />
      </button>
      <span
        style={{
          fontSize: "12px",
        }}
      >
        <FormattedMessage defaultMessage="Es posible que tu código haya llegado a tu carpeta de spam" />
      </span>
      <CollapsibleErrorMessage
        className={styles.ValidateEmailFormErrorMessage}
        errorMessage={requestError}
        unmountOnExit
      />
      <ResendSecurityCode
        className={styles.ValidateEmailFormResendCodeButton}
        email={email}
      />
    </form>
  );
}

export { ValidateEmailForm };
