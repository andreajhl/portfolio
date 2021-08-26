import React, { useState } from "react";
import styles from "./styles.module.scss";
import StripeForm from "../stripe-form";
import Maybe from "desktop-app/components/common/helpers/maybe";
import PaypalForm from "../paypal-form";
import DLocalPaymentMethodForm from "../dLocal-payment-method-form";
import { ALL_AVAILABLE_PAYMENTS_METHODS } from "constants/availablePaymentsMethods";
import { isAValidDLocalPaymentMethod } from "lib/utils/dLocalPaymentMethodsValidations";
import { analytics } from "react-app/src/state/utils/gtm";
import { useSelector } from "react-redux";
import { RootState } from "react-app/src/state/store";
import { SpreedlyForm } from "../spreedly-form";

type all_payments_methods = typeof ALL_AVAILABLE_PAYMENTS_METHODS[number];

const isProcessingPayment = ({ payments }: RootState) =>
  payments.setPaymentInProcess.processing;
const couponData = ({ payments }: RootState) =>
  payments.fetchDiscountCouponReducer;

type PaymentMethodsAvailableListProps = {
  payment_methods: {
    paymentMethodType: all_payments_methods;
    availablePaymentMethods?: {
      id: number;
      identifier: string;
      name: string;
      brand: string;
      redirect: boolean;
      logo: string;
    }[];
  }[];
  contractPrice: number;
  contractReference: string;
  buyerData: {
    buyer_name: string;
    email_address: string;
    identification_document: string;
  };
  onBuyerDataIncomplete: () => void;
  discountCouponId: number | null;
  celebrityId: number;
};

function PaymentMethodsAvailableList({
  payment_methods,
  contractPrice,
  contractReference,
  buyerData,
  onBuyerDataIncomplete,
  discountCouponId,
  celebrityId,
}: PaymentMethodsAvailableListProps) {
  const [currentOption, setCurrentOption] = useState<all_payments_methods>(
    null
  );
  const disabledAccordion = useSelector(isProcessingPayment);
  const couponDataReducer = useSelector(couponData);
  const handleChangeCurrentOption = (newValue: all_payments_methods) => {
    const previousPaymentMethod = currentOption;
    if (disabledAccordion || previousPaymentMethod === newValue) {
      return;
    }
    setCurrentOption(newValue);
    analytics.track("CHANGE_ACTIVE_PAYMENT_METHOD_OPTION", {
      previousPaymentMethod,
      newPaymentMethod: newValue,
      buyerData,
      celebrityId,
      contractReference,
    });
  };

  return (
    <>
      {payment_methods.map((el, index) => (
        <div
          className={styles.PaymentMethodsAvailable}
          key={el.paymentMethodType}
        >
          <Maybe it={el.paymentMethodType === "STRIPE"}>
            <StripeForm
              contractPrice={
                couponDataReducer.completed
                  ? couponDataReducer.data.finalAmount
                  : contractPrice
              }
              contractReference={contractReference}
              expanded={currentOption === el.paymentMethodType}
              index={index}
              discountCouponId={discountCouponId}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
              celebrityId={celebrityId}
            />
          </Maybe>
          <Maybe it={el.paymentMethodType === "SPREEDLY"}>
            <SpreedlyForm
              index={index}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
              expanded={currentOption === el.paymentMethodType}
              contractReference={contractReference}
              discountCouponId={discountCouponId}
            />
          </Maybe>
          <Maybe it={el.paymentMethodType === "PAYPAL"}>
            <PaypalForm
              expanded={currentOption === el.paymentMethodType}
              index={index}
              contractPrice={
                couponDataReducer.completed
                  ? couponDataReducer.data.finalAmount
                  : contractPrice
              }
              discountCouponId={discountCouponId}
              contractReference={contractReference}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
              celebrityId={celebrityId}
            />
          </Maybe>
          <Maybe it={isAValidDLocalPaymentMethod(el.paymentMethodType)}>
            <DLocalPaymentMethodForm
              paymentMethodType={el.paymentMethodType}
              paymentsMethodsAvailable={el.availablePaymentMethods}
              expanded={currentOption === el.paymentMethodType}
              index={index}
              discountCouponId={discountCouponId}
              buyerData={buyerData}
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

export default PaymentMethodsAvailableList;
