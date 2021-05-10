import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TriggerPopupEditButton from "desktop-app/components/common/trigger-popup-edit-button";
import InputWithUpperLabel from "desktop-app/components/common/form/input-with-upper-label";
import { CheckedCircleIcon } from "desktop-app/components/common/icons";
import classes from "classnames";
import { CellphoneNumberInput } from "desktop-app/components/common/form/cellphone-number-input";

function HeaderPopup() {
  return (
    <div className={styles.HeaderPopupWrapper}>
      <p>Cambiar número de celular</p>
    </div>
  );
}

function UpdateUserPhonePopupForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  if (currentStep === 0) {
    return (
      <div className={styles.UpdateUserPhonePopup}>
        <HeaderPopup />
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
            Continuar
          </button>
        </div>
      </div>
    );
  }
  if (currentStep === 1) {
    return (
      <div className={styles.UpdateUserPhonePopup}>
        <HeaderPopup />
        <div className={styles.InputFields}>
          <InputWithUpperLabel
            inputId="email_code"
            label="Ingresa el código de seguridad que enviamos a tu celular"
            placeholder="Código de seguridad"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
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
      <div className={styles.UpdateUserPhonePopup}>
        <div className={styles.SuccessMessage}>
          <CheckedCircleIcon />
          <span>
            Tu número de celular se ha actualizado <br></br>
            correctamente.
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
      popupContent={<UpdateUserPhonePopupForm></UpdateUserPhonePopupForm>}
    ></TriggerPopupEditButton>
  );
}

export default UpdateUserPhone;
