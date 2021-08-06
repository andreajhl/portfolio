import React, { useState } from "react";
import styles from "./styles.module.scss";
import TriggerPopupEditButton from "desktop-app/components/common/trigger-popup-edit-button";
import InputWithUpperLabel from "desktop-app/components/common/form/input-with-upper-label";
import { CheckedCircleIcon } from "desktop-app/components/common/icons";
import classes from "classnames";
import { CloseModalButton } from "desktop-app/components/common/button/close-modal-button";
import {
  defineMessage,
  defineMessages,
  FormattedMessage,
  useIntl,
} from "react-intl";

const messages = defineMessages({
  inputEmailPlaceholder: {
    defaultMessage: "Correo electrónico nuevo",
  },
  inputEmailLabel: {
    defaultMessage: "Ingresa una nueva dirección de correo electrónico",
  },
  inputNewEmailPlaceholder: {
    defaultMessage: "Correo electrónico nuevo",
  },
  inputNewEmailLabel: {
    defaultMessage: "Ingresa el código de seguridad que enviamos a tu correo",
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
        <FormattedMessage defaultMessage="Cambiar correo electrónico" />
      </p>
    </div>
  );
}

function UpdateUserEmailPopupForm({ closeModal }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { formatMessage } = useIntl();

  if (currentStep === 0) {
    return (
      <div className={styles.UpdateUserEmailPopup}>
        <HeaderPopup closeModal={closeModal} />
        <div className={styles.InputFields}>
          <InputWithUpperLabel
            inputId="user_email"
            label={formatMessage(messages.inputEmailLabel)}
            placeholder={formatMessage(messages.inputEmailPlaceholder)}
            value="isaac.pr99@gmail.com"
            onChange={(value) => console.log(value)}
          ></InputWithUpperLabel>
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
      <div className={styles.UpdateUserEmailPopup}>
        <HeaderPopup closeModal={closeModal} />
        <div className={styles.InputFields}>
          <InputWithUpperLabel
            inputId="email_code"
            label="Ingresa el código de seguridad que enviamos a tu correo"
            placeholder="Correo electrónico nuevo"
            value=""
            onChange={(value) => console.log(value)}
          ></InputWithUpperLabel>
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
      <div className={styles.UpdateUserEmailPopup}>
        <CloseModalButton
          variant="light"
          className={styles.CloseButton}
          onClick={closeModal}
        />
        <div className={styles.SuccessMessage}>
          <CheckedCircleIcon />
          <span>
            <FormattedMessage defaultMessage="Tu correo electrónico se ha actualizado {breakLine} correctamente." />
          </span>
        </div>
      </div>
    );
  }
}

type UpdateUserEmailProps = {
  email: string;
};

const labelMessage = defineMessage({ defaultMessage: "Correo Electrónico" });

function UpdateUserEmail({ email }: UpdateUserEmailProps) {
  const { formatMessage } = useIntl();

  return (
    <TriggerPopupEditButton
      label={formatMessage(labelMessage)}
      value={email}
      popupContent={(closeModal) => (
        <UpdateUserEmailPopupForm closeModal={closeModal} />
      )}
      disabledEdit={true}
    ></TriggerPopupEditButton>
  );
}

export default UpdateUserEmail;
