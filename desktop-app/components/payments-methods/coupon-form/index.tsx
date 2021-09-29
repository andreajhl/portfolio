import React from "react";
import InputWithSubmitHandler from "desktop-app/components/common/form/InputWithSubmitHandler";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { FormattedMessage } from "react-intl";
import { CollapsibleErrorMessage } from "desktop-app/components/common/widgets/collapsible-error-message";
import { useApplyDiscountCouponForm } from "../../../../lib/hooks/useApplyDiscountCouponForm";

type CouponFormProps = {
  contractReference: string;
};

function CouponForm({ contractReference }: CouponFormProps) {
  const {
    values,
    errors,
    submitForm,
    setFieldValue,
    status,
  } = useApplyDiscountCouponForm({
    contractReference,
  });

  const isCompleted = status === "completed";
  const submitTextStatus = status === "failed" ? "rejected" : status;

  return (
    <div className={styles.CouponFormWrapper}>
      <label className={styles.LabelForm} htmlFor="coupon-input">
        <FormattedMessage defaultMessage="¿Tienes un cupón de descuento?" />
      </label>
      <InputWithSubmitHandler
        inputValue={values.coupon}
        inputName="coupon"
        onSubmit={submitForm}
        className={styles.InputWithSubmitHandler}
        placeHolderInput=""
        setInputValue={(newValue) => {
          setFieldValue("coupon", newValue);
        }}
        inputID="coupon-input"
        placeHolderButton={
          <SubmitText
            baseText={
              <Maybe
                it={isCompleted}
                orElse={<FormattedMessage defaultMessage="Aplicar" />}
              >
                <FormattedMessage defaultMessage="Agregado" />
              </Maybe>
            }
            status={submitTextStatus}
          />
        }
      />
      <CollapsibleErrorMessage
        className={styles.ErrorMessage}
        errorMessage={errors.coupon}
      />
    </div>
  );
}

export { CouponForm };
