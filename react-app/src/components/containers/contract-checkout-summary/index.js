import React, { Component } from "react";
import "./styles.scss";
import { ContractPriceLayout } from "../../layouts/checkout-contract-price";
import { paymentsOperations } from "../../../state/ducks/payments";
import { Image } from "react-bootstrap";
import { connect } from "react-redux";

const ContractCheckoutSummary = ({
  celebrityAvatar,
  celebrityFullName,
  deliveryFrom,
  deliveryTo,
  instructions,
  price
}) => {
  return (
    <>
      <div className='container-contract-checkout-summary'>
        <div className='container-contract-checkout-summary__celebrity-details'>
          <Image height='90' src={celebrityAvatar} roundedCircle />
          <div className='container-contract-checkout-summary__title'>
            <span>Video personalizado de {celebrityFullName}</span>
          </div>
        </div>
        <hr className='w-100'></hr>
        <div className='container-contract-checkout-summary__delivery-details'>
          <div className='d-flex'>
            <div className='container-contract-checkout-summary__name-user'>
              <span className='container-contract-checkout-summary__to-label'>
                Para:
              </span>{" "}
              <span>{deliveryTo}</span>
            </div>
            <div className='container-contract-checkout-summary__name-user'>
              <span className='container-contract-checkout-summary__to-label ml-5'>
                De:{" "}
              </span>
              <span>{deliveryFrom}</span>
            </div>
          </div>
          <div className='container-contract-checkout-summary__message'>
            <span className='container-contract-checkout-summary__message-title'>
              Mensaje
            </span>
            <span className='container-contract-checkout-summary__message-content'>
              {instructions}
            </span>
          </div>
          <hr className='w-100'></hr>
          <ContractPriceLayout price={price} />
        </div>
      </div>
    </>
  );
};

// Set defaultProps
ContractCheckoutSummary.defaultProps = {
  celebrityAvatar: "",
  celebrityFullName: "",
  deliveryFrom: "",
  deliveryTo: "",
  instructions: "",
  price: 0
};

// mapStateToProps

// mapStateToProps

// Export Class
const _ContractCheckoutSummary = connect(null, null)(ContractCheckoutSummary);
export { _ContractCheckoutSummary as ContractCheckoutSummary };
