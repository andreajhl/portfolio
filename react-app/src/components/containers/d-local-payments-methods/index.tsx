import { AVAILABLE_PAYMENTS_METHODS } from "../../../../../constants/availablePaymentsMethods";
import React, { useState } from "react";
import { processDlocalPayment } from "../../../state/ducks/payments/actions";

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
    buyerFullname: string;
    buyerEmail: string;
    buyerDocument: string;
  };
  discountCounponId: null | string | number;
  isSelected: boolean;
};

const DLocalPaymentsMethods = ({
  contractReference,
  paymentMethodType,
  paymentsMethodsAvailable = [],
  buyerData,
  discountCounponId,
  isSelected
}: DLocalPaymentsMethodsProps) => {
  const handleChangePaymentMethod = (name, paymentMethodId) => {
    setCurrentOption({ name, paymentMethodId });
  };
  const [currentOption, setCurrentOption] = useState({
    name: "",
    paymentMethodId: ""
  });

  const handleStartPayment = async () => {
    try {
      processDlocalPayment(
        contractReference,
        currentOption.paymentMethodId,
        buyerData.buyerFullname,
        buyerData.buyerEmail,
        buyerData.buyerDocument,
        discountCounponId
      )
        .then((response) => {
          if (response.requiredRedirect) {
            window.location.replace(response.redirectUri);
          }
        })
        .catch((e) => console.log("Error", e));
    } catch (e) {
      console.log("Error", e);
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
          <i className="far fa-credit-card"></i>
        </div>
      </div>
      <div
        className={`pl-3 pr-3 pt-4 pb-4 bg-light ${isSelected ? "" : "d-none"}`}
      >
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
                  style={{
                    position: "absolute",
                    left: "90%"
                  }}
                  height="20px"
                  src={paymentMethod.logo}
                />
              </label>
            </div>
          ))}
        </div>
        <button
          style={{
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            height: "45px"
          }}
          className="btn btn-primary w-100"
          onClick={() => handleStartPayment()}
        >
          Botón de prueba
        </button>
      </div>
    </React.Fragment>
  );
};

export { DLocalPaymentsMethods };
