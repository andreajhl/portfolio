import React, { useEffect } from "react";
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
  price,
  couponData,
  currencyExchangeData,
  clearCouponData
}) => {
  useEffect(() => {
    clearCouponData();
    return () => {
      clearCouponData();
    };
  }, []);
  const applyDiscount = () => {
    let discountTotal = 0;
    if (couponData.data.isPercentageDiscount) {
      discountTotal = couponData.data.discount_amount * price;
      if (discountTotal > couponData.data.maxDiscountAmount) {
        discountTotal = couponData.data.maxDiscountAmount;
      }
    } else {
      discountTotal = couponData.data.discount_amount;
    }
    return price - discountTotal;
  };
  return (
    <>
      <div className='container-contract-checkout-summary'>
        <div className='container-contract-checkout-summary__celebrity-details'>
          <Image
            className='container-contract-checkout-summary__celebrity-avatar'
            src={celebrityAvatar}
            roundedCircle
          />
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
          <ContractPriceLayout
            classes={"text-black font-weight-bold"}
            availableDiscount={
              couponData.completed
                ? {
                    initialPrice: price,
                    isPercentageDiscount: couponData.data.isPercentageDiscount,
                    discountAmount: couponData.data.discount_amount
                  }
                : false
            }
            price={couponData.completed ? applyDiscount() : price}
            currency={"USD"}
            currencyExchangeData={currencyExchangeData}
            rounding={false}
          />
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
const mapStateToProps = (state) => {
  return {
    couponData: state.payments.fetchDiscountCouponReducer,
    currencyExchangeData: state.payments.currencyExchangeReducer.data
  };
};
// mapStateToProps
const mapDispatchToProps = {
  clearCouponData: paymentsOperations.clearCouponData
};
// Export Class
const _ContractCheckoutSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractCheckoutSummary);
export { _ContractCheckoutSummary as ContractCheckoutSummary };
