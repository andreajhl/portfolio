import React, { Component } from "react";
import { PayPalCardForm } from "../paypal-card-form";
import { Elements } from "react-stripe-elements";
import StripeFlowHandler from "../stripe-flow-handler";
import { connect } from "react-redux";
import { WhatsappContact } from "../whatsapp-contact";
import DiscountCouponForm from "../discount-coupon-form";
import getWindow from "react-app/src/utils/getWindow";
import { DLocalPaymentsMethods } from "../d-local-payments-methods/index";
import { DLocalPaymentsForm } from "../d-local-payments-form";
import { listPaymentGateways } from "../../../state/ducks/payments/operations";
import { LoaderLayout } from "../../layouts/loader";
class AvailablePaymentMethods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPaymentMethod: "STRIPE",
      currencySelected: this.props.currentCurrencySelected,
      buyerData: {
        buyerFullName: "",
        buyerEmail: "",
        buyerDocment: ""
      }
    };
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      currencySelected: this.props.currentCurrencySelected
    });
    this.getPaymentsGatewaysMethods(this.props.currentCurrencySelected);
  }

  getPaymentsGatewaysMethods = (currency) => {
    this.props.listPaymentGateways(currency);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.currentCurrencySelected !== prevProps.currentCurrencySelected
    ) {
      this.setState(
        {
          ...this.state,
          currencySelected: this.props.currentCurrencySelected
        },
        () =>
          this.getPaymentsGatewaysMethods(this.props.currentCurrencySelected)
      );
    }
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

  changeMethodPayment = (e) => {
    this.setState({
      ...this.state,
      selectedPaymentMethod: e
    });
  };

  onChangeFormDLocal = (buyerData) => {
    this.setState({
      ...this.state,
      buyerData: {
        ...buyerData
      }
    });
  };

  render() {
    const shouldDisplayBuyerForm = this.props.paymentMethodsAvailable.some(
      (payment) =>
        ["BANK_TRANSFER", "TICKET", "CREDIT_CARD"].includes(
          payment.paymentMethodType
        )
    );
    return this.props.paymentMethodsAvailableIsLoading ? (
      <div
        style={{ minHeight: "10vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <LoaderLayout></LoaderLayout>
      </div>
    ) : (
      <div className="AvailablePaymentMethods mx-auto">
        <div className={"payment-types f-rounded"}>
          {shouldDisplayBuyerForm ? (
            <React.Fragment>
              <div className="d-flex pl-1">
                <span className="payment-methods__steps-to-pay">2</span>{" "}
                <span className="ml-2 font-weight-bold">
                  Datos de la persona que realiza el pago
                </span>
              </div>
              <DLocalPaymentsForm
                handleChangedInputs={(buyerData) =>
                  this.onChangeFormDLocal(buyerData)
                }
              />
            </React.Fragment>
          ) : null}
          <div className="d-flex pl-1">
            <span className="payment-methods__steps-to-pay">
              {shouldDisplayBuyerForm ? "3" : "2"}
            </span>{" "}
            <span className="pl-1 font-weight-bold">
              Elige el método de pago
            </span>
          </div>

          {this.props.paymentMethodsAvailable.map((paymentMethod) => {
            if (paymentMethod.paymentMethodType === "PAYPAL") {
              return (
                <div
                  className="payment-type mb-3"
                  onClick={() => this.changeMethodPayment("PAYPAL")}
                >
                  <div className="titles">
                    <div className="icon">
                      {this.state.selectedPaymentMethod === "PAYPAL" ? (
                        <i className={`far  fa-dot-circle`}></i>
                      ) : (
                        <i className="far fa-circle"></i>
                      )}
                    </div>
                    <div className="payment-type-title">
                      <h6 className={"font-weight-normal"}>
                        <span>PayPal</span>
                      </h6>
                      <i class="fab fa-paypal"></i>
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
              );
            } else if (paymentMethod.paymentMethodType === "STRIPE") {
              return (
                <div
                  className="payment-type mb-3"
                  onClick={() => this.changeMethodPayment("STRIPE")}
                >
                  <div className="titles">
                    <div className="icon">
                      {this.state.selectedPaymentMethod === "STRIPE" ? (
                        <i className={`far  fa-dot-circle`}></i>
                      ) : (
                        <i className="far fa-circle"></i>
                      )}
                    </div>
                    <div className="payment-type-title">
                      <h6 className={"font-weight-normal"}>
                        <span>Tarjeta de Crédito o Débito</span>
                      </h6>
                      <i className="far fa-credit-card"></i>
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
              );
            } else if (paymentMethod.paymentMethodType === "BANK_TRANSFER") {
              return (
                <div
                  className="payment-type mb-3"
                  onClick={() => this.changeMethodPayment("BANK_TRANSFER")}
                >
                  <DLocalPaymentsMethods
                    buyerData={this.state.buyerData}
                    isSelected={
                      this.state.selectedPaymentMethod === "BANK_TRANSFER"
                    }
                    paymentMethodType={paymentMethod.paymentMethodType}
                    paymentsMethodsAvailable={
                      paymentMethod.availablePaymentMethods
                    }
                    contractReference={this.props.contractReference}
                    discountCouponId={this.props.couponData.data.id}
                  />
                </div>
              );
            } else if (paymentMethod.paymentMethodType === "TICKET") {
              return (
                <div
                  className="payment-type mb-3"
                  onClick={() => this.changeMethodPayment("TICKET")}
                >
                  <DLocalPaymentsMethods
                    isSelected={this.state.selectedPaymentMethod === "TICKET"}
                    paymentMethodType={paymentMethod.paymentMethodType}
                    paymentsMethodsAvailable={
                      paymentMethod.availablePaymentMethods
                    }
                    buyerData={this.state.buyerData}
                    contractReference={this.props.contractReference}
                    discountCouponId={this.props.couponData.data.id}
                  />
                </div>
              );
            } else if (paymentMethod.paymentMethodType === "CREDIT_CARD") {
              return (
                <div
                  className="payment-type mb-3"
                  onClick={() => this.changeMethodPayment("CREDIT_CARD")}
                >
                  <DLocalPaymentsMethods
                    isSelected={
                      this.state.selectedPaymentMethod === "CREDIT_CARD"
                    }
                    paymentMethodType={paymentMethod.paymentMethodType}
                    paymentsMethodsAvailable={
                      paymentMethod.availablePaymentMethods
                    }
                    buyerData={this.state.buyerData}
                    contractReference={this.props.contractReference}
                    discountCouponId={this.props.couponData.data.id}
                  />
                </div>
              );
            } else if (paymentMethod.paymentMethodType === "DEBIT_CARD") {
              return (
                <div
                  className="payment-type mb-3"
                  onClick={() => this.changeMethodPayment("DEBIT_CARD")}
                >
                  <DLocalPaymentsMethods
                    isSelected={
                      this.state.selectedPaymentMethod === "DEBIT_CARD"
                    }
                    paymentMethodType={paymentMethod.paymentMethodType}
                    paymentsMethodsAvailable={
                      paymentMethod.availablePaymentMethods
                    }
                    buyerData={this.state.buyerData}
                    contractReference={this.props.contractReference}
                    discountCouponId={this.props.couponData.data.id}
                  />
                </div>
              );
            }
          })}

          {getWindow().userLocation?.countryCode === "CO" ||
          getWindow().userLocation?.countryCode === "MX" ? (
            <div className="payment-type mb-3" onClick={this.changeToWhatsapp}>
              <div className="titles">
                <div className="icon">
                  {this.state.selectedPaymentMethod === "WHATSAPP" ? (
                    <i className={`far  fa-dot-circle`}></i>
                  ) : (
                    <i class="far fa-circle"></i>
                  )}
                </div>
                <div className="payment-type-title">
                  <h6 className={"font-weight-normal"}>
                    <span>Transferencia bancaria</span>
                  </h6>
                  <i class="fas fa-exchange-alt"></i>{" "}
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
                  placeHolderMessage="Quiero pagar con transferencia bancaria"
                />
              </div>
            </div>
          ) : null}
          <DiscountCouponForm />
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
  paymentMethodsAvailableIsLoading:
    state.payments.fetchPaymentGatewaysReducer.loading,
  paymentMethodsAvailable: state.payments.fetchPaymentGatewaysReducer.data,
  couponData: state.payments.fetchDiscountCouponReducer,
  currencyExchangeData: state.payments.currencyExchangeReducer
});

// Export Class
const _AvailablePaymentMethods = connect(mapStateToProps, {
  listPaymentGateways
})(AvailablePaymentMethods);
export { _AvailablePaymentMethods as AvailablePaymentMethods };
