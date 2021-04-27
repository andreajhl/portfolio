import React from "react";
import useForm from "lib/hooks/useForm";
import { ContractDataFormInput } from "desktop-app/components/common/form/contract-data-form-input";
import styles from "./styles.module.scss";
import { ContractInstructionsTextarea } from "desktop-app/components/common/form/contract-instructions-textarea";
import classes from "classnames";

type FormValuesType = {
  deliveryTo: string;
  deliveryFrom: string;
  instructions: string;
};

function ContractInstructionsEdit({
  deliveryTo,
  deliveryFrom,
  instructions,
  onSaveChanges,
}) {
  const { values, onChangeField } = useForm<FormValuesType>({
    initialValues: {
      deliveryTo,
      deliveryFrom,
      instructions,
    },
    onSubmit() {
      console.log("Enviado");
    },
  });

  return (
    <div className={styles.ContractInstructions}>
      <button
        className={classes("btn", styles.ToggleEditSpan)}
        onClick={onSaveChanges}
      >
        Guardar
      </button>
      <div className={styles.DeliveryInputsRow}>
        <div className={styles.WhoReceiveInputContainer}>
          <ContractDataFormInput
            placeholder="Camila"
            label="Para"
            value={values.deliveryTo}
            name="deliveryTo"
            maxLength={40}
            onChange={(event) => {
              console.log(event.target);
              onChangeField(event);
            }}
          />
        </div>
        <div>
          <ContractDataFormInput
            placeholder="Marco"
            label="De"
            value={values.deliveryFrom}
            maxLength={40}
            onChange={(event) => {
              console.log(event.target);
              onChangeField(event);
            }}
          />
        </div>
      </div>
      <ContractInstructionsTextarea
        labelClass={styles.InstructionsDetailsInputLabel}
        id="instructions"
        onChange={(event) => {
          console.log(event.target);
          onChangeField(event);
        }}
        value={values.instructions}
        name="instructions"
      />
    </div>
  );
}
export default ContractInstructionsEdit;
