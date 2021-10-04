import React from "react";
import styles from "./styles.module.scss";
import StripeFormV2 from "../stripe-form-v.2";
import Maybe from "desktop-app/components/common/helpers/maybe";
import PaypalFormV2 from "../paypal-form-v.2";
import DLocalPaymentMethodFormV2 from "../dLocal-payment-method-form-v.2";
import { isAValidDLocalPaymentMethod } from "lib/utils/dLocalPaymentMethodsValidations";
import { useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";
import { SpreedlyFormV2 } from "../spreedly-form-v.2";
import useCurrentPaymentMethodSelected from "lib/hooks/useCurrentPaymentMethodSelected";
import {
  PaymentMethodNameType,
  PaymentMethodOption,
} from "desktop-app/types/payment-methods";

const isProcessingPayment = ({ payments }: RootState) =>
  payments.setPaymentInProcess.processing;

type PaymentMethodsAvailableListProps = {
  payment_methods: {
    paymentMethodType: PaymentMethodNameType;
    availablePaymentMethods?: PaymentMethodOption[];
  }[];
  contractPrice: number;
  contractReference: string;
  onBuyerDataIncomplete: () => void;
  discountCouponId: number | null;
  celebrityId: number;
};

function PaymentMethodsAvailableListV2({
  payment_methods,
  contractPrice,
  contractReference,
  onBuyerDataIncomplete,
  discountCouponId,
  celebrityId,
}: PaymentMethodsAvailableListProps) {
  const [
    useCurrentOption,
    changeCurrentPaymentMethodSelected,
  ] = useCurrentPaymentMethodSelected();
  const disabledAccordion = useSelector(isProcessingPayment);

  const handleChangeCurrentOption = (newValue: PaymentMethodNameType) => {
    if (disabledAccordion) return;
    changeCurrentPaymentMethodSelected(newValue);
  };

  return (
    <>
      {payment_methods.map((el, index) => (
        <div
          className={styles.PaymentMethodsAvailable}
          key={el.paymentMethodType}
        >
          <Maybe it={el.paymentMethodType === "STRIPE"}>
            <StripeFormV2
              contractPrice={contractPrice}
              contractReference={contractReference}
              expanded={useCurrentOption === el.paymentMethodType}
              index={index}
              discountCouponId={discountCouponId}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
              celebrityId={celebrityId}
            />
          </Maybe>
          <Maybe it={el.paymentMethodType === "SPREEDLY"}>
            <SpreedlyFormV2
              index={index}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
              expanded={useCurrentOption === el.paymentMethodType}
              contractReference={contractReference}
              discountCouponId={discountCouponId}
            />
          </Maybe>
          <Maybe it={el.paymentMethodType === "PAYPAL"}>
            <PaypalFormV2
              expanded={useCurrentOption === el.paymentMethodType}
              index={index}
              contractPrice={contractPrice}
              discountCouponId={discountCouponId}
              contractReference={contractReference}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
              celebrityId={celebrityId}
            />
          </Maybe>
          <Maybe it={isAValidDLocalPaymentMethod(el.paymentMethodType)}>
            <DLocalPaymentMethodFormV2
              paymentMethodType={el.paymentMethodType}
              paymentsMethodsAvailable={el.availablePaymentMethods}
              expanded={useCurrentOption === el.paymentMethodType}
              index={index}
              discountCouponId={discountCouponId}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
              contractReference={contractReference}
              handleBuyerDataIncomplete={onBuyerDataIncomplete}
              celebrityId={celebrityId}
              contractPrice={contractPrice}
            />
          </Maybe>
        </div>
      ))}
    </>
  );
}

export default PaymentMethodsAvailableListV2;
