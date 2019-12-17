import React, {Component} from 'react';
import {OnCaptureData, PayPalButton} from "react-paypal-button";


class PayPalCardForm extends Component {

    orderIdPayPal = 0;

    constructor(props) {
        super(props);
    }

    render() {
        const paypalOptions = {
            clientId: 'Af-NXGQtVWkKrQRBI95nXcwtmzE-PnC7lLEpGytJ5qHdELsMDbRScE-7I-21ehhZMUIIy5jAk0q7RNrA',
            intent: 'capture',
            currency: 'USD',

        };

        const buttonStyles = {
            layout: 'horizontal',
            shape: 'pill',
            color: 'white',
            size: 'small',
            label: 'pay',
            tagline: 'false',
        };
        const divStyles = {
            textAlign: "center",
            maxWidth: '10%',
            maxHeight: '50%',
        };

        return (
            <div style={divStyles}>
                <PayPalButton
                    paypalOptions={paypalOptions}
                    buttonStyles={buttonStyles}
                    amount={this.props.contractPrice}
                    onPaymentSuccess={(details: OnCaptureData) => {
                        this.props.onPayPalCheckoutPay(true);
                        this.orderIdPayPal = details.id;
                        console.log('ORDER ID: ' + this.orderIdPayPal);
                        console.log(details);
                    }}
                    onPaymentError={(details: OnCaptureData) => {
                        alert("Transaction error: " + details.payer.name.given_name + details.player.name.surname);
                        this.orderIdPayPal = details.id;
                        console.log(details);
                        console.log('ORDER ID: ' + this.orderIdPayPal);
                    }}
                    onPaymentCancel={(details: OnCaptureData) => {
                        this.orderIdPayPal = details.orderID;
                        console.log('ORDER ID: ' + this.orderIdPayPal);
                    }}
                />
            </div>
        )
            ;
    }
}

// defaultProps
PayPalCardForm.defaultProps = {
    onPayPalCheckoutPay: () => {
    }
};

export {PayPalCardForm};
