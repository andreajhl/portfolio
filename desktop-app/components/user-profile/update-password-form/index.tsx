import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TriggerPopupEditButton from "desktop-app/components/common/trigger-popup-edit-button";
import InputWithUpperLabel from "desktop-app/components/common/form/input-with-upper-label";
import { CheckedCircleIcon } from "desktop-app/components/common/icons";
import classes from "classnames";
import { AnimatedPopup } from "desktop-app/components/common/animated-popup";

function HeaderPopup() {
  return (
    <div className={styles.HeaderPopupWrapper}>
      <p>Cambiar contraseña</p>
    </div>
  );
}

function UpdatePasswordFormPopupForm() {
  const [currentStep, setCurrentStep] = useState(0);

  if (currentStep === 0) {
    return (
      <div className={styles.UpdatePasswordFormPopup}>
        <HeaderPopup />
        <div className={styles.InputFields}>
          <InputWithUpperLabel
            inputId="user_new_password"
            label="Ingresa una contraseña nueva"
            placeholder="Contraseña nueva"
            value=""
            className={styles.InputWithUpperLabelModifier}
            onChange={(value) => console.log(value)}
          ></InputWithUpperLabel>
          <InputWithUpperLabel
            inputId="user_new_password_confirm"
            label="Confirma tu contraseña"
            placeholder="Contraseña nueva"
            className={styles.InputWithUpperLabelModifier}
            value=""
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
      <div className={styles.UpdatePasswordFormPopup}>
        <div className={styles.SuccessMessage}>
          <CheckedCircleIcon />
          <span>
            Tu contraseña se ha actualizado <br></br>
            correctamente.
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
        <h5 className={styles.UpdatePasswordTitle}>Seguridad</h5>
        <div className={styles.UpdatePasswordDetails}>
          <span>Contraseña</span>
          <span>***********</span>
          <button
            onClick={() => setIsPopupOpen(true)}
            className={classes("btn", styles.CTAButtonOpenPopup)}
          >
            Cambiar Contraseña
          </button>
        </div>
      </div>
      <AnimatedPopup onClose={onClosePopup} modal open={isPopupOpen}>
        {<UpdatePasswordFormPopupForm />}
      </AnimatedPopup>
    </>
  );
}

export default UpdatePasswordForm;
