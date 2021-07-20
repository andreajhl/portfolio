import Maybe from "desktop-app/components/common/helpers/maybe";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import WarningMessage from "desktop-app/components/common/warning-message";
import React, { useRef, useState } from "react";
import { LoaderLayout } from "react-app/src/components/layouts/loader";
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
      <Maybe it={errorMessage !== ""}>
        <WarningMessage
          className={styles.WarningMessage}
          message={errorMessage}
        />
      </Maybe>
      <button
        onClick={(e) => handleStartPayment()}
        disabled={disabled}
        className="btn btn-primary"
        style={{
          backgroundColor: `${paymentInProcess ? "white" : "#FB177D"}`,
          height: "50px",
          borderRadius: "10px",
          width: "100%",
        }}
      >
        <SubmitText
          baseText={
            paymentInProcess ? (
              <FormattedMessage defaultMessage="Procesando" />
            ) : (
              <FormattedMessage defaultMessage="Pagar" />
            )
          }
          status={paymentInProcess ? "loading" : "idle"}
        />
      </button>
    </div>
  );
}

export default DLocalSelectPaymentMethod;
