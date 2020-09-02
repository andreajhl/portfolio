import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

let PayPalButton = null;
const INTENT = "authorize";
const CLIENT_ID = process.env.REACT_APP_PAYPAL_KEY;
const CURRENCY = "USD";
const LOCALE = "es_CO";
const PAYPAL_URL = 'https://www.paypal.com/sdk/js';
const SDK_URL = `${PAYPAL_URL}?client-id=${CLIENT_ID}&intent=${INTENT}&currency=${CURRENCY}&locale=${LOCALE}`;

class PaypalReactButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showButtons: false,
            loading: true,
            paid: false
        };

        window.React = React;
        window.ReactDOM = ReactDOM;
    }

    componentDidMount() {
        const {isScriptLoaded, isScriptLoadSucceed} = this.props;
        if (isScriptLoaded && isScriptLoadSucceed) {
            PayPalButton = window.paypal.Buttons.driver("react", {React, ReactDOM});
            this.setState({loading: false, showButtons: true});
        }
    }

    componentWillReceiveProps(nextProps) {
        const {isScriptLoaded, isScriptLoadSucceed} = nextProps;
        const scriptJustLoaded = !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;
        if (scriptJustLoaded) {
            if (isScriptLoadSucceed) {
                PayPalButton = window.paypal.Buttons.driver("react", {
                    React,
                    ReactDOM
                });
                this.setState({loading: false, showButtons: true});
            }
        }
    }

    createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    reference_id: this.props.contractReference,
                    description: "Compra en Famosos.com. Ref: " + this.props.contractReference,
                    amount: {
                        currency_code: "USD",
                        value: this.props.contractPrice
                    }
                }
            ]
        });
    };

    onApprove = (data, actions) => {
        // Authorize the transaction
        let authorizationID = null;
        actions.order.authorize().then((authorization) => {
            // Get the authorization id
            authorizationID = authorization.purchase_units[0].payments.authorizations[0].id;
            this.setState({
                showButtons: false,
                paid: true
            }, () => {
                this.props.onPayPalButtonApprove(data["orderID"], authorizationID);
            })
        });
    };

    onCancel = (data) => {
        this.props.onPayPalButtonCancel(data["orderID"]);
    };

    onError = (error) => {
        this.props.onPayPalButtonError(error);
    };

    render() {
        const {showButtons, loading, paid} = this.state;
        const divStyles = {
            textAlign: "center",
            maxWidth: '100%',
            maxHeight: '50%',
        };
        const buttonStyles = {
            layout: 'horizontal',
            shape: 'rect',
            color: 'gold',
            size: 'small',
            label: 'paypal',
            tagline: 'false',
        };
        return (
            <div>
                {showButtons && (
                    <div style={divStyles}>
                        <PayPalButton
                            styles={buttonStyles}
                            createOrder={(data, actions) => this.createOrder(data, actions)}
                            onApprove={(data, actions) => this.onApprove(data, actions)}
                            onError={this.props.onError}
                            onCancel={this.props.onCancel}
                        />
                    </div>
                )}
                {paid && (
                    <h6 className={"text-center"}>Guardando...</h6>
                )}
            </div>
        );
    }
}

// DEFAULT PROPS
PaypalReactButton.defaultProps = {
    contractReference: null,
    contractPrice: null,
    onPayPalButtonApprove: () => {
    },
    onPayPalButtonCancel: () => {
    },
    onPayPalButtonError: () => {
    },
};

export default scriptLoader(SDK_URL)(PaypalReactButton);
