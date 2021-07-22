import React, { useState, useRef } from "react";
import { processDlocalPayment } from "../../../state/ducks/payments/actions";
import DLocalFormCard from "../dLocal-form-card";
import SelectCardBankPaymentMethod from "../select-cardbank-payment-method";
import { useRouter } from "next/router";
import styled from "styled-components";
import { LoaderLayout } from "../../layouts/loader";
import { generateDeviceId } from "react-app/src/utils/generateDeviceId";
import { USER_IP_ADDRESS } from "constants/keys";
import { getIpAddress } from "react-app/src/state/utils/localizationApiService";
import { PURCHASE_SUMMARY } from "react-app/src/routing/Paths";
import { FormattedMessage } from "react-intl";
import { AVAILABLE_PAYMENTS_METHODS } from "react-app/src/constants/messages";
import getCookie from "react-app/src/utils/getCookie";
import { analytics } from "react-app/src/state/utils/gtm";

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

const Label = styled.label`
  cursor: pointer;
  font-size: 1rem;
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.5em;
  color: #fb177d;
`;

const RadioControl = styled.span`
  display: block;
  width: 1.3em;
  height: 1.3em;
  border-radius: 50%;
  transform: translateY(-0.05em);
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.15);
`;
const RadioLabel = styled.span`
  line-height: 1;
`;
const RadioInput = styled.span`
  display: flex;
  input {
    opacity: 0;
    width: 0;
    height: 0;
    // ...existing styles
    &:checked + ${RadioControl} {
      background: radial-gradient(#fb177d 25%, rgba(255, 0, 0, 0) 40%);
    }
  }
`;

const PAYMENT_METHODS_WITH_CARD_REQUIRED = ["DEBIT_CARD", "CREDIT_CARD"];

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
  handleBuyerDataIncomplete: Function;
  disabledButton?: boolean;
  contractPrice?: number;
  celebrityId?: number;
};

const DLocalPaymentsMethods = ({
  contractReference,
  paymentMethodType,
  paymentsMethodsAvailable = [],
  buyerData,
  discountCouponId,
  isSelected,
  handleBuyerDataIncomplete,
  disabledButton,
  contractPrice,
  celebrityId
}: DLocalPaymentsMethodsProps) => {
  const router = useRouter();
  const handleChangePaymentMethod = (name, paymentMethodId) => {
    setCurrentOption({ name: name, paymentMethodId: paymentMethodId });
  };
  const [currentOption, setCurrentOption] = useState({
    name: "",
    paymentMethodId: ""
  });
  const [paymentError, setPaymentError] = useState("");
  const [paymentInProcess, setPaymentInProcess] = useState(false);
  const selectCardDiv = useRef<HTMLInputElement>(null);
  const inputLabel = useRef<HTMLInputElement>(null);
  const [labelIncomplete, setLabelIncomplete] = useState(false);
  const [cardIsIncomplete, setCardIsIncomplete] = useState(false);

  const handleStartPayment = async (cardToken) => {
    setPaymentInProcess(true);
    analytics.track("START_DLOCAL_PAYMENT", {
      widget: "DLocalPaymentMethodForm",
      paymentMethodType,
      contractReference,
      discountCouponId,
      contractPrice,
      celebrityId
    });
    let IP = null;
    const deviceId = generateDeviceId();
    const userIpFromCookies = getCookie(USER_IP_ADDRESS);
    if (userIpFromCookies) {
      IP = userIpFromCookies;
    } else {
      const userIpGetFromExternalService = await getIpAddress();
      IP = userIpGetFromExternalService;
    }
    try {
      processDlocalPayment(
        contractReference,
        currentOption.paymentMethodId,
        buyerData.buyerFullName,
        buyerData.buyerEmail,
        buyerData.buyerDocument,
        discountCouponId ? discountCouponId : null,
        cardToken,
        String(deviceId),
        IP
      )
        .then((response) => {
          if (
            ["PAID", "AUTHORIZED", "PENDING"].includes(response.chargeStatus)
          ) {
            if (response.requiredRedirect) {
              window.location.replace(response.redirectUri);
            } else {
              analytics.trackContractPurchase({
                contractPrice,
                celebrityId
              });
              analytics.track("CONTRACT_PAYED", {
                widget: "DLocalPaymentMethodForm",
                paymentMethod: "DLocal",
                contractReference,
                discountCouponId,
                contractPrice,
                celebrityId
              });
              router.push(
                PURCHASE_SUMMARY.replace(
                  ":contract_reference",
                  String(contractReference)
                )
              );
            }
          } else {
            setPaymentError(response.statusDetails);
            setPaymentInProcess(false);
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

  const checkBuyerData = () => {
    if (
      buyerData.buyerDocument &&
      buyerData.buyerEmail &&
      buyerData.buyerFullName
    ) {
      return true;
    }
    return false;
  };

  const checkOptionSelected = () => {
    if (currentOption.paymentMethodId || currentOption.name) {
      return true;
    } else {
      return false;
    }
  };

  const handleOptionSelectedIncomplete = () => {
    if (
      paymentMethodType === "CREDIT_CARD" ||
      paymentMethodType === "DEBIT_CARD"
    ) {
      setCardIsIncomplete(true);
      const nodeDocument = selectCardDiv.current;
      nodeDocument?.focus();
    } else {
      setLabelIncomplete(true);
      const nodeDocument = inputLabel.current;
      nodeDocument?.focus();
    }
  };

  const onStartPayment = (token) => {
    // Check if buyer daya is completed
    if (checkBuyerData()) {
      if (checkOptionSelected()) {
        handleStartPayment(token);
      } else {
        handleOptionSelectedIncomplete();
      }
    } else {
      handleBuyerDataIncomplete();
    }
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
        <div className="mt-2">
          {PAYMENT_METHODS_WITH_CARD_REQUIRED.includes(paymentMethodType) ? (
            <>
              <div className="form-check d-flex p-0 flex-column ">
                <label
                  style={{
                    fontWeight: "lighter",
                    color: "#838383"
                  }}
                >
                  <FormattedMessage defaultMessage="Selecciona una tarjeta" />
                </label>
                <SelectCardBankPaymentMethod
                  onChangeOptionSelected={(selected) =>
                    handleChangePaymentMethod(selected.name, selected.value)
                  }
                  options={paymentsMethodsAvailable.map((paymentMethod) => ({
                    value: paymentMethod.id,
                    label: paymentMethod.name
                  }))}
                />
                {cardIsIncomplete ? (
                  <span className="text-danger text-center">
                    <FormattedMessage defaultMessage="Por favor seleccione una tarjeta" />
                  </span>
                ) : null}
              </div>
              <DLocalFormCard
                paymentMethodType={paymentMethodType}
                paymentErrorMessage={paymentError}
                disabled={paymentInProcess || disabledButton}
                paymentInProcess={paymentInProcess}
                handleStartPayment={(token) => onStartPayment(token)}
                currentOption={currentOption}
              ></DLocalFormCard>
            </>
          ) : (
            <>
              <div className="form-check d-flex p-0 flex-column ">
                <div ref={inputLabel} className="form-check d-flex flex-column">
                  {paymentsMethodsAvailable.map((paymentMethod, index) => (
                    <div
                      key={`paymentMethod-${paymentMethodType}-${paymentMethod.name}-${index}`}
                    >
                      <Label
                        htmlFor={`paymentMethod-${paymentMethodType}-${paymentMethod.name}-${index}`}
                      >
                        <RadioInput>
                          <input
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
                          <RadioControl />
                        </RadioInput>
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

                        <RadioLabel>{paymentMethod.name}</RadioLabel>
                      </Label>
                    </div>
                  ))}
                </div>
                {labelIncomplete ? (
                  <span className="text-center text-danger">
                    <FormattedMessage defaultMessage="Por favor seleccione una opción" />
                  </span>
                ) : null}
              </div>
              <div className="d-flex align-items-center flex-column">
                <span
                  className="text-danger"
                  style={{
                    fontSize: "10px"
                  }}
                >
                  {paymentError}
                </span>
                <button
                  onClick={(e) => onStartPayment(null)}
                  disabled={paymentInProcess || disabledButton}
                  className="btn btn-primary mx-auto mt-2"
                  style={{
                    backgroundColor: `${
                      paymentInProcess ? "white" : "#FB177D"
                    }`,
                    height: "50px",
                    borderRadius: "10px",
                    width: "100%"
                  }}
                >
                  {paymentInProcess ? <LoaderLayout /> : "Pagar"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export { DLocalPaymentsMethods };
