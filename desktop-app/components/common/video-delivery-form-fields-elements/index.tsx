import React from "react";
import { FormattedMessage } from "react-intl";
import SubmitButton from "../button/submit-button";
import InputWithFloatLabel from "../form/input-with-float-label";
import Maybe from "../helpers/maybe";
import { SubmitText } from "../helpers/submit-button-text";
import styles from "./styles.module.scss";

type VideoDeliveryFormFieldsElementsProps = {
  hasBusinessPrice?: boolean;
  deliveryTo: string;
  deliveryFrom: string;
  onChange: (arg1: string, arg2: string) => void;
  contractType: number;
  onSubmit: (event: any) => void;
  errors: { [key: string]: any };
  isLoading: boolean;
};

function VideoDeliveryFormFieldsElements({
  hasBusinessPrice = false,
  deliveryTo,
  deliveryFrom,
  onChange,
  contractType,
  onSubmit,
  errors,
  isLoading,
}: VideoDeliveryFormFieldsElementsProps) {
  const contractIsForBusiness = contractType === 3;
  const showDeliveryToInput = !contractIsForBusiness || hasBusinessPrice;
  const contractIsForOther = contractType === 2;

  return (
    <>
      <div className={styles.InputFields}>
        <Maybe it={showDeliveryToInput}>
          <div className={styles.InputField}>
            <span className={styles.ExtraLabel}>Para:</span>
            <InputWithFloatLabel
              className={styles.InputFieldModifier}
              value={deliveryTo}
              onChangeValue={(e) => onChange("deliveryTo", e)}
              placeholder="¿Quién recibirá el video?"
              errorMessage={errors.deliveryTo}
              maxLength={40}
            />
          </div>
        </Maybe>
        <Maybe it={contractIsForOther}>
          <div className={styles.InputField}>
            <span className={styles.ExtraLabel}>De:</span>
            <InputWithFloatLabel
              className={styles.InputFieldModifier}
              errorMessage={errors.deliveryFrom}
              value={deliveryFrom}
              onChangeValue={(e) => onChange("deliveryFrom", e)}
              placeholder="¿Quién envía el video?"
              maxLength={40}
            />
          </div>
        </Maybe>
      </div>
      <Maybe it={showDeliveryToInput}>
        <SubmitButton onClick={onSubmit}>
          <SubmitText
            baseText={<FormattedMessage defaultMessage="Siguiente" />}
            status={isLoading ? "loading" : "idle"}
          />
        </SubmitButton>
      </Maybe>
    </>
  );
}

export default VideoDeliveryFormFieldsElements;
