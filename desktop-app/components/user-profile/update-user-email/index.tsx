import React, { useState } from "react";
import styles from "./styles.module.scss";
import TriggerPopupEditButton from "desktop-app/components/common/trigger-popup-edit-button";
import InputWithUpperLabel from "desktop-app/components/common/form/input-with-upper-label";
import { CheckedCircleIcon } from "desktop-app/components/common/icons";
import classes from "classnames";
import { CloseModalButton } from "desktop-app/components/common/button/close-modal-button";

function HeaderPopup({ closeModal }) {
  return (
    <div className={styles.HeaderPopupWrapper}>
      <CloseModalButton
        variant="light"
        className={styles.CloseButton}
        onClick={closeModal}
      />
      <p>Cambiar correo electrónico</p>
    </div>
  );
}

function UpdateUserEmailPopupForm({ closeModal }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (currentStep === 0) {
    return (
      <div className={styles.UpdateUserEmailPopup}>
        <HeaderPopup closeModal={closeModal} />
        <div className={styles.InputFields}>
          <InputWithUpperLabel
            inputId="user_email"
            label="Ingresa una nueva dirección de correo electrónico"
            placeholder="Correo electrónico nuevo"
            value="isaac.pr99@gmail.com"
            onChange={(value) => console.log(value)}
          ></InputWithUpperLabel>
          <button
            onClick={() => setCurrentStep(1)}
            className={classes("btn btn-primary", styles.CTAButton)}
          >
            Continuar
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
            Enviar
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
            Tu correo electrónico se ha actualizado <br></br> correctamente.
          </span>
        </div>
      </div>
    );
  }
}

type UpdateUserEmailProps = {
  email: string;
};
function UpdateUserEmail({ email }: UpdateUserEmailProps) {
  return (
    <TriggerPopupEditButton
      label="Correo Electrónico"
      value={email}
      popupContent={(closeModal) => (
        <UpdateUserEmailPopupForm closeModal={closeModal} />
      )}
      disabledEdit={true}
    ></TriggerPopupEditButton>
  );
}

export default UpdateUserEmail;
