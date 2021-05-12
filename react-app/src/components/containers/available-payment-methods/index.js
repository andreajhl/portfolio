import React, { Component } from "react";
import { PayPalCardForm } from "../paypal-card-form";
import { Elements } from "react-stripe-elements";
import StripeFlowHandler from "../stripe-flow-handler";
import { connect } from "react-redux";
import { WhatsappContact } from "../whatsapp-contact";
import DiscountCouponForm from "../discount-coupon-form";
import getCookie from "../../../utils/getCookie";
import { FormattedMessage } from "react-intl";
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
      },
      buyerDataIncomplete: false,
      disabledDLocalButton: false
    };
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      currencySelected: this.props.currentCurrencySelected
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.currentCurrencySelected !== prevProps.currentCurrencySelected
    ) {
      this.setState({
        ...this.state,
        currencySelected: this.props.currentCurrencySelected
      });
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

  renderWhatsappContactForm = () => {
    return getWindow().userLocation?.countryCode === "CO" ||
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
              <span>
                <FormattedMessage defaultMessage="Transferencia bancaria" />
              </span>
            </h6>
            <i class="fas fa-exchange-alt"></i>{" "}
          </div>
        </div>

        <div
          className={
            "pl-3 pr-3 pt-4 pb-4 bg-light" +
            (this.state.selectedPaymentMethod === "WHATSAPP" ? "" : " d-none ")
          }
        >
          <WhatsappContact
            text={
              <FormattedMessage defaultMessage="Haz clic en el botón de WhatsApp para que a través de este canal te podamos dar las instrucciones para concretar el pago de tu videomensaje." />
            }
            numberPhone={18559107580}
            placeHolderMessage="Quiero pagar con transferencia bancaria"
          />
        </div>
      </div>
    ) : null;
  };

  renderPaypalForm = (index) => {
    return (
      <div
        key={`${index}-PAYPAL`}
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
    );
  };

  renderStripeForm = (index) => {
    return (
      <div
        className="payment-type mb-3"
        key={`${index}-STRIPE`}
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
              <span>
                <FormattedMessage defaultMessage="Tarjeta de Crédito o Débito" />
              </span>
            </h6>
            <i className="far fa-credit-card"></i>
          </div>
        </div>
        <div
          className={
            "pl-3 pr-3 pt-4 pb-4 bg-light" +
            (this.state.selectedPaymentMethod === "STRIPE" ? "" : " d-none ")
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
  };

  renderDLocalForm = (index, paymentMethod) => {
    return (
      <div
        key={`${index}-${paymentMethod.paymentMethodType}`}
        className="payment-type mb-3"
        onClick={() =>
          this.changeMethodPayment(paymentMethod.paymentMethodType)
        }
      >
        <DLocalPaymentsMethods
          disabledButton={this.state.disabledDLocalButton}
          handleBuyerDataIncomplete={this.onBuyerDataIncomplete}
          buyerData={this.state.buyerData}
          isSelected={
            this.state.selectedPaymentMethod === paymentMethod.paymentMethodType
          }
          paymentMethodType={paymentMethod.paymentMethodType}
          paymentsMethodsAvailable={paymentMethod.availablePaymentMethods}
          contractReference={this.props.contractReference}
          discountCouponId={this.props.couponData.data.id}
        />
      </div>
    );
  };

  changeToWhatsapp = (e) => {
    // e.preventDefault();

    this.setState({
      ...this.state,
      selectedPaymentMethod: "WHATSAPP"
    });
  };

  changeMethodPayment = (e) => {
    this.setState((prevState) => ({ ...prevState, selectedPaymentMethod: e }));
  };

  onChangeFormDLocal = (buyerData) => {
    this.setState({
      ...this.state,
      buyerData: {
        ...buyerData
      }
    });
  };
  onBuyerDataIncomplete = () => {
    this.setState((prevState) => ({ ...prevState, buyerDataIncomplete: true }));
  };

  onValidBuyerDataForDLocal = (boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      disabledDLocalButton: boolean
    }));
  };
  render() {
    const shouldDisplayBuyerForm = this.props.paymentMethodsAvailable?.some(
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
              <div className="d-flex mb-2 pl-1">
                <span className="payment-methods__steps-to-pay">1</span>{" "}
                <span className="ml-2 font-weight-bold">
                  <FormattedMessage defaultMessage="Datos de la persona que realiza el pago" />
                </span>
              </div>
              <DLocalPaymentsForm
                handleValidateData={this.onValidBuyerDataForDLocal}
                currency={this.props.currentCurrencySelected}
                buyerDataIncomplete={this.state.buyerDataIncomplete}
                handleChangedInputs={(buyerData) =>
                  this.onChangeFormDLocal(buyerData)
                }
              />
            </React.Fragment>
          ) : null}

          <div className="d-flex pl-1 mb-4 mt-4">
            <span className="payment-methods__steps-to-pay">
              {shouldDisplayBuyerForm ? "2" : "1"}
            </span>{" "}
            <span className="ml-2 font-weight-bold">
              <FormattedMessage defaultMessage="Elige el método de pago" />
            </span>
          </div>

          {this.props.paymentMethodsAvailable?.map((paymentMethod, index) => {
            if (paymentMethod.paymentMethodType === "PAYPAL")
              return this.renderPaypalForm(index);

            if (paymentMethod.paymentMethodType === "STRIPE")
              return this.renderStripeForm(index);

            if (paymentMethod.paymentMethodType === "BANK_TRANSFER")
              return this.renderDLocalForm(index, paymentMethod);

            if (paymentMethod.paymentMethodType === "TICKET")
              return this.renderDLocalForm(index, paymentMethod);

            if (paymentMethod.paymentMethodType === "CREDIT_CARD")
              return this.renderDLocalForm(index, paymentMethod);

            if (paymentMethod.paymentMethodType === "DEBIT_CARD") {
              return this.renderDLocalForm(index, paymentMethod);
            } else {
              return null;
            }
          })}

          {this.renderWhatsappContactForm()}
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
