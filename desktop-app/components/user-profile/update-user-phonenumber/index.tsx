import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TriggerPopupEditButton from "desktop-app/components/common/trigger-popup-edit-button";
import InputWithUpperLabel from "desktop-app/components/common/form/input-with-upper-label";
import { CheckedCircleIcon } from "desktop-app/components/common/icons";
import classes from "classnames";
import { CellphoneNumberInput } from "desktop-app/components/common/form/cellphone-number-input";
import { CloseModalButton } from "desktop-app/components/common/button/close-modal-button";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

const messages = defineMessages({
  emailCodeLabel: {
    defaultMessage: "Ingresa el código de seguridad que enviamos a tu celular",
  },
  emailCodePlaceholder: {
    defaultMessage: "Código de seguridad",
  },
});

function HeaderPopup({ closeModal }) {
  return (
    <div className={styles.HeaderPopupWrapper}>
      <CloseModalButton
        variant="light"
        className={styles.CloseButton}
        onClick={closeModal}
      />
      <p>
        <FormattedMessage defaultMessage="Cambiar número de celular" />
      </p>
    </div>
  );
}

function UpdateUserPhonePopupForm({ closeModal }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const { formatMessage } = useIntl();
  if (currentStep === 0) {
    return (
      <div className={styles.UpdateUserPhonePopup}>
        <HeaderPopup closeModal={closeModal} />
        <div className={styles.InputFields}>
          <CellphoneNumberInput
            value={phoneNumber}
            onChange={(value) => {
              console.log(value);
            }}
          />
          <button
            onClick={() => setCurrentStep(1)}
            className={classes("btn btn-primary", styles.CTAButton)}
          >
            <FormattedMessage defaultMessage="Continuar" />
          </button>
        </div>
      </div>
    );
  }
  if (currentStep === 1) {
    return (
      <div className={styles.UpdateUserPhonePopup}>
        <HeaderPopup closeModal={closeModal} />
        <div className={styles.InputFields}>
          <InputWithUpperLabel
            inputId="email_code"
            label={formatMessage(messages.emailCodeLabel)}
            placeholder={formatMessage(messages.emailCodePlaceholder)}
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
          />
          <button
            onClick={() => setCurrentStep(2)}
            className={classes("btn btn-primary", styles.CTAButton)}
          >
            <FormattedMessage defaultMessage="Enviar" />
          </button>
        </div>
      </div>
    );
  }
  if (currentStep === 2) {
    return (
      <div className={styles.UpdateUserPhonePopup}>
        <CloseModalButton
          variant="light"
          className={styles.CloseButton}
          onClick={closeModal}
        />
        <div className={styles.SuccessMessage}>
          <CheckedCircleIcon />
          <span>
            <FormattedMessage
              defaultMessage="Tu número de celular se ha actualizado {breakLine}
            correctamente."
              values={{
                breakLine: <br />,
              }}
            />
          </span>
        </div>
      </div>
    );
  }
}

type UpdateUserPhoneProps = {
  numberPhone: string;
};
function UpdateUserPhone({ numberPhone }: UpdateUserPhoneProps) {
  return (
    <TriggerPopupEditButton
      label="Celular"
      value={numberPhone}
      popupContent={(closeModal) => (
        <UpdateUserPhonePopupForm closeModal={closeModal} />
      )}
    ></TriggerPopupEditButton>
  );
}

export default UpdateUserPhone;
