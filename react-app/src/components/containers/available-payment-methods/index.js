import React, { Component } from "react";
import "./styles.scss";
import { PayPalCardForm } from "../paypal-card-form";
import { Elements } from "react-stripe-elements";
import StripeFlowHandler from "../stripe-flow-handler";
import { connect } from "react-redux";
import { WhatsappContact } from "../whatsapp-contact";

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
  changeToWhatsapp = (e) => {
    // e.preventDefault();

    this.setState({
      ...this.state,
      selectedPaymentMethod: "WHATSAPP"
    });
  };

  render() {
    return (
      <div className='AvailablePaymentMethods mx-auto'>
        <div className={"payment-types f-rounded"}>
          <div className={"font-weight-bold pt-2 pl-3 pb-2 mb-2"}>
            Elige el método de pago
          </div>
          <div className='payment-type mb-3' onClick={this.changeToStripe}>
            <div className='titles'>
              <div className='icon'>
                {this.state.selectedPaymentMethod === "STRIPE" ? (
                  <i className={`far  fa-dot-circle`}></i>
                ) : (
                  <i class='far fa-circle'></i>
                )}
              </div>
              <div className='payment-type-title'>
                <h6 className={"font-weight-normal"}>
                  <span>Tarjeta de Crédito o Débito</span>
                </h6>
                <i class='far fa-credit-card'></i>
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
          <div className='payment-type mb-3' onClick={this.changeToPaypal}>
            <div className='titles'>
              <div className='icon'>
                {this.state.selectedPaymentMethod === "PAYPAL" ? (
                  <i className={`far  fa-dot-circle`}></i>
                ) : (
                  <i class='far fa-circle'></i>
                )}
              </div>
              <div className='payment-type-title'>
                <h6 className={"font-weight-normal"}>
                  <span>PayPal</span>
                </h6>
                <i class='fab fa-paypal'></i>
              </div>
            </div>
            <div
              className={
                "pl-3 pr-3 pt-4 pb-4 bg-light" +
                (this.state.selectedPaymentMethod === "PAYPAL"
                  ? ""
                  : " d-none ")
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
          {true || window.userLocation.countryCode === "MX" ? (
            <div className='payment-type mb-3' onClick={this.changeToWhatsapp}>
              <div className='titles'>
                <div className='icon'>
                  {this.state.selectedPaymentMethod === "WHATSAPP" ? (
                    <i className={`far  fa-dot-circle`}></i>
                  ) : (
                    <i class='far fa-circle'></i>
                  )}
                </div>
                <div className='payment-type-title'>
                  <h6 className={"font-weight-normal"}>
                    <span>Transferencia bancaria</span>
                  </h6>
                  <i class='fas fa-exchange-alt'></i>{" "}
                </div>
              </div>

              <div
                className={
                  "pl-3 pr-3 pt-4 pb-4 bg-light" +
                  (this.state.selectedPaymentMethod === "WHATSAPP"
                    ? ""
                    : " d-none ")
                }
              >
                <WhatsappContact
                  text={
                    "Haz clic en el botón de WhatsApp para que a través de este canal te podamos dar las instrucciones para concretar el pago de tu videomensaje."
                  }
                  numberPhone={18559107580}
                  placeHolderMessage='Quiero pagar con transferencia bancaria'
                />
              </div>
            </div>
          ) : null}
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
const mapStateToProps = (state) => ({
  couponData: state.payments.fetchDiscountCouponReducer
});

// Export Class
const _AvailablePaymentMethods = connect(mapStateToProps)(
  AvailablePaymentMethods
);
export { _AvailablePaymentMethods as AvailablePaymentMethods };
