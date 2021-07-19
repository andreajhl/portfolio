import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "react-app/src/state/store";
import InputWithSubmitHandler from "desktop-app/components/common/form/InputWithSubmitHandler";
import styles from "./styles.module.scss";
import useForm from "lib/hooks/useForm";
import WarningMessage from "desktop-app/components/common/warning-message";
import { discountCouponsGateways } from "react-app/src/state/ducks/payments/actions";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { FormattedMessage } from "react-intl";
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

const validations = {
  coupon(value) {
    if (value.length === 0) return "Debes de introducir un cupón valido";
  },
};

function CouponForm({
  contractReference,
  checkoutDiscountCoupon,
  couponData,
  currencyExchangeData,
}: CouponFormProps) {
  const { values, errors, validateFields, submitForm, setFieldValue } = useForm(
    {
      initialValues: initialValues,
      validations,
      onSubmit: (data) => {
        checkoutDiscountCoupon(contractReference, data.coupon);
      },
    }
  );

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
