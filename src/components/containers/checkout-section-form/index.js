import React, {Component} from "react";
import "./styles.scss";
import {PaymentMethodsSection} from "../../containers/payment-methods-section";
import {ContractCheckoutSummary} from "../../containers/contract-checkout-summary";
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";
import {CheckoutBuyerData} from "../checkout-buyer-data";
import {ContractCurrencyPayment} from "../contract-currency-payment";

class CheckoutSectionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      currency: "USD",
      buyerData: {},
      paymentMethod: {},
      paymentType: {},
      stripeToken: ""
    };
    this.onSelectCurrency = this.onSelectCurrency.bind(this);
    this.onBuyerDataChange = this.onBuyerDataChange.bind(this);
    this.onSelectPaymentMethod = this.onSelectPaymentMethod.bind(this);
    this.onSelectPaymentType = this.onSelectPaymentType.bind(this);
    this.onPay = this.onPay.bind(this);
    this.onTokenizeStripeCard = this.onTokenizeStripeCard.bind(this);
    this.createStripePayment = this.createStripePayment.bind(this);

    this.paymentMethodsSectionRef = React.createRef();
  }

  onSelectCurrency(currency) {
    this.setState({
      currency
    });
  }

  onBuyerDataChange(buyerData) {
    this.setState({
      buyerData
    });
  }

  onSelectPaymentMethod(paymentMethod) {
    this.setState({
      paymentMethod
    }, () => {
      console.log("paymentMethod:", paymentMethod)
    });
  }

  onSelectPaymentType(paymentType) {
    this.setState({
      paymentType
    });
  }

  returnCountry() {
    let country = null;
    if (this.state.currency === "ARS") {
      country = "AR";
    } else if (this.state.currency === "BOB") {
      country = "BO";
    } else if (this.state.currency === "BRL") {
      country = "BR";
    } else if (this.state.currency === "CLP") {
      country = "CL";
    } else if (this.state.currency === "CNY") {
      country = "CN";
    } else if (this.state.currency === "COP") {
      country = "CO";
    } else if (this.state.currency === "USD") {
      country = "US";
    } else if (this.state.currency === "INR") {
      country = "IN";
    } else if (this.state.currency === "IDR") {
      country = "ID";
    } else if (this.state.currency === "MXN") {
      country = "MX";
    } else if (this.state.currency === "MAD") {
      country = "MA";
    } else if (this.state.currency === "PYG") {
      country = "PY";
    } else if (this.state.currency === "PEN") {
      country = "PE";
    } else if (this.state.currency === "ZAR") {
      country = "ZA";
    } else if (this.state.currency === "TRY") {
      country = "TR";
    } else if (this.state.currency === "UYU") {
      country = "UY";
    }
    return country
  }

  onPay() {
    this.setState({
      error: null
    }, () => {
      try {
        switch (this.state.paymentType.gateway_name) {
          case "STRIPE":
            return this.paymentMethodsSectionRef.current.tokenizeStripeCard();
          case "DLOCAL":
            return this.createDlocalPayment();
          default:
            this.setState({
              error: "Debes seleccionar un método de pago."
            })
        }
      }catch (e) {
        this.setState({
          error: "Debes seleccionar un método de pago."
        })
      }
    });
  }

  createDlocalPayment() {
    this.props.createDlocalPayment({
      buyer_full_name: this.state.buyerData.full_name,
      buyer_email: this.state.buyerData.email,
      buyer_document: this.state.buyerData.document,
      contract_reference: this.props.contractData.reference,
      payment_method_id: this.state.paymentMethod.id,
      country: this.returnCountry(),
    });
  }

  createStripePayment() {
    this.props.createStripePayment({
      contract_reference: this.props.contractData.reference,
      payment_method_id: this.state.paymentMethod.id,
      stripe_card_token: this.state.stripeToken
    });
  }


  // checkButtonAvailability() {
  //     if (this.state.currency !== "USD") {
  //         return this.state.buyerData.full_name && this.state.buyerData.email && this.state.buyerData.document && this.state.paymentMethod.name && !this.props.isLoading;
  //     } else {
  //
  //     }
  // }

  onTokenizeStripeCard(status, token_id) {
    if (status === "ERROR") {
      this.setState({
        error: "Error al validar la tarjeta de crédito"
      });
    } else {
      this.setState({
        stripeToken: token_id
      }, () => {
        this.createStripePayment()
      });
    }
  }

  render() {
    return (
        <div className="CheckoutSectionForm">
          <div className="row checkout-section mx-auto justify-content-center">
            <div className="col-12 col-sm-8 col-md-7 col-lg-7 payment-methods">
              <ContractCurrencyPayment onSelectCurrency={this.onSelectCurrency}/>
              <br/>
              <PaymentMethodsSection
                  ref={this.paymentMethodsSectionRef}
                  onTokenizeStripeCard={this.onTokenizeStripeCard}
                  onSelectPaymentType={this.onSelectPaymentType}
                  onSelectPaymentMethod={this.onSelectPaymentMethod}
              />
              {this.state.currency !== "USD" && (
                  <>
                    <br/>
                    <CheckoutBuyerData onBuyerDataChange={this.onBuyerDataChange}/>
                  </>
              )}
            </div>
            <div className="col-12 col-sm-8 col-md-7 col-lg-5 contract-summary  mt-3">
              <ContractCheckoutSummary
                  showError={!!this.state.error || this.props.createDlocalPaymentError || this.props.createStripePaymentError}
                  error={this.state.error || this.props.createDlocalPaymentError || this.props.createStripePaymentError}
                  transactionFee={this.state.paymentMethod.fee}
                  contractData={this.props.contractData}
                  buttonPayDisabled={false}
                  onPay={this.onPay}
              />
            </div>
          </div>
        </div>
    );
  }
}

// Set propTypes
CheckoutSectionForm.propTypes = {};
// Set defaultProps
CheckoutSectionForm.defaultProps = {
  contractData: {}
};
// mapStateToProps
const mapStateToProps = (state: any) => ({
  currencyExchangeData: state.payments.currencyExchangeReducer.data,
  isCreateDlocalPaymentLoading: state.payments.createDlocalPaymentReducer.loading,
  isCreateDlocalPaymentCompleted: state.payments.createDlocalPaymentReducer.completed,
  createDlocalPaymentData: state.payments.createDlocalPaymentReducer.data,
  createDlocalPaymentError: state.payments.createDlocalPaymentReducer.error_data.error,
  isCreateStripePaymentLoading: state.payments.createStripePaymentReducer.loading,
  isCreateStripePaymentCompleted: state.payments.createStripePaymentReducer.completed,
  createStripePaymentData: state.payments.createStripePaymentReducer.data,
  createStripePaymentError: state.payments.createStripePaymentReducer.error_data.error
});
// mapStateToProps
const mapDispatchToProps = {
  createDlocalPayment: paymentsOperations.createDlocalPayment,
  createStripePayment: paymentsOperations.createStripePayment
};
// Export Class
const _CheckoutSectionForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutSectionForm);
export {_CheckoutSectionForm as CheckoutSectionForm};
