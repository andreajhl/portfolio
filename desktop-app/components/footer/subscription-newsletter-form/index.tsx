import InputWithSubmitHandler from "desktop-app/components/common/form/InputWithSubmitHandler";
import { CollapsibleErrorMessage } from "desktop-app/components/common/widgets/collapsible-error-message";
import useForm from "lib/hooks/useForm";
import isEmail from "validator/lib/isEmail";
import styles from "./styles.module.scss";
import classes from "classnames";
import { newsletterSubscribe } from "react-app/src/state/ducks/authentication/actions";
import { FormattedMessage } from "react-intl";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import Maybe from "desktop-app/components/common/helpers/maybe";
import usePromise from "../../../../lib/hooks/usePromise";

const getErrorMessage = (error: any) =>
  error?.response?.data?.error === "email already subscribed" ? (
    <FormattedMessage defaultMessage="Este correo electrónico ya se encuentra suscrito" />
  ) : (
    error.message
  );

const initialValues = {
  email: "",
};

const validations = {
  email(value: string) {
    if (!isEmail(value)) {
      return (
        <FormattedMessage defaultMessage="Debes introducir un correo electrónico valido" />
      ) as any;
    }
  },
};

function SubscriptionNewsletterForm() {
  const { handle, status } = usePromise();
  const { values, setFieldValue, setFieldError, errors, submitForm } = useForm({
    initialValues,
    validations,
    validateOnChange: false,
    onSubmit: subscribeEmailToNewsletter,
  });

  async function subscribeEmailToNewsletter({ email }) {
    if (status === "loading") return;
    try {
      await handle(newsletterSubscribe(email));
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setFieldError("email", errorMessage);
    }
  }

  function setEmailValue(value: string): any {
    setFieldValue("email", value);
  }

  const error = errors.email;
  const hasError = Boolean(error);
  const isCompleted = status === "completed";

  return (
    <div className={styles.SubscriptionNewsletterForm}>
      <p>
        <FormattedMessage defaultMessage="Entérate de nuestras últimas noticias y promociones" />
      </p>
      <div className={styles.SubscriptionNewsLetterFormInputElement}>
        <InputWithSubmitHandler
          onSubmit={submitForm}
          inputValue={values.email}
          setInputValue={setEmailValue}
          placeHolderInput="E-mail"
          placeHolderButton={
            <SubmitText
              baseText={<FormattedMessage defaultMessage="Suscribirme" />}
              status={status}
            />
          }
          className={classes(
            styles.SubscriptionNewsLetterFormInputElementModifier,
            hasError && styles.InputError
          )}
          btnType="btn-secondary"
        />
        <CollapsibleErrorMessage
          className={styles.ErrorMessage}
          errorMessage={error}
        />
        <Maybe it={isCompleted}>
          <span className={styles.SuccessMessage}>
            <i className="fa fa-check-circle" />
            <FormattedMessage defaultMessage="Te has suscrito exitosamente" />
          </span>
        </Maybe>
      </div>
    </div>
  );
}

export default SubscriptionNewsletterForm;
