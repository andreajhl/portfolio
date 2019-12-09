import React, {Component} from 'react';
import "./styles.scss";
import {paymentsOperations} from "../../../state/ducks/payments";
import {connect} from "react-redux";


class PaymentMethodsSectionLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currency: null,
            paymentType: null,
            paymentMethod: {},
        };

        this.handleCurrency = this.handleCurrency.bind(this);
        this.handlePaymentMethod = this.handlePaymentMethod.bind(this);
        this.handlePaymentType = this.handlePaymentType.bind(this);

    }

    handleCurrency(event) {
        this.setState({
            currency: event.target.value,
            paymentType: null,
            paymentMethod: {},
        }, () => {
            this.props.listPaymentGateways(this.state.currency);
            this.props.onSelectPaymentMethod({})
        })
    }

    handlePaymentType(method) {
        if(method.name !== this.state.paymentType){
            this.setState({
                paymentType: method.name
            }, () => {
                this.props.onSelectPaymentType(method);
                this.props.onSelectPaymentMethod({})
            })
        }
    }

    handlePaymentMethod(identifier) {
        this.setState({
            paymentMethod: identifier
        }, () => {
            this.props.onSelectPaymentMethod(identifier)
        })
    }

    loopPaymentGateways() {
        if (this.props.paymentGateways) {
            return (
                <>
                    {
                        this.props.paymentGateways.map((pg: [], index) => {
                            return (
                                <div key={"paymentGateway_" + index}>
                                    {this.loopMethods(pg["payment-methods"])}
                                </div>
                            )
                        })
                    }
                </>
            )
        }
    }

    loopMethods(paymentMethods) {
        if (paymentMethods) {
            return (
                <>
                    {
                        paymentMethods.map((method, index) => {
                            return (
                                <div className="payment-type"
                                     key={"method_" + index}
                                     onClick={this.handlePaymentType.bind(this, method)}
                                >
                                    <div className="titles">
                                        <div className="icon">
                                            {
                                                method.name === "CARD"
                                                &&
                                                <i className="fa fa-credit-card"/>
                                            }
                                            {
                                                method.name === "BANK_TRANSFER"
                                                &&
                                                <i className="fa fa-dollar-sign"/>
                                            }
                                            {
                                                method.name === "TICKET"
                                                &&
                                                <i className="fa fa-money-bill-alt"/>
                                            }
                                        </div>
                                        <div className="payment-type-title">
                                            <h6>
                                                {
                                                    method.name === "CARD"
                                                    &&
                                                    <span>Tarjeta de crédito</span>
                                                }
                                                {
                                                    method.name === "BANK_TRANSFER"
                                                    &&
                                                    <span>Tarjeta de débito</span>
                                                }
                                                {
                                                    method.name === "TICKET"
                                                    &&
                                                    <span>Efectivo</span>
                                                }
                                            </h6>
                                        </div>
                                    </div>
                                    {
                                        this.state.paymentType === method.name
                                        &&
                                        <>
                                            {this.renderPaymentTypeOptions(method["available-methods"])}
                                        </>
                                    }
                                </div>
                            )
                        })
                    }
                </>
            )
        }
    }

    renderPaymentTypeOptions(methods) {
        return (
            <div className="available-options">
                {
                    methods.map((method, index) => {
                        return (
                            <div className="available-option" key={"method_" + method.identifier + index} onClick={this.handlePaymentMethod.bind(this, method)}>
                                <div className="available-option-circle">
                                    <div
                                        className={"available-option-circle-button " + (this.state.paymentMethod.identifier === method.identifier && " active ")}/>
                                </div>
                                <div className="available-option-logo">
                                    <img src={method.logo} alt="logo" width="30px"/>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }

    renderPaymentTypes() {
        if (this.state.currency && this.state.currency !== "USD") {
            return (
                <>
                    <h5 className="title font-weight-bold">2. Elige un método de pago.</h5>
                    <div className={"payment-types f-shadow f-rounded"}>
                        {this.loopPaymentGateways()}
                    </div>
                </>
            )
        } else if (this.state.currency && this.state.currency === "USD") {
            return (
                <>

                </>
            )
        }
    }

    render() {
        return (
            <div className="PaymentMethodsSectionLayout">
                <h5 className="title font-weight-bold">1. ¿En qué moneda quieres pagar?</h5>
                <select className="form-control" value={this.state.currency} onChange={this.handleCurrency}>
                    <option value="">Seleccionar</option>
                    <option value="USD">USD - Dólares</option>
                    <option value="COP">COP - Pesos Colombianos</option>
                    <option value="BRL">BRL - Real Brasileño</option>
                </select>
                <hr/>
                {this.renderPaymentTypes()}
            </div>
        );
    };

}

// Set propTypes
PaymentMethodsSectionLayout.propTypes = {};

// Set defaultProps
PaymentMethodsSectionLayout.defaultProps = {
    onSelectPaymentMethod: () => {

    },
    onSelectPaymentType: () => {

    }
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    isLoading: state.payments.fetchPaymentGatewaysReducer.loading,
    paymentGateways: state.payments.fetchPaymentGatewaysReducer.data.gateways,
});

// mapStateToProps
const mapDispatchToProps = {
    listPaymentGateways: paymentsOperations.listPaymentGateways,
};

// Export Class
const _PaymentMethodsSectionLayout = connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsSectionLayout);
export {_PaymentMethodsSectionLayout as PaymentMethodsSectionLayout};

