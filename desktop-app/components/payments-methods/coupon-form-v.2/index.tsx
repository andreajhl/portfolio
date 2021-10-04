import React from "react";
import InputWithSubmitHandler from "desktop-app/components/common/form/InputWithSubmitHandler";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { FormattedMessage } from "react-intl";
import { useApplyDiscountCouponForm } from "lib/hooks/useApplyDiscountCouponForm";
import { CollapsibleErrorMessage } from "desktop-app/components/common/widgets/collapsible-error-message";

type CouponFormProps = {
  contractReference: string;
  setIsOpen: (value: boolean) => void;
};

function CouponFormV2({ contractReference, setIsOpen }: CouponFormProps) {
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
      <button onClick={() => setIsOpen(false)}>
        <i className="fa fa-times text-white" />
      </button>
      <h3>
        <FormattedMessage defaultMessage="Cupones" />
      </h3>
      <InputWithSubmitHandler
        inputValue={values.coupon}
        inputName="coupon"
        onSubmit={submitForm}
        className={styles.InputWithSubmitHandler}
        placeHolderInput="Introduce el código promocional"
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

export { CouponFormV2 };
