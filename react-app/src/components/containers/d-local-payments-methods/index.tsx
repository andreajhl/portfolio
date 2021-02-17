import { type } from "os";
import React, { useState } from "react";
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
  paymentsMethodsAvailable,
  buyerData,
  discountCounponId,
  isSelected
}: DLocalPaymentsMethodsProps) => {
  const handleChangePaymentMethod = (name) => {
    console.log(name);
    setCurrentOption(name);
  };
  const [currentOption, setCurrentOption] = useState(null);
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
            <span>{paymentMethodType}</span>
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
                name="paymentMethod"
                value={paymentMethod.name}
                checked={currentOption === paymentMethod.name}
                onChange={() => handleChangePaymentMethod(paymentMethod.name)}
                id={`paymentMethod-${paymentMethod.name}-${index}`}
              />
              <label
                className="form-check-label w-100 cursor-pointer"
                htmlFor={`paymentMethod-${paymentMethod.name}-${index}`}
              >
                {paymentMethod.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export { DLocalPaymentsMethods };
