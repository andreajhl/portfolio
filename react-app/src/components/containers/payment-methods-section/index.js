import React, {Component} from "react";
import "./styles.scss";
import {ContractCheckoutSummary} from "../../containers/contract-checkout-summary";
import {AvailablePaymentMethods} from "../../containers/available-payment-methods";
import * as ROUTING_PATHS from "../../../routing/Paths";

class PaymentMethodsSection extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    // onPay() {
    //     this.setState({
    //         ...this.state,
    //         error: "",
    //         buttonPayLoading: true
    //     });
    //     switch (this.state.paymentType.gatewayName) {
    //         case "STRIPE":
    //             console.log(this.paymentMethodsSectionRef.current.stripeCardFormRef.current);
    //             break;
    //         case "DLOCAL":
    //             this.createDLocalPayment();
    //             break;
    //         default:
    //             this.setState({
    //                 error: "Debes seleccionar un método de pago.",
    //                 buttonFinishLoading: false,
    //                 buttonPayLoading: false,
    //             });
    //             break;
    //     }
    // }
    //
    // onFinish() {
    //     switch (this.state.paymentType.gatewayName) {
    //         case "PAYPAL":
    //             this.createPayPalPayment(this.state.payPalResponse.status, this.state.payPalResponse);
    //             break;
    //         case "GOOGLE_PAY":
    //         case "APPLE_PAY":
    //             break;
    //         default:
    //             this.setState({
    //                 error: "Debes seleccionar un método de pago.",
    //                 buttonFinishLoading: false,
    //                 buttonPayLoading: false,
    //             });
    //             break;
    //     }
    // }
    //
    // onPayPalResponse(paymentMethod, details) {
    //     this.setState({
    //         9: !!details.status === "COMPLETED",
    //         payPalResponse: details,
    //         paymentMethod: paymentMethod,
    //     }, () => {
    //         this.createPayPalPayment(this.state.payPalResponse.status, this.state.payPalResponse);
    //     });
    // }
    //
    // createStripePayment() {
    //     const FINAL_PATH = "custom-endpoints/user-payments/process-stripe-payment";
    //     const data = {
    //         contractReference: this.props.contractData.reference,
    //         paymentMethodId: this.state.paymentMethod.id,
    //         stripeCardToken: this.state.stripeToken
    //     };
    //     apiService({
    //         method: "POST",
    //         action: null,
    //         path: FINAL_PATH,
    //         async: true,
    //         params: null,
    //         body: data,
    //         custom_endpoint: false
    //     })
    //         .then(res => {
    //             if (res.data.status === "ERROR") {
    //                 this.setState({
    //                     ...this.state,
    //                     error: res.data.error,
    //                     buttonPayLoading: false
    //                 })
    //             } else {
    //                 GTM.tagManagerDataLayer(
    //                     "CONTRACT_PAYED",
    //                     res.data
    //                 );
    //                 history._pushRoute(
    //                     ROUTING_PATHS.CONTRACT_CREATED.replace(
    //                         ":contract_reference",
    //                         res.data.data.reference
    //                     )
    //                 );
    //             }
    //         })
    //         .catch(error => {
    //             if (error.response) {
    //                 if (error.response.data) {
    //                     this.setState({
    //                         ...this.state,
    //                         error: error.response.data.error,
    //                         buttonPayLoading: false
    //                     });
    //                 }
    //             } else {
    //                 this.setState({
    //                     ...this.state,
    //                     error: "Ocurrió un error procesando tu pago,",
    //                     buttonPayLoading: false
    //                 })
    //             }
    //         });
    // };
    //
    // createPayPalPayment(status, payPalResponse) {
    //     const FINAL_PATH = "custom-endpoints/user-payments/process-paypal-payment";
    //     let isPending = false;
    //     try {
    //         payPalResponse["purchase_units"].map(purchase_unit => {
    //             purchase_unit["payments"]["captures"].map(payment_capture => {
    //                 if (payment_capture["status"] === "PENDING") {
    //                     isPending = true;
    //                     alert("Tu pago está pendiente por ser validado por PayPal")
    //                 }
    //             })
    //         })
    //     } catch (e) {
    //
    //     }
    //     const data = {
    //         contractReference: this.props.contractData.reference,
    //         paymentMethodId: this.state.paymentMethod.id,
    //         payPalResponse: payPalResponse,
    //         isPending: isPending
    //     };
    //     apiService({
    //         method: "POST",
    //         action: null,
    //         path: FINAL_PATH,
    //         async: true,
    //         params: null,
    //         body: data,
    //         custom_endpoint: false
    //     })
    //         .then(res => {
    //             if (res.data.status === "ERROR") {
    //                 this.setState({
    //                     ...this.state,
    //                     error: res.data.error,
    //                     buttonPayLoading: false
    //                 })
    //             } else {
    //                 GTM.tagManagerDataLayer(
    //                     "CONTRACT_PAYED",
    //                     res.data
    //                 );
    //                 history._pushRoute(
    //                     ROUTING_PATHS.CONTRACT_CREATED.replace(
    //                         ":contract_reference",
    //                         res.data.data.reference
    //                     )
    //                 );
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             this.setState({
    //                 ...this.state,
    //                 error: "Ocurrió un error procesando tu pago,",
    //                 buttonPayLoading: false
    //             })
    //         });
    //
    // }
    //
    // isLoading = () => {
    //     return this.state.buttonPayLoading || this.state.buttonFinishLoading
    // };

    render() {
        return (
            <div className="PaymentMethodsSection">
                <div className={"row justify-content-center payment-methods-section-row"}>
                    <div className="col-12 col-md-6 p-0 m-0 f-rounded f-shadow">

                        {/* CONTRACT SUMMARY */}
                        <ContractCheckoutSummary
                            celebrityAvatar={this.props.contractData.celebrity_avatar}
                            celebrityFullName={this.props.contractData.celebrity_full_name}
                            deliveryFrom={this.props.contractData.delivery_from}
                            deliveryTo={this.props.contractData.delivery_to}
                            instructions={this.props.contractData.instructions}
                            price={this.props.contractData.price}
                        />

                        {/* PAYMENT METHODS */}
                        <AvailablePaymentMethods
                            contractReference={this.props.contractData.reference}
                            contractPrice={this.props.contractData.price}
                        />

                        {/* TERMS */}
                        <div className={"p-4 text-center"}>
                            <small className={"text-muted text-center"}>
                                Al continuar estás aceptando nuestros&nbsp;
                                <a href={ROUTING_PATHS.TERMS_PATH} target={"_blank"}>Términos y Condiciones</a>&nbsp;
                                y nuestra&nbsp;
                                <a href={ROUTING_PATHS.POLICIES_PATH} target={"_blank"}>Política de Privacidad</a>&nbsp;
                            </small>
                            <div className="mt-4 mx-auto text-center">
                                <img width="230px" src={"/assets/img/pago-seguro.png"} alt={"pago-seguro"}/>
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Set propTypes
PaymentMethodsSection.propTypes = {};

// Set defaultProps
PaymentMethodsSection.defaultProps = {
    contractData: {}
};

// Export Class
export {PaymentMethodsSection};
