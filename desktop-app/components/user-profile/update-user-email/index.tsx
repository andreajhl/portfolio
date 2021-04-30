import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TriggerPopupEditButton from "desktop-app/components/common/trigger-popup-edit-button";
import InputWithUpperLabel from "desktop-app/components/common/form/input-with-upper-label";
import { CheckedCircleIcon } from "desktop-app/components/common/icons";
import classes from "classnames";

function HeaderPopup() {
  return (
    <div className={styles.HeaderPopupWrapper}>
      <div>
        <img
          src="/assets/img/favicon.png"
          alt="Famosos Logo"
          height="60px"
        ></img>
      </div>
      <p>Cambiar correo electrónico</p>
    </div>
  );
}

function UpdateUserEmailPopupForm() {
  const [currentStep, setCurrentStep] = useState(0);

  if (currentStep === 0) {
    return (
      <div className={styles.UpdateUserEmailPopup}>
        <HeaderPopup />
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
        <HeaderPopup />
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
      popupContent={<UpdateUserEmailPopupForm></UpdateUserEmailPopupForm>}
    ></TriggerPopupEditButton>
  );
}

export default UpdateUserEmail;
