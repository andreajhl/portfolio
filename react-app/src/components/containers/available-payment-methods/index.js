import React, {Component} from "react";
import "./styles.scss";
import {PayPalCardForm} from "../paypal-card-form";
import {Elements} from "react-stripe-elements";
import StripeCardForm from "../stripe-card-form";


class AvailablePaymentMethods extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedPaymentMethod: "",
        };
    }

    changeToStripe = (e) => {
        e.preventDefault();

        this.setState({
            ...this.state,
            selectedPaymentMethod: "STRIPE"
        })
    };

    changeToPaypal = (e) => {
        e.preventDefault();

        this.setState({
            ...this.state,
            selectedPaymentMethod: "PAYPAL"
        })
    };

    render() {
        return (
            <div className="AvailablePaymentMethods mx-auto">
                <div className={"payment-types f-rounded"}>
                    <div className="payment-type mb-3" onClick={this.changeToStripe}>
                        <div className="titles">
                            <div className="icon">
                                <i className="ml-2 fa fa-credit-card"/>
                            </div>
                            <div className="payment-type-title">
                                <h6 className={"font-weight-bold"}>
                                    <span>Pagar con Tarjeta de Crédito</span>
                                </h6>
                            </div>
                        </div>
                        <div className={"pl-3 pr-3 pt-4 pb-4 bg-light" + (this.state.selectedPaymentMethod==="STRIPE" ? "":" d-none ")}>
                            <Elements>
                                <StripeCardForm
                                    contractReference={this.props.contractReference}
                                    contractPrice={this.props.contractPrice}
                                />
                            </Elements>
                        </div>
                    </div>
                    <div className="payment-type mb-3" onClick={this.changeToPaypal}>
                        <div className="titles">
                            <div className="icon">
                                <i className="ml-2 fa fa-plus"/>
                            </div>
                            <div className="payment-type-title">
                                <h6 className={"font-weight-bold"}>
                                    <span>Pagar con PayPal</span>
                                </h6>
                            </div>
                        </div>
                        <div className={"pl-3 pr-3 pt-4 pb-4 bg-light" + (this.state.selectedPaymentMethod==="PAYPAL" ? "":" d-none ")}>
                            <PayPalCardForm
                                contractReference={this.props.contractReference}
                                contractPrice={this.props.contractPrice}
                            />
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

// Export Class
export {AvailablePaymentMethods};
