import { AVAILABLE_PAYMENTS_METHODS } from "../../../../../constants/availablePaymentsMethods";
import React, { useState } from "react";
import { processDlocalPayment } from "../../../state/ducks/payments/actions";
import DLocalFormCard from "../dLocal-form-card";
import SelectCardBankPaymentMethod from "../select-cardbank-payment-method";
import { useRouter } from "next/router";
import styled from "styled-components";

const iconsClasses = {
  CREDIT_CARD: "far fa-credit-card",
  DEBIT_CARD: "far fa-credit-card",
  BANK_TRANSFER: "fas fa-exchange-alt",
  TICKET: "fas fa-money-bill-wave-alt"
};

const IconPaymentMethod = styled.i`
  font-size: 16px;
  margin-right: 10px;
  float: right;

  @media screen and (min-width: 375px) {
    font-size: 22px;
    margin-right: 10px;
    float: right;
  }

  @media screen and (min-width: 425px) {
    font-size: 26px;
    margin-right: 30px;
    float: right;
  }
`;

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
          if (
            ["PAID", "AUTHORIZED", "PENDING"].includes(response.chargeStatus)
          ) {
            router.push(`/resumen-de-compra/${contractReference}`);
          } else {
            setPaymentError(response.statusDetails);
            setPaymentInProcess(true);
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
          <IconPaymentMethod className={`${iconsClasses[paymentMethodType]}`} />
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
                <div
                  className="mt-2 mb-1"
                  key={`paymentMethod-${paymentMethodType}-${paymentMethod.name}-${index}`}
                >
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
                    id={`paymentMethod-${paymentMethodType}-${paymentMethod.name}-${index}`}
                  />
                  <label
                    className="form-check-label w-100 cursor-pointer"
                    htmlFor={`paymentMethod-${paymentMethodType}-${paymentMethod.name}-${index}`}
                  >
                    <span>{paymentMethod.name}</span>
                    {index < 3 ? (
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
                    ) : null}
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
