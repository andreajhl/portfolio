import { useEffect, useState } from "react";
import classes from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./styles.module.scss";
import usePromise from "lib/hooks/usePromise";
import { sendSecurityCode } from "lib/famosos-auth";
import { CollapsibleErrorMessage } from "../../common/widgets/collapsible-error-message";
import { TRANSLATION_RESET_PASSSWORD_MESSAGES } from "react-app/src/constants/messages";
import { analytics } from "react-app/src/state/utils/gtm";
import getWindow from "react-app/src/utils/getWindow";

function trackClickOnResendSecurityCode(email: string) {
  analytics.track("CLICK_ON_RESEND_SECURITY_CODE", {
    widget: "ResendSecurityCode",
    path: getWindow()?.location?.pathname,
    email
  });
}

function getIconFromStatus(status: string) {
  if (status === "loading") {
    return <i className={classes("fa fa-circle-notch", styles.Spinner)} />;
  }

  if (status === "completed") {
    return <i className={classes("fa fa-check", styles.Check)} />;
  }
  return null;
}

const SECONDS = 60;
const initialRequestError = null;

type ResendSecurityCodeType = {
  className?: string;
  email: string;
};

export function ResendSecurityCode({
  className,
  email
}: ResendSecurityCodeType) {
  const { handle, status, setStatus } = usePromise();
  const [requestError, setRequestError] = useState(initialRequestError);
  const [canResendCode, setCanResendCode] = useState(true);
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (canResendCode) return;
    const timeout = setTimeout(function resetState() {
      setCanResendCode(true);
      setStatus("idle");
      setRequestError(initialRequestError);
    }, SECONDS * 1000);

    return () => {
      if (typeof timeout !== "number") return;
      clearTimeout(timeout);
    };
  }, [canResendCode]);

  function setTranslatedError(error: any) {
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

  async function requestResendSecurityCode() {
    if (!canResendCode) return;
    trackClickOnResendSecurityCode(email);
    setCanResendCode(false);
    try {
      await handle(sendSecurityCode(email));
    } catch (error) {
      setTranslatedError(error);
    }
  }

  const icon = getIconFromStatus(status);
  return (
    <>
      <p className={styles.ResendSecurityCode}>
        <FormattedMessage defaultMessage="¿No recibiste un código?" />
        <button
          className={classes(
            "btn btn-link",
            styles.ResendSecurityCodeButton,
            className
          )}
          type="button"
          onClick={requestResendSecurityCode}
          disabled={!canResendCode}
        >
          <FormattedMessage defaultMessage="Reenviar" />
          {icon}
        </button>
      </p>
      <CollapsibleErrorMessage
        unmountOnExit
        className={styles.ResendSecurityCodeError}
        errorMessage={requestError}
      />
    </>
  );
}
