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
            showPayButton: true,
            error: "",
            currency: "USD",
            buyerData: {},
            paymentMethod: {},
            paymentType: {},
            stripeToken: "",
            paypalResponse: {}
        };
        this.buttonFinishLoading = false;
        this.buttonPayLoading = false;

        this.onSelectCurrency = this.onSelectCurrency.bind(this);
        this.onBuyerDataChange = this.onBuyerDataChange.bind(this);
        this.onSelectPaymentMethod = this.onSelectPaymentMethod.bind(this);
        this.onSelectPaymentType = this.onSelectPaymentType.bind(this);
        this.onPay = this.onPay.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onStripeResponse = this.onStripeResponse.bind(this);
        this.onPayPalResponse = this.onPayPalResponse.bind(this);
        this.createStripePayment = this.createStripePayment.bind(this);
        this.createPaypalPayment = this.createPaypalPayment.bind(this);

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

    onSelectPaymentType(paymentType) {
        console.log("onSelectPaymentType...", paymentType);
        this.setState({
            paymentType
        });
    }

    onSelectPaymentMethod(paymentMethod) {
        console.log("onSelectPaymentMethod...", paymentMethod);
        this.setState({
            paymentMethod
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
        this.buttonPayLoading = true;
        this.setState({
            error: null
        }, () => {
            try {
                switch (this.state.paymentType.gateway_name) {
                    case "STRIPE":
                        return this.paymentMethodsSectionRef.current.stripeCardForm.current.tokenizeCard();
                    case "DLOCAL":
                        return this.createDlocalPayment();
                    default:
                        this.setState({
                            error: "Debes seleccionar un método de pago."
                        });
                        break;
                }
            } catch (e) {
                this.setState({
                    error: "Debes seleccionar un método de pago."
                })
            }
        });
    }

    onFinish() {
        this.setState({
            error: null
        }, () => {
            try {
                if (this.state.paymentType.gateway_name === "PAYPAL") {
                    return this.createPaypalPayment(this.state.paypalResponse.status, this.state.paypalResponse);
                } else {
                    this.setState({error: "Debes seleccionar un método de pago."});
                }
            } catch (e) {
                this.setState({
                    error: "Debes seleccionar un método de pago."
                })
            }
        });
    }

    onStripeResponse(paymentMethod, status, token_id) {
        this.setState({
            paymentMethod: paymentMethod
        });
        if (status === "ERROR") {
            this.setState({error: "Error al validar la tarjeta de crédito"});
        } else {
            this.setState({
                stripeToken: token_id
            }, () => {
                this.createStripePayment()
            });
        }
    }

    onPayPalResponse(paymentMethod, details) {
        this.setState({
            paymentMethod: paymentMethod
        });
        if (details.status === "COMPLETED") {
            this.setState({
                showPayButton: false,
                paypalResponse: details
            });
        } else {
            this.setState({
                paypalResponse: details,
                error: "No se pudo hacer el cobro a tu cuenta de PayPal, intentalo nuevamente o " +
                    "utiliza otro método de pago."
            });
        }
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

    createPaypalPayment(status, response) {
        if (status === 'COMPLETED') {
            this.buttonFinishLoading = true;
            this.props.createPayPalPayment({
                contract_reference: this.props.contractData.reference,
                payment_method_id: this.state.paymentMethod.id,
                paypal_response: response
            })
        } else {
            this.setState({
                error: "No se pudo hacer el cobro a tu cuenta de PayPal, inténtalo nuevamente o " +
                    "utiliza otro método de pago."
            })
        }
    }

    render() {
        return (
            <div className="CheckoutSectionForm">
                <div className="row checkout-section mx-auto justify-content-center">
                    <div className="col-12 col-sm-8 col-md-7 col-lg-7 payment-methods">
                        {
                            this.state.showPayButton
                            &&
                            <>
                                <ContractCurrencyPayment onSelectCurrency={this.onSelectCurrency}/>
                                <br/>
                                <PaymentMethodsSection
                                    ref={this.paymentMethodsSectionRef}
                                    onStripeResponse={this.onStripeResponse}
                                    contractData={this.props.contractData}
                                    onSelectPaymentType={this.onSelectPaymentType}
                                    onSelectPaymentMethod={this.onSelectPaymentMethod}
                                    onPayPalResponse={this.onPayPalResponse}
                                />
                            </>
                        }
                        {this.state.currency !== "USD" && (
                            <>
                                <br/>
                                <CheckoutBuyerData onBuyerDataChange={this.onBuyerDataChange}/>
                            </>
                        )}
                    </div>
                    <div className="col-12 col-sm-8 col-md-7 col-lg-5 contract-summary  mt-3">
                        <ContractCheckoutSummary
                            showError={!!this.state.error || this.props.createDlocalPaymentError || this.props.createStripePaymentError || this.props.isCreatePayPalPaymentLoading}
                            error={this.state.error || this.props.createDlocalPaymentError || this.props.createStripePaymentError || this.props.createPayPalPaymentError}
                            transactionFee={this.state.paymentMethod.fee}
                            contractData={this.props.contractData}
                            buttonPayDisabled={false}
                            onPay={this.onPay}
                            onFinish={this.onFinish}
                            showPayButton={this.state.showPayButton}
                            buttonPayLoading={this.buttonPayLoading}
                            buttonFinishLoading={this.buttonFinishLoading}
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
    createStripePaymentError: state.payments.createStripePaymentReducer.error_data.error,
    isCreatePayPalPaymentLoading: state.payments.createPayPalPaymentReducer.loading,
    isCreatePayPalPaymentCompleted: state.payments.createPayPalPaymentReducer.completed,
    createPayPalPaymentData: state.payments.createPayPalPaymentReducer.data,
    createPayPalPaymentError: state.payments.createPayPalPaymentReducer.error_data.error
});

// mapStateToProps
const mapDispatchToProps = {
    createDlocalPayment: paymentsOperations.createDlocalPayment,
    createStripePayment: paymentsOperations.createStripePayment,
    createPayPalPayment: paymentsOperations.createPayPalPayment
};

// Export Class
const _CheckoutSectionForm = connect(mapStateToProps, mapDispatchToProps)(CheckoutSectionForm);
export {_CheckoutSectionForm as CheckoutSectionForm};
