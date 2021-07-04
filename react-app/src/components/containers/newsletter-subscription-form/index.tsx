import useForm from "lib/hooks/useForm";
import {
  ComponentPropsWithRef,
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState
} from "react";
import { CollapsibleErrorMessage } from "react-app/src/components/common/widgets/collapsible-error-message";
import {
  defineMessages,
  FormattedMessage,
  IntlFormatters,
  useIntl
} from "react-intl";
import styles from "./styles.module.scss";
import isEmail from "validator/lib/isEmail";
import isDate from "validator/lib/isDate";
import usePromise from "lib/hooks/usePromise";
import classes from "classnames";
import { SubmitText } from "react-app/src/components/common/widgets/submit-button-text";
import { saveUserNewsletter } from "react-app/src/state/ducks/session/actions";
import { analytics } from "react-app/src/state/utils/gtm";
import getWindow from "react-app/src/utils/getWindow";
import useErrorFocus from "lib/hooks/useErrorFocus";

type FieldProps = {
  label: ReactNode;
  name: string;
  error?: string;
} & ComponentPropsWithRef<"input">;

export type FieldRef = HTMLInputElement;

const Field = forwardRef<FieldRef, FieldProps>(
  ({ label, name, error, ...inputProps }, ref) => {
    return (
      <div className={styles.Field}>
        <label htmlFor={name} className={styles.Label}>
          {label}
        </label>
        <input ref={ref} className={styles.Input} name={name} {...inputProps} />
        <CollapsibleErrorMessage
          unmountOnExit
          errorMessage={error}
          className={styles.ErrorMessage}
        />
      </div>
    );
  }
);

const ALREADY_SUBSCRIBE_ERROR = "Este correo ya está suscrito al newsletter";

const messages = defineMessages({
  invalidEmail: {
    defaultMessage: "Debes introducir un correo electrónico valido"
  },
  emptyBirthday: {
    defaultMessage: "Debes introducir una fecha"
  },
  invalidBirthday: {
    defaultMessage: "Debes introducir una fecha valida. Ejemplo: 2020-06-25"
  },
  requestError: {
    defaultMessage: "Ha ocurrido un error realizando el registro"
  },
  alreadySubscribedError: {
    defaultMessage: "Este correo ya está suscrito al newsletter"
  }
});

const initialValues = {
  email: "",
  birthDate: ""
};

function getValidations(formatMessage: IntlFormatters["formatMessage"]) {
  return {
    email(value: string) {
      if (!isEmail(value)) {
        return formatMessage(messages.invalidEmail);
      }
    },
    birthDate(value: string) {
      if (value === "") {
        return formatMessage(messages.emptyBirthday);
      }
      if (!isDate(value)) {
        return formatMessage(messages.invalidBirthday);
      }
    }
  };
}

type NewsletterSubscriptionFormProps = {
  className?: string;
  versionPopup?: string;
  onCompleted?: () => void;
};

function NewsletterSubscriptionForm({
  className,
  versionPopup,
  onCompleted
}: NewsletterSubscriptionFormProps) {
  const { formatMessage } = useIntl();
  const { handle, status } = usePromise();
  const [requestError, setRequestError] = useState(null);

  const { values, errors, onChangeField, submitForm, setFieldError } = useForm({
    initialValues,
    validations: getValidations(formatMessage),
    validateOnChange: false,
    onSubmit
  });

  async function onSubmit(formData: typeof initialValues) {
    if (status === "loading") return;
    setRequestError(null);
    try {
      await handle(saveUserNewsletter({ ...formData, versionPopup }));
      onCompleted?.();
    } catch (error) {
      if (error?.message === ALREADY_SUBSCRIBE_ERROR) {
        return setFieldError(
          "email",
          formatMessage(messages.alreadySubscribedError)
        );
      }
      setRequestError(error?.message || formatMessage(messages.requestError));
    }
  }

  useErrorFocus(errors);

  const emailInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    emailInputRef?.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!requestError) return;
    analytics.track("NEWSLETTER_SUBSCRIPTION_REQUEST_ERROR", {
      widget: "NewsletterSubscriptionForm",
      path: getWindow()?.location?.pathname,
      requestError
    });
  }, [requestError]);

  return (
    <form className={className} onSubmit={submitForm}>
      <Field
        ref={emailInputRef}
        value={values.email}
        error={errors.email}
        onChange={onChangeField}
        name="email"
        label={<FormattedMessage defaultMessage="Correo electrónico" />}
        type="email"
      />
      <Field
        value={values.birthDate}
        error={errors.birthDate}
        onChange={onChangeField}
        name="birthDate"
        label={<FormattedMessage defaultMessage="Cumpleaños" />}
        type="date"
      />
      <button
        type="submit"
        className={`btn btn-primary ${styles.SubmitButton}`}
      >
        <SubmitText
          baseText={<FormattedMessage defaultMessage="Registrarme" />}
          status={status}
        />
      </button>
      <CollapsibleErrorMessage
        unmountOnExit
        errorMessage={requestError}
        className={classes(styles.ErrorMessage, styles.RequestErrorMessage)}
      />
    </form>
  );
}

export { NewsletterSubscriptionForm };
