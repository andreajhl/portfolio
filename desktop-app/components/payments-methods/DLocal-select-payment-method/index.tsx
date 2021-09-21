import SubmitButton from "desktop-app/components/common/button/submit-button";
import Maybe from "desktop-app/components/common/helpers/maybe";
import WarningMessage from "desktop-app/components/common/warning-message";
import React, { useRef, useState } from "react";
import { analytics } from "react-app/src/state/utils/gtm";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import styles from "./styles.module.scss";

type DLocalSelectPaymentMethodProps = {
  paymentMethodType: string;
  paymentsMethodsAvailable: Array<{
    brand: string;
    id: number;
    identifier: string;
    logo: string;
    name: string;
    redirect: boolean;
  }>;
  onStartPayment: (option: { name: string; paymentMethodId: string }) => void;
  disabled: boolean;
  paymentInProcess: boolean;
};

const messages = defineMessages({
  errorNotPaymentMethodSelected: {
    defaultMessage: "Por favor seleccione un método de pago",
  },
});

function DLocalSelectPaymentMethod({
  paymentsMethodsAvailable,
  paymentMethodType,
  disabled,
  paymentInProcess,
  onStartPayment,
}: DLocalSelectPaymentMethodProps) {
  const { formatMessage } = useIntl();
  const inputLabel = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentOption, setCurrentOption] = useState({
    name: "",
    paymentMethodId: "",
  });

  const handleChangePaymentMethod = (name, paymentMethodId) => {
    setErrorMessage("");
    setCurrentOption({ name: name, paymentMethodId: paymentMethodId });
    analytics.track("CHANGE_DLOCAL_PAYMENT_METHOD", {
      name: name,
      paymentMethodId: paymentMethodId,
      paymentMethodType,
      widget: "DLocalSelectPaymentMethod",
    });
  };

  const isMissingOptionSelected = () =>
    Object.values(currentOption).includes("");

  const handleStartPayment = () => {
    if (!isMissingOptionSelected()) {
      onStartPayment(currentOption);
    } else {
      setErrorMessage(formatMessage(messages.errorNotPaymentMethodSelected));
    }
  };

  const isCashPaymentMethod = paymentMethodType === "TICKET";

  return (
    <div className={styles.DLocalSelectPaymentMethodWraper} ref={inputLabel}>
      {paymentsMethodsAvailable.map((paymentMethod, index) => (
        <div>
          <div
            key={`paymentMethod-${paymentMethodType}-${paymentMethod.name}-${index}`}
          >
            <label
              className={styles.Label}
              htmlFor={`paymentMethod-${paymentMethodType}-${paymentMethod.name}-${index}`}
            >
              <span className={styles.RadioInput}>
                <input
                  type="radio"
                  name={`paymentMethod-${paymentMethodType}`}
                  value={paymentMethod.name}
                  checked={currentOption.name === paymentMethod.name}
                  onChange={() =>
                    handleChangePaymentMethod(
                      paymentMethod.name,
                      paymentMethod.id
                    )
                  }
                  id={`paymentMethod-${paymentMethodType}-${paymentMethod.name}-${index}`}
                />
                <span className={styles.RadioControl} />
              </span>
              {index < 3 ? (
                <img
                  alt="Card Logo"
                  style={{
                    position: "absolute",
                    left: "90%",
                  }}
                  className="rounded-circle"
                  height="30px"
                  src={paymentMethod.logo}
                />
              ) : null}
              <span className={styles.RadioLabel}>{paymentMethod.name}</span>
            </label>
          </div>
        </div>
      ))}
      <Maybe it={isCashPaymentMethod}>
        <p className={styles.CashPaymentMethodCopy}>
          <FormattedMessage defaultMessage="Por políticas de la pasarela, una vez generado tu ticket, dispones de máximo 3 días calendario (naturales) para pagar, la validación del pago puede tardar hasta 3 días hábiles." />
        </p>
      </Maybe>
      <Maybe it={errorMessage !== ""}>
        <WarningMessage
          className={styles.WarningMessage}
          message={errorMessage}
        />
      </Maybe>
      <SubmitButton
        type="button"
        disabled={disabled}
        onClick={(e) => handleStartPayment()}
        loading={paymentInProcess}
      >
        {paymentInProcess ? (
          <FormattedMessage defaultMessage="Procesando" />
        ) : (
          <FormattedMessage defaultMessage="Pagar" />
        )}
      </SubmitButton>
    </div>
  );
}

export default DLocalSelectPaymentMethod;
