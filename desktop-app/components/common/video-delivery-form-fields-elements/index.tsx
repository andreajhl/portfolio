import React from "react";
import SubmitButton from "../button/submit-button";
import InputWithFloatLabel from "../form/input-with-float-label";
import Maybe from "../helpers/maybe";
import styles from "./styles.module.scss";
type VideoDeliveryFormFieldsElementsProps = {
  deliveryTo: string;
  deliveryFrom: string;
  onChange: (arg1: string, arg2: string) => void;
  contractType: number;
  onSubmit: () => void;
};

const VideoDeliveryFormFieldsElements = ({
  deliveryTo,
  deliveryFrom,
  onChange,
  contractType,
  onSubmit
}: VideoDeliveryFormFieldsElementsProps) => {
  return (
    <>
      <div className={styles.InputFields}>
        <Maybe it={contractType === 1 || contractType === 2}>
          <div className={styles.InputField}>
            <span className={styles.ExtraLabel}>Para:</span>
            <InputWithFloatLabel
              className={styles.InputFieldModififier}
              value={deliveryTo}
              onChangeValue={(e) => onChange("deliveryTo", e)}
              placeholder="¿Quién recibirá el video?"
            ></InputWithFloatLabel>
          </div>
        </Maybe>
        <Maybe it={contractType === 2}>
          <div className={styles.InputField}>
            <span className={styles.ExtraLabel}>De:</span>
            <InputWithFloatLabel
              className={styles.InputFieldModififier}
              value={deliveryFrom}
              onChangeValue={(e) => onChange("deliveryFrom", e)}
              placeholder="¿Quién envía el video?"
            ></InputWithFloatLabel>
          </div>
        </Maybe>
      </div>
      <Maybe it={contractType !== 3}>
        <SubmitButton onClick={onSubmit}>Siguiente</SubmitButton>
      </Maybe>
    </>
  );
};

export default VideoDeliveryFormFieldsElements;
