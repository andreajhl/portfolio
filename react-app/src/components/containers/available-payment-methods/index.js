import React, { Component } from "react";
import "./styles.scss";
import { PayPalCardForm } from "../paypal-card-form";
import { Elements } from "react-stripe-elements";
import StripeFlowHandler from "../stripe-flow-handler";
import { connect } from "react-redux";

class AvailablePaymentMethods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPaymentMethod: "STRIPE"
    };
  }
  componentDidMount() {
    console.log(this.props);
  }

  changeToStripe = (e) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      selectedPaymentMethod: "STRIPE"
    });
  };

  applyDiscount() {
    let discountTotal = 0;
    if (this.props.couponData.data.isPercentageDiscount) {
      discountTotal =
        this.props.couponData.data.discount_amount * this.props.contractPrice;
      if (discountTotal > this.props.couponData.data.maxDiscountAmount) {
        discountTotal = this.props.couponData.data.maxDiscountAmount;
      }
    } else {
      discountTotal = this.props.couponData.data.discount_amount;
    }
    return this.props.contractPrice - discountTotal;
  }

  changeToPaypal = (e) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      selectedPaymentMethod: "PAYPAL"
    });
  };

  render() {
    return (
      <div className="AvailablePaymentMethods mx-auto mt-2">
        <p className="font-weight-bold h5 mb-3">
          Pagar con Paypal (recomendado)
        </p>
        <div
          className="payment-type mb-4 cursor-pointer"
          onClick={this.changeToPaypal}
        >
          <div className="titles text-center mb-3">
            <img
              src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
              alt="Logo de Paypal"
              width="125px"
            />
          </div>
          <div
            className={
              "pl-3 pr-3 pt-4 pb-4 bg-light" +
              (this.state.selectedPaymentMethod === "PAYPAL" ? "" : " d-none ")
            }
          >
            <PayPalCardForm
              contractReference={this.props.contractReference}
              contractPrice={
                this.props.couponData.completed
                  ? this.applyDiscount()
                  : this.props.contractPrice
              }
              discountCouponId={this.props.couponData.data.id}
            />
          </div>
        </div>
        <p className="font-weight-bold h5 mb-4">Pagar con tarjeta de crédito</p>
        <div className={"payment-types f-rounded"}>
          <div className="payment-type mb-3" onClick={this.changeToStripe}>
            <div className="titles">
              <div className="icon">
                <i className="ml-2 fa fa-credit-card" />
              </div>
              <div className="payment-type-title">
                <h6 className={"font-weight-normal"}>
                  <span>Tarjeta de Crédito o Débito</span>
                  {/*Pago con tarjeta de crédito*/}
                </h6>
              </div>
            </div>
            <div
              className={
                "pl-3 pr-3 pt-4 pb-4 bg-light" +
                (this.state.selectedPaymentMethod === "STRIPE"
                  ? ""
                  : " d-none ")
              }
            >
              <Elements>
                <StripeFlowHandler
                  contractReference={this.props.contractReference}
                  contractPrice={
                    this.props.couponData.completed
                      ? this.applyDiscount()
                      : this.props.contractPrice
                  }
                  discountCouponId={this.props.couponData.data.id}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Set propTypes
AvailablePaymentMethods.propTypes = {};

// Set defaultProps
AvailablePaymentMethods.defaultProps = {
  contractReference: "",
  contractPrice: 0
};
// mapStateToProps
const mapStateToProps = (state: any) => ({
  couponData: state.payments.fetchDiscountCouponReducer
});

// Export Class
const _AvailablePaymentMethods = connect(mapStateToProps)(
  AvailablePaymentMethods
);
export { _AvailablePaymentMethods as AvailablePaymentMethods };
