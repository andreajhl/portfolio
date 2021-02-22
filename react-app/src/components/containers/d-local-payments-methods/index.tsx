import { AVAILABLE_PAYMENTS_METHODS } from "../../../../../constants/availablePaymentsMethods";
import React, { useState } from "react";
import { processDlocalPayment } from "../../../state/ducks/payments/actions";
import DLocalFormCard from "../dLocal-form-card";
import SelectCardBankPaymentMethod from "../select-cardbank-payment-method";
import { useRouter } from "next/router";
import Contract_reference from "pages/contract-created/[contract_reference]";

type DLocalPaymentsMethodsProps = {
  paymentMethodType: string;
  contractReference: string | number;
  paymentsMethodsAvailable: Array<{
    brand: string;
    id: number;
    identifier: string;
    logo: string;
    name: string;
    redirect: boolean;
  }>;
  buyerData: {
    buyerFullName: string;
    buyerEmail: string;
    buyerDocument: string;
  };
  discountCouponId: null | string | number;
  isSelected: boolean;
};

const DLocalPaymentsMethods = ({
  contractReference,
  paymentMethodType,
  paymentsMethodsAvailable = [],
  buyerData,
  discountCouponId,
  isSelected
}: DLocalPaymentsMethodsProps) => {
  const router = useRouter();
  const handleChangePaymentMethod = (name, paymentMethodId) => {
    setCurrentOption({ name, paymentMethodId });
  };
  const [currentOption, setCurrentOption] = useState({
    name: "",
    paymentMethodId: ""
  });
  const [paymentError, setPaymentError] = useState("");
  const [paymentInProcess, setPaymentInProcess] = useState(false);
  const handleStartPayment = async (cardToken) => {
    setPaymentInProcess(true);
    try {
      processDlocalPayment(
        contractReference,
        currentOption.paymentMethodId,
        buyerData.buyerFullName,
        buyerData.buyerEmail,
        buyerData.buyerDocument,
        discountCouponId ? discountCouponId : null,
        cardToken
      )
        .then((response) => {
          if (response.chargeStatus === "AUTHORIZED") {
            router.push(`/metodos-de-pago/${contractReference}`);
          }
        })
        .catch((e) => {
          setPaymentError(e);
          setPaymentInProcess(false);
        });
    } catch (e) {
      setPaymentInProcess(false);
      setPaymentError(e);
    }
  };

  const onStartPayment = (token) => {
    handleStartPayment(token);
  };

  return (
    <React.Fragment>
      <div className="titles">
        <div className="icon">
          {isSelected ? (
            <i className={`far  fa-dot-circle`}></i>
          ) : (
            <i className="far fa-circle"></i>
          )}
        </div>
        <div className="payment-type-title">
          <h6 className={"font-weight-normal"}>
            <span>{AVAILABLE_PAYMENTS_METHODS[paymentMethodType]}</span>
          </h6>
          <i className="far fa-credit-card"></i>
        </div>
      </div>
      <div
        className={`pl-3 pr-3 pt-4 pb-4 bg-light ${isSelected ? "" : "d-none"}`}
      >
        {paymentMethodType === "CREDIT_CARD" ||
        paymentMethodType === "DEBIT_CARD" ? (
          <div className="form-check d-flex p-0 flex-column ">
            <SelectCardBankPaymentMethod
              onChangeOptionSelected={(selected) =>
                handleChangePaymentMethod(selected.name, selected.value)
              }
              options={paymentsMethodsAvailable.map((paymentMethod) => ({
                value: paymentMethod.id,
                label: paymentMethod.name
              }))}
            />
          </div>
        ) : (
          <div className="form-check d-flex p-0 flex-column ">
            <div className="form-check d-flex flex-column ">
              {paymentsMethodsAvailable.map((paymentMethod, index) => (
                <div className="mt-1 mb-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`paymentMethod-${paymentMethodType}`}
                    value={paymentMethod.name}
                    checked={currentOption.name === paymentMethod.name}
                    onChange={() =>
                      handleChangePaymentMethod(
                        paymentMethod.name,
                        paymentMethod.id
                      )
                    }
                    id={`paymentMethod-${paymentMethod.name}-${index}`}
                  />
                  <label
                    className="form-check-label w-100 cursor-pointer"
                    htmlFor={`paymentMethod-${paymentMethod.name}-${index}`}
                  >
                    <span>{paymentMethod.name}</span>
                    <img
                      alt="Card Logo"
                      style={{
                        position: "absolute",
                        left: "90%"
                      }}
                      className="rounded-circle"
                      height="30px"
                      src={paymentMethod.logo}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-2">
          <DLocalFormCard
            paymentInProcess={paymentInProcess}
            handleStartPayment={(token) => onStartPayment(token)}
          ></DLocalFormCard>
          <span className="font-weight-bold text-danger">{paymentError}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export { DLocalPaymentsMethods };
