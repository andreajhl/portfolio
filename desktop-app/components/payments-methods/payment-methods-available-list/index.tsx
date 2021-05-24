import React, { useState } from "react";
import styles from "./styles.module.scss";
import StripeForm from "../stripe-form";
import Maybe from "desktop-app/components/common/helpers/maybe";
import PaypalForm from "../paypal-form";
import DLocalPaymentMethodForm from "../dLocal-payment-method-form";
import { ALL_AVAILABLE_PAYMENTS_METHODS } from "constants/availablePaymentsMethods";
import { isAValidDLocalPaymentMethod } from "lib/utils/dLocalPaymentMethodsValidations";

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
  buyerData: {
    buyer_name: string;
    email_address: string;
    identification_document: string;
  };
  onBuyerDataIncomplete: () => void;
};

function PaymentMethodsAvailableList({
  payment_methods,
  contractPrice,
  contractReference,
  buyerData,
  onBuyerDataIncomplete,
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
              contractPrice={contractPrice}
              contractReference={contractReference}
              expanded={currentOption === el.paymentMethodType}
              index={index}
              discountCouponId={null}
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
          <Maybe it={isAValidDLocalPaymentMethod(el.paymentMethodType)}>
            <DLocalPaymentMethodForm
              paymentMethodType={el.paymentMethodType}
              paymentsMethodsAvailable={el.availablePaymentMethods}
              expanded={currentOption === el.paymentMethodType}
              index={index}
              discountCouponId={null}
              buyerData={buyerData}
              onToggle={() => handleChangeCurrentOption(el.paymentMethodType)}
              contractReference={contractReference}
              handleBuyerDataIncomplete={onBuyerDataIncomplete}
            />
          </Maybe>
        </div>
      ))}
    </>
  );
}

export default PaymentMethodsAvailableList;
