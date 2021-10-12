import React from "react";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { FormattedMessage } from "react-intl";
import { useApplyDiscountCouponForm } from "lib/hooks/useApplyDiscountCouponForm";
import { CollapsibleErrorMessage } from "desktop-app/components/common/widgets/collapsible-error-message";
import { PaymentMethodFormHeader } from "../form-header-v.2";
import SubmitButton from "desktop-app/components/common/button/submit-button";

type CouponFormProps = {
  contractReference: string;
  setIsOpen: (value: boolean) => void;
};

function CouponFormV2({ contractReference, setIsOpen }: CouponFormProps) {
  const {
    values,
    errors,
    submitForm,
    status,
    onChangeField,
  } = useApplyDiscountCouponForm({
    contractReference,
  });

  const isCompleted = status === "completed";
  const isLoading = status === "loading";
  const submitTextStatus = status === "failed" ? "rejected" : status;

  const closeModal = () => setIsOpen(false);

  return (
    <div className={styles.CouponFormWrapper}>
      <PaymentMethodFormHeader
        title={<FormattedMessage defaultMessage="Cupones" />}
        closePaymentModal={closeModal}
      />
      <div className="container py-4">
        <form id="coupon-form" onSubmit={submitForm}>
          <label className={styles.CouponFormV2Label}>
            <FormattedMessage defaultMessage="Introduce el código promocional" />
          </label>
          <input
            className={styles.CouponFormV2Input}
            type="text"
            name="coupon"
            value={values.coupon}
            onChange={onChangeField}
          />
          <CollapsibleErrorMessage
            className={styles.ErrorMessage}
            errorMessage={errors.coupon}
          />
          <SubmitButton
            className={styles.CouponFormV2SubmitButton}
            disabled={isLoading}
          >
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
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

export { CouponFormV2 };
