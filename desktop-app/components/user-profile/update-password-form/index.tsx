import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TriggerPopupEditButton from "desktop-app/components/common/trigger-popup-edit-button";
import InputWithUpperLabel from "desktop-app/components/common/form/input-with-upper-label";
import { CheckedCircleIcon } from "desktop-app/components/common/icons";
import classes from "classnames";
import { AnimatedPopup } from "desktop-app/components/common/animated-popup";
import { CloseModalButton } from "desktop-app/components/common/button/close-modal-button";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

function HeaderPopup({ closeModal }) {
  return (
    <div className={styles.HeaderPopupWrapper}>
      <CloseModalButton
        variant="light"
        className={styles.CloseButton}
        onClick={closeModal}
      />
      <p>
        <FormattedMessage defaultMessage="Cambiar contraseña" />
      </p>
    </div>
  );
}

const messages = defineMessages({
  inputNewPasswordPlaceholder: {
    defaultMessage: "Contraseña nueva",
  },
  inputNewPasswordLabel: {
    defaultMessage: "Ingresa una contraseña nueva",
  },
  inputNewPasswordConfirmPlaceholder: {
    defaultMessage: "Contraseña nueva",
  },
  inputNewPasswordConfirmLabel: {
    defaultMessage: "Confirma tu contraseña",
  },
});

function UpdatePasswordFormPopupForm({ closeModal }) {
  const [currentStep, setCurrentStep] = useState(1);
  const { formatMessage } = useIntl();
  if (currentStep === 0) {
    return (
      <div className={styles.UpdatePasswordFormPopup}>
        <HeaderPopup closeModal={closeModal} />
        <div className={styles.InputFields}>
          <InputWithUpperLabel
            inputId="user_new_password"
            label={formatMessage(messages.inputNewPasswordLabel)}
            placeholder={formatMessage(messages.inputNewPasswordPlaceholder)}
            value=""
            className={styles.InputWithUpperLabelModifier}
            onChange={(value) => console.log(value)}
          />
          <InputWithUpperLabel
            inputId="user_new_password_confirm"
            label={formatMessage(messages.inputNewPasswordConfirmLabel)}
            placeholder={formatMessage(
              messages.inputNewPasswordConfirmPlaceholder
            )}
            className={styles.InputWithUpperLabelModifier}
            value=""
            onChange={(value) => console.log(value)}
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
      <div className={styles.UpdatePasswordFormPopup}>
        <CloseModalButton
          variant="light"
          className={styles.CloseButton}
          onClick={closeModal}
        />
        <div className={styles.SuccessMessage}>
          <CheckedCircleIcon />
          <span>
            <FormattedMessage
              defaultMessage="Tu contraseña se ha actualizado {breakLine}
            correctamente."
              values={{ breakLine: <br /> }}
            />
          </span>
        </div>
      </div>
    );
  }
}

function UpdatePasswordForm() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const onClosePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
      <div className={styles.UpdatePasswordFormWrapper}>
        <h5 className={styles.UpdatePasswordTitle}>
          <FormattedMessage defaultMessage="Seguridad" />
        </h5>
        <div className={styles.UpdatePasswordDetails}>
          <span>
            <FormattedMessage defaultMessage="Contraseña" />
          </span>
          <span>***********</span>
          <button
            onClick={() => setIsPopupOpen(true)}
            className={classes("btn", styles.CTAButtonOpenPopup)}
          >
            <FormattedMessage defaultMessage="Cambiar Contraseña" />
          </button>
        </div>
      </div>
      <AnimatedPopup onClose={onClosePopup} modal open={isPopupOpen}>
        {(closeModal) => (
          <UpdatePasswordFormPopupForm closeModal={closeModal} />
        )}
      </AnimatedPopup>
    </>
  );
}

export default UpdatePasswordForm;
