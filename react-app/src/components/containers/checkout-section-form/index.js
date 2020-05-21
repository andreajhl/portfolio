import React, {Component} from "react";
import "./styles.scss";
import {PaymentMethodsSection} from "../../containers/payment-methods-section";
import {ContractCheckoutSummary} from "../../containers/contract-checkout-summary";
import {connect} from "react-redux";
import {CheckoutBuyerData} from "../checkout-buyer-data";
import {ContractCurrencyPayment} from "../contract-currency-payment";
import apiService from "../../../state/utils/apiService";
import {history} from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";


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
            payPalResponse: {},
            buttonFinishLoading: false,
            buttonPayLoading: false
        };

        this.onSelectCurrency = this.onSelectCurrency.bind(this);
        this.onBuyerDataChange = this.onBuyerDataChange.bind(this);
        this.onSelectPaymentMethod = this.onSelectPaymentMethod.bind(this);
        this.onSelectPaymentType = this.onSelectPaymentType.bind(this);
        this.onPay = this.onPay.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onStripeResponse = this.onStripeResponse.bind(this);
        this.onPayPalResponse = this.onPayPalResponse.bind(this);
        this.createStripePayment = this.createStripePayment.bind(this);
        this.createPayPalPayment = this.createPayPalPayment.bind(this);

        this.paymentMethodsSectionRef = React.createRef();
    }

    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
        if (nextProps.currencyExchangeData.to && nextProps.currencyExchangeData.to !== this.props.currencyExchangeData.to) {
            this.setState({
                currency: nextProps.currencyExchangeData.to
            })
        }
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
        this.setState({
            paymentType
        });
    }

    onSelectPaymentMethod(paymentMethod) {
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
        this.setState({
            ...this.state,
            error: "",
            buttonPayLoading: true
        });
        switch (this.state.paymentType.gatewayName) {
            case "STRIPE":
                this.paymentMethodsSectionRef.current.stripeCardForm.current.tokenizeCard();
                break;
            case "DLOCAL":
                this.createDLocalPayment();
                break;
            default:
                this.setState({
                    error: "Debes seleccionar un método de pago.",
                    buttonFinishLoading: false,
                    buttonPayLoading: false,
                });
                break;
        }
    }

    onFinish() {
        switch (this.state.paymentType.gatewayName) {
            case "PAYPAL":
                this.createPayPalPayment(this.state.payPalResponse.status, this.state.payPalResponse);
                break;
            case "GOOGLE_PAY":
            case "APPLE_PAY":
                break;
            default:
                this.setState({
                    error: "Debes seleccionar un método de pago.",
                    buttonFinishLoading: false,
                    buttonPayLoading: false,
                });
                break;
        }
    }

    onStripeResponse(paymentMethod, status, token_id) {
        this.setState({
            paymentMethod: paymentMethod
        });
        if (status === "ERROR") {
            this.setState({
                error: "Error al validar la tarjeta de crédito",
                buttonFinishLoading: false,
                buttonPayLoading: false,
            });
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
            9: !!details.status === "COMPLETED",
            payPalResponse: details,
            paymentMethod: paymentMethod,
        }, () => {
            this.createPayPalPayment(this.state.payPalResponse.status, this.state.payPalResponse);
        });
    }

    createDLocalPayment() {
        const FINAL_PATH = "custom-endpoints/user-payments/process-dlocal-payment";
        const data = {
            buyerFullName: this.state.buyerData.full_name,
            buyerEmail: this.state.buyerData.email,
            buyerDocument: this.state.buyerData.document,
            contractReference: this.props.contractData.reference,
            paymentMethodId: this.state.paymentMethod.id,
            country: this.returnCountry(),
        };
        apiService({
            method: "POST",
            action: null,
            path: FINAL_PATH,
            async: true,
            params: null,
            body: data,
            custom_endpoint: false
        })
            .then(res => {
                if (res.data.status === "ERROR") {
                    this.setState({
                        ...this.state,
                        error: res.data.error,
                        buttonPayLoading: false
                    })
                } else {
                    // Validate if it is necessary a redirect
                    if (res.data.data.requiredRedirect === true) {
                        window.location.href = res.data.data.redirectUri;
                    } else {
                        history._pushRoute(
                            ROUTING_PATHS.CONTRACT_CREATED.replace(
                                ":contract_reference",
                                res.data.data.reference
                            )
                        );
                    }
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    error: "No se pudo procesar tu pago, contáctanos a experiencias@famosos.com.",
                    buttonPayLoading: false
                })
            });
    }

    createStripePayment() {
        const FINAL_PATH = "custom-endpoints/user-payments/process-stripe-payment";
        const data = {
            contractReference: this.props.contractData.reference,
            paymentMethodId: this.state.paymentMethod.id,
            stripeCardToken: this.state.stripeToken
        };
        apiService({
            method: "POST",
            action: null,
            path: FINAL_PATH,
            async: true,
            params: null,
            body: data,
            custom_endpoint: false
        })
            .then(res => {
                if (res.data.status === "ERROR") {
                    this.setState({
                        ...this.state,
                        error: res.data.error,
                        buttonPayLoading: false
                    })
                } else {
                    history._pushRoute(
                        ROUTING_PATHS.CONTRACT_CREATED.replace(
                            ":contract_reference",
                            res.data.data.reference
                        )
                    );
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    error: "No se pudo procesar tu pago, contáctanos a experiencias@famosos.com.",
                    buttonPayLoading: false
                })
            });
    };

    createPayPalPayment(status, payPalResponse) {
        const FINAL_PATH = "custom-endpoints/user-payments/process-paypal-payment";
        let isPending = false;
        try {
            payPalResponse["purchase_units"].map(purchase_unit => {
                purchase_unit["payments"]["captures"].map(payment_capture => {
                    if (payment_capture["status"] === "PENDING") {
                        isPending = true;
                        alert("Tu pago está pendiente por ser validado por PayPal")
                    }
                })
            })
        } catch (e) {

        }
        const data = {
            contractReference: this.props.contractData.reference,
            paymentMethodId: this.state.paymentMethod.id,
            payPalResponse: payPalResponse,
            isPending: isPending
        };
        apiService({
            method: "POST",
            action: null,
            path: FINAL_PATH,
            async: true,
            params: null,
            body: data,
            custom_endpoint: false
        })
            .then(res => {
                if (res.data.status === "ERROR") {
                    this.setState({
                        ...this.state,
                        error: res.data.error,
                        buttonPayLoading: false
                    })
                } else {
                    history._pushRoute(
                        ROUTING_PATHS.CONTRACT_CREATED.replace(
                            ":contract_reference",
                            res.data.data.reference
                        )
                    );
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    error: "No se pudo procesar tu pago, contáctanos a experiencias@famosos.com.",
                    buttonPayLoading: false
                })
            });

    }

    isLoading = () => {
        return this.state.buttonPayLoading || this.state.buttonFinishLoading
    };

    render() {
        return (
            <div className="CheckoutSectionForm"
                 style={this.isLoading() ? {opacity: "0.2",} : {}}>
                <div className="row checkout-section mx-auto justify-content-center">
                    <div className={"col-12 col-sm-8 col-md-7 col-lg-7 payment-methods"}>
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
                        {/*{this.state.currency !== "USD" && (*/}
                        {/*    <>*/}
                        {/*        <br/>*/}
                        {/*        <CheckoutBuyerData onBuyerDataChange={this.onBuyerDataChange}/>*/}
                        {/*    </>*/}
                        {/*)}*/}
                    </div>
                    <div
                        className={"contract-summary  mt-3" + (!this.props.isCreatePayPalPaymentCompleted
                            ? " col-12  col-sm-8 col-md-7 col-lg-5 " : " col-sm-12 col-lg-8")}>
                        <ContractCheckoutSummary
                            showError={this.state.error}
                            error={this.state.error}
                            transactionFee={this.state.paymentMethod["fee"]}
                            contractData={this.props.contractData}
                            buttonPayDisabled={false}
                            onPay={this.onPay}
                            onFinish={this.onFinish}
                            showPayButton={this.state.showPayButton}
                            buttonPayLoading={this.state.buttonPayLoading}
                            buttonFinishLoading={this.state.buttonFinishLoading}
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
    // currencyExchangeData
    currencyExchangeData: state.payments.currencyExchangeReducer.data
});

// mapStateToProps
const mapDispatchToProps = {};

// Export Class
const _CheckoutSectionForm = connect(mapStateToProps, mapDispatchToProps)(CheckoutSectionForm);
export {_CheckoutSectionForm as CheckoutSectionForm};
