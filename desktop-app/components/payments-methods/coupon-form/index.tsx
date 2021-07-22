import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "react-app/src/state/store";
import InputWithSubmitHandler from "desktop-app/components/common/form/InputWithSubmitHandler";
import styles from "./styles.module.scss";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import WarningMessage from "desktop-app/components/common/warning-message";
import { discountCouponsGateways } from "react-app/src/state/ducks/payments/actions";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { FormattedMessage, IntlFormatters, useIntl } from "react-intl";
import errorMessages from "lib/validations/errorMessages";

const mapStateToProps = ({ payments }: RootState) => ({
  couponData: payments.fetchDiscountCouponReducer,
  currencyExchangeData: payments.currencyExchangeReducer.data,
});

const mapDispatchToProps = {
  checkoutDiscountCoupon: discountCouponsGateways,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type CouponFormProps = {
  contractReference: string;
} & PropsFromRedux;

const initialValues = {
  coupon: "",
};

function getValidations(
  formatMessage: IntlFormatters["formatMessage"]
): ValidationsType<{
  coupon: string;
}> {
  return {
    coupon(value) {
      if (value.length === 0) {
        return formatMessage(errorMessages.invalidCoupon);
      }
    },
  };
}

function CouponForm({
  contractReference,
  checkoutDiscountCoupon,
  couponData,
  currencyExchangeData,
}: CouponFormProps) {
  const { formatMessage } = useIntl();
  const { values, errors, submitForm, setFieldValue } = useForm({
    initialValues: initialValues,
    validations: getValidations(formatMessage),
    onSubmit: (data) => {
      checkoutDiscountCoupon(contractReference, data.coupon);
    },
  });

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
              couponData.completed ? (
                <FormattedMessage defaultMessage="Agregado" />
              ) : (
                <FormattedMessage defaultMessage="Aplicar" />
              )
            }
            status={couponData.loading ? "loading" : "idle"}
          />
        }
      />
      <Maybe
        it={
          (typeof errors.coupon !== "undefined" && errors.coupon !== "") ||
          couponData.error_data !== null
        }
      >
        <WarningMessage message={errors.coupon || couponData.error_data} />
      </Maybe>
    </div>
  );
}

const _CouponForm = connector(CouponForm);

export { _CouponForm as CouponForm };
