import React, { useState } from "react";
import styles from "./styles.module.scss";
import StripeForm from "../stripe-form";
import Maybe from "desktop-app/components/common/helpers/maybe";
import PaypalForm from "../paypal-form";
import DLocalPaymentMethodForm from "../dLocal-payment-method-form";
const AVAILABLE_PAYMENTS_METHODS_DLOCAL = [
  "CREDIT_CARD",
  "DEBIT_CARD",
  "BANK_TRANSFER",
  "TICKET",
] as const;
const AVAILABLE_PAYMENTS_METHOD_PAYPAL = ["PAYPAL", "STRIPE"] as const;
const AVAILABLE_PAYMENTS_METHOD_STRIPE = ["STRIPE"] as const;

const ALL_AVAILABLE_PAYMENTS_METHODS = [
  ...AVAILABLE_PAYMENTS_METHODS_DLOCAL,
  ...AVAILABLE_PAYMENTS_METHOD_PAYPAL,
  ...AVAILABLE_PAYMENTS_METHOD_STRIPE,
] as const;

type all_payments_methods = typeof ALL_AVAILABLE_PAYMENTS_METHODS[number];

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
};

function PaymentMethodsAvailableList({
  payment_methods,
  contractPrice,
  contractReference,
}: PaymentMethodsAvailableListProps) {
  const [currentOption, setCurrentOption] = useState<all_payments_methods>(
    null
  );
  const handleChangeCurrentOption = (newValue: all_payments_methods) => {
    setCurrentOption(newValue);
  };
  return (
    <>
      {payment_methods.map((el, index) => (
        <div className={styles.PaymentMethodsAvailable}>
          <Maybe it={el.paymentMethodType === "STRIPE"}>
            <StripeForm
              expanded={currentOption === el.paymentMethodType}
              index={index}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
            />
          </Maybe>
          <Maybe it={el.paymentMethodType === "PAYPAL"}>
            <PaypalForm
              expanded={currentOption === el.paymentMethodType}
              index={index}
              contractPrice={contractPrice}
              contractReference={contractReference}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
            />
          </Maybe>
          <Maybe
            it={AVAILABLE_PAYMENTS_METHODS_DLOCAL.some(
              (method) => method === el.paymentMethodType
            )}
          >
            <DLocalPaymentMethodForm
              expanded={currentOption === el.paymentMethodType}
              index={index}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
            />
          </Maybe>
        </div>
      ))}
    </>
  );
}

export default PaymentMethodsAvailableList;
