import React, {Component} from 'react';
import {OnCaptureData, PayPalButton} from "react-paypal-button";


class PayPalCardForm extends Component {

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
                        this.props.onPayPalResponse(details);
                    }}
                    onPaymentError={(details: OnCaptureData) => {
                        this.props.onPayPalResponse(details);
                    }}
                    onPaymentCancel={(details: OnCaptureData) => {
                        this.props.onPayPalResponse(details);
                    }}
                />
            </div>
        )
            ;
    }
}

// defaultProps
PayPalCardForm.defaultProps = {
    onPayPalResponse: () => {
    }
};

export {PayPalCardForm};
