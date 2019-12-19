import React, {Component} from "react";
import "./styles.scss";
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";
import {StripeCardForm} from "../stripe-card-form";
import {PayPalCardForm} from "../pay-pal-card-form";


class PaymentMethodsSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currency: this.props.currencyExchangeData.to,
            gatewayName: "",
            paymentType: "",
            paymentMethod: {}
        };

        this.handlePaymentMethod = this.handlePaymentMethod.bind(this);
        this.handlePaymentType = this.handlePaymentType.bind(this);

        this.stripeCardForm = React.createRef();
    }

    componentWillUpdate(
        nextProps: Readonly<P>,
        nextState: Readonly<S>,
        nextContext: any
    ): void {
        if (nextProps.isLoading && !this.props.isLoading) {
            this.setState({
                currency: this.props.currencyExchangeData.to,
                gatewayName: "",
                paymentType: "",
                paymentMethod: {}
            });
        }
        if (nextProps.paymentGateways.length && nextProps.isCompleted) {
            this.preselectMethod(nextProps.paymentGateways)
        }
    }

    preselectMethod(paymentGateways) {
        if (paymentGateways.length) {
            try {
                paymentGateways.forEach(paymentGateway => {
                    if (paymentGateway["payment-methods"].length) {
                        const pm_card = paymentGateway["payment-methods"].find(item => item.name === "CARD");
                        this.handlePaymentType(pm_card)
                    }
                })
            } catch (e) {

            }
        }
    }

    handlePaymentMethod(paymentMethod) {
        this.setState({paymentMethod});
        console.log("paymentMethod:", paymentMethod)
        // if (paymentMethod.length) {
        //     try {
        //         paymentMethod.forEach(paymentGateway => {
        //             if (paymentGateway["payment-methods"].length) {
        //                 const pm_card = paymentGateway["payment-methods"].find(item => item.name === "CARD");
        //                 this.handlePaymentType(pm_card)
        //             }
        //         })
        //     } catch (e) {
        //
        //     }
        // }
    }

    handlePaymentType(method) {
        if (method.name !== this.state.paymentType) {
            this.setState(
                {
                    paymentType: method.name,
                    gatewayName: method.gateway_name,
                    paymentMethod: {}
                },
                () => {
                    this.props.onSelectPaymentType(method);
                }
            );
        }
    }

    loopPaymentGateways() {
        if (this.props.paymentGateways) {
            return (
                <>
                    {this.props.paymentGateways.map((pg: [], index) => {
                        return (
                            <div key={"paymentGateway_" + index}>
                                {this.loopMethods(pg["payment-methods"])}
                            </div>
                        );
                    })}
                </>
            );
        }
    }

    loopMethods(paymentMethods) {
        if (paymentMethods) {
            return (
                <>
                    {paymentMethods.map((method, index) => {
                        return (
                            <div
                                className="payment-type mb-3"
                                key={"method_" + index}
                                onClick={this.handlePaymentType.bind(this, method)}
                            >
                                <div className="titles">
                                    <div className="icon">
                                        {method.name === "CARD" && (
                                            <i className="fa fa-credit-card"/>
                                        )}
                                        {method.name === "BANK_TRANSFER" && (
                                            <i className="fa fa-dollar-sign"/>
                                        )}
                                        {method.name === "TICKET" && (
                                            <i className="fa fa-money-bill-alt"/>
                                        )}
                                        {method.name === "OTHER" && <i className="fa fa-plus"/>}
                                    </div>
                                    <div className="payment-type-title">
                                        <h6>
                                            {method.name === "CARD" && (
                                                <span>Tarjeta de crédito</span>
                                            )}
                                            {method.name === "BANK_TRANSFER" && (
                                                <span>Tarjeta de débito</span>
                                            )}
                                            {method.name === "TICKET" && <span>Efectivo</span>}
                                            {method.name === "OTHER" && <span>Otros</span>}
                                        </h6>
                                    </div>
                                </div>
                                {this.state.paymentType === method.name ? (
                                    <>
                                        {this.renderPaymentTypeOptions(method["available-methods"])}
                                    </>
                                ) : null}
                            </div>
                        );
                    })}
                </>
            );
        }
    }

    renderPaymentTypeOptions(methods) {
        switch (this.state.gatewayName) {
            case "PAYPAL":
                return (
                    <div className="pl-3 pr-3 pt-4 bg-light">
                        <PayPalCardForm
                            onPayPalResponse={this.props.onPayPalResponse}
                            contractPrice={this.props.contractData.price}
                        />
                    </div>
                );
            case "STRIPE":
                return (
                    <div className="pl-3 pr-3 pt-4 bg-light">
                        <StripeCardForm
                            ref={this.stripeCardForm}
                            onStripeResponse={this.props.onStripeResponse}
                            onTokenizeCard={this.props.onTokenizeStripeCard}
                        />
                    </div>
                );
            default:
                return (
                    <div className="available-options bg-light">
                        {methods.map((method, index) => {
                            return (
                                <div
                                    className="available-option"
                                    key={"method_" + method.identifier + index}
                                    onClick={this.handlePaymentMethod.bind(this, method)}
                                >
                                    <div className="available-option-circle">
                                        <div
                                            className={
                                                "available-option-circle-button " +
                                                (this.state.paymentMethod.identifier ===
                                                    method.identifier &&
                                                    this.state.paymentMethod.brand === method.brand &&
                                                    " active ")
                                            }
                                        />
                                    </div>
                                    <div className="available-option-logo">
                                        <img src={method.logo} alt="logo" width="30px"/>
                                        <small className="text-title">{method.name}</small>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
        }
    }

    render() {
        return (
            <div className="PaymentMethodsSection">
                <h6 className="title font-weight-bold">
                    2. Elige un método de pago.
                    <small className="ml-1 text-danger">*</small>
                </h6>
                <div className={"payment-types f-rounded"}>
                    {this.loopPaymentGateways()}
                </div>
            </div>
        );
    }
}

// Set defaultProps
PaymentMethodsSection.defaultProps = {
    onStripeResponse: () => {
    },
    onPayPalResponse: () => {
    },
    onSelectPaymentMethod: () => {
    },
    onSelectPaymentType: () => {
    },
    contractData: {},
};


// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.payments.fetchPaymentGatewaysReducer.loading,
    isCompleted: state.payments.fetchPaymentGatewaysReducer.completed,
    paymentGateways: state.payments.fetchPaymentGatewaysReducer.data.gateways,
    currencyExchangeData: state.payments.currencyExchangeReducer.data,
});

// mapStateToProps
const mapDispatchToProps = {
    listPaymentGateways: paymentsOperations.listPaymentGateways
};

// Export Class
const _PaymentMethodsSection = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
        forwardRef: true
    }
)(PaymentMethodsSection);
export {_PaymentMethodsSection as PaymentMethodsSection};
