import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

let PayPalButton = null;
const INTENT = "authorize";
const CLIENT_ID = process.env.REACT_APP_PAYPAL_KEY;
const CURRENCY = "USD";
const LOCALE = "es_CO";
const PAYPAL_URL = 'https://www.paypal.com/sdk/js?disable-funding=credit,card';
const VAULT = 'true';
const SDK_URL = `${PAYPAL_URL}&client-id=${CLIENT_ID}&vault=true`;

class SubscriptionPaypalReactButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showButtons: false,
            loading: true,
            approved: false
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

   
    createSubscription= (data,actions)=>{
        return actions.subscription.create({
            'plan_id': 'P-2UF78835G6983425GLSM44MA'
        });
    }

    onApprove = (data, actions) => {
        this.setState({
            ...this.state,
            approved: true,
        });
        console.log(data.subscription, 'subscripcion data')
        // // Authorize the transaction
        // let authorizationID = null;
        // actions.order.authorize().then((authorization) => {
        //     // Get the authorization id
        //     authorizationID = authorization.purchase_units[0].payments.authorizations[0].id;
        //     this.setState({
        //         ...this.state,
        //         showButtons: false,
        //     }, () => {
        //         this.props.onPayPalButtonApprove(data["orderID"], authorizationID);
        //     })
        // });
    };

    onCancel = (data) => {
        this.props.onPayPalButtonCancel(data["orderID"]);
    };

    onError = (error) => {
        this.props.onPayPalButtonError(error);
    };

    render() {
        const {showButtons, loading, approved} = this.state;
        const divStyles = {
            textAlign: "center",
            maxWidth: '100%',
            maxHeight: '50%',
            display: !approved ? "block" : "none"
        };
        const buttonStyles = {
            layout: 'vertical',
            shape: 'rect',
            color: 'gold',
            size: 'small',
            label: 'pay',
            tagline: 'false',
            fundingicons: 'false',
        };
        return (
            <div>
                {showButtons && (
                    <div style={divStyles}>
                        <PayPalButton
                            styles={buttonStyles}
                            createSubscription={(data, actions) => this.createSubscription(data, actions)}
                            onApprove={(data, actions) => this.onApprove(data, actions)}
                            onError={this.onError}
                            onCancel={this.props.onCancel}
                        />
                    </div>
                )}
                {approved && (
                    <h6 className={"text-center"}>Guardando...</h6>
                )}
            </div>
        );
    }
}

// DEFAULT PROPS
SubscriptionPaypalReactButton.defaultProps = {
    planId: null,
    contractPrice: null,
    onPayPalButtonApprove: () => {
    },
    onPayPalButtonCancel: () => {
    },
    onPayPalButtonError: () => {
    },
};

export default scriptLoader(SDK_URL)(SubscriptionPaypalReactButton);
