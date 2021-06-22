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
  const { values, onChangeField, submitForm } = useForm<FormValuesType>({
    initialValues: {
      deliveryTo,
      deliveryFrom,
      instructions,
    },
    onSubmit(data) {
      onSaveChanges(data);
    },
  });

  return (
    <div className={styles.ContractInstructions}>
      <button
        className={classes("btn", styles.ToggleEditSpan)}
        onClick={submitForm}
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
              onChangeField(event);
            }}
          />
        </div>
        <div>
          {values.deliveryFrom ? (
            <ContractDataFormInput
              placeholder="Marco"
              label="De"
              value={values.deliveryFrom}
              maxLength={40}
              onChange={(event) => {
                onChangeField(event);
              }}
            />
          ) : null}
        </div>
      </div>
      <ContractInstructionsTextarea
        labelClass={styles.InstructionsDetailsInputLabel}
        id="instructions"
        onChange={(event) => {
          onChangeField(event);
        }}
        value={values.instructions}
        name="instructions"
      />
    </div>
  );
}
export default ContractInstructionsEdit;
