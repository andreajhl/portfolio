import React from "react";
import { FormattedMessage } from "react-intl";
import SubmitButton from "../button/submit-button";
import InputWithFloatLabel from "../form/input-with-float-label";
import Maybe from "../helpers/maybe";
import { SubmitText } from "../helpers/submit-button-text";
import styles from "./styles.module.scss";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  deliveryToPlaceholder: {
    defaultMessage: "¿Quién recibirá el video?",
  },
  deliveryFromPlaceholder: {
    defaultMessage: "¿Quién envía el video?",
  },
});

type VideoDeliveryFormFieldsElementsProps = {
  hasBusinessPrice?: boolean;
  deliveryTo: string;
  deliveryFrom: string;
  onChange: (arg1: string, arg2: string) => void;
  contractType: number;
  errors: { [key: string]: any };
  isLoading: boolean;
};

function VideoDeliveryFormFieldsElements({
  hasBusinessPrice = false,
  deliveryTo,
  deliveryFrom,
  onChange,
  contractType,
  errors,
  isLoading,
}: VideoDeliveryFormFieldsElementsProps) {
  const { formatMessage } = useIntl();
  const contractIsForBusiness = contractType === 3;
  const showDeliveryToInput = !contractIsForBusiness || hasBusinessPrice;
  const contractIsForOther = contractType === 2;

  const deliveryToPlaceholder = formatMessage(messages.deliveryToPlaceholder);
  const deliveryFromPlaceholder = formatMessage(
    messages.deliveryFromPlaceholder
  );

  return (
    <>
      <div className={styles.InputFields}>
        <Maybe it={showDeliveryToInput}>
          <div className={styles.InputField}>
            <span className={styles.ExtraLabel}>
              <FormattedMessage defaultMessage="Para:" />
            </span>
            <InputWithFloatLabel
              className={styles.InputFieldModifier}
              value={deliveryTo}
              onChangeValue={(e) => onChange("deliveryTo", e)}
              placeholder={deliveryToPlaceholder}
              errorMessage={errors.deliveryTo}
              maxLength={40}
            />
          </div>
        </Maybe>
        <Maybe it={contractIsForOther}>
          <div className={styles.InputField}>
            <span className={styles.ExtraLabel}>
              <FormattedMessage defaultMessage="De:" />
            </span>
            <InputWithFloatLabel
              className={styles.InputFieldModifier}
              errorMessage={errors.deliveryFrom}
              value={deliveryFrom}
              onChangeValue={(e) => onChange("deliveryFrom", e)}
              placeholder={deliveryFromPlaceholder}
              maxLength={40}
            />
          </div>
        </Maybe>
      </div>
      <Maybe it={showDeliveryToInput}>
        <SubmitButton disabled={isLoading}>
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
