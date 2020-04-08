import React, {Component} from 'react';
import {OnApproveData, OnCancelData, OnCaptureData, PayPalButton} from "react-paypal-button";


class PayPalCardForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const paypalOptions = {
            clientId: process.env.REACT_APP_PAYPAL_KEY,
            intent: 'authorize', // capture
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
                    onApprove={(data: OnApproveData, authId: string) => {
                        this.props.onPayPalResponse(this.props.paymentMethod, {
                            create_time: this.getDate(),
                            update_time: this.getDate(),
                            id: data.orderID,
                            intent: '',
                            status: 'APPROVED',
                            orderID: data.orderID,
                            payerID: data.payerID,
                            facilitatorAccessID: data.facilitatorAccessID,
                            authId: authId
                        });
                    }}
                    onPaymentSuccess={(details: OnCaptureData) => {
                        this.props.onPayPalResponse(this.props.paymentMethod, details);
                    }}
                    onPaymentError={(details: string) => {
                        const data = {
                            create_time: this.getDate(),
                            update_time: this.getDate(),
                            id: details.orderID,
                            intent: '',
                            status: 'ERROR'
                        };
                        this.props.onPayPalResponse(this.props.paymentMethod, data);
                    }}
                    onPaymentCancel={(details: OnCancelData) => {
                        const data = {
                            create_time: this.getDate(),
                            update_time: this.getDate(),
                            id: details.orderID,
                            intent: '',
                            status: 'CANCEL'
                        };
                        this.props.onPayPalResponse(this.props.paymentMethod, data);
                    }}
                />
            </div>
        )
            ;
    }

    getDate() {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return year + '-' + month + '-' + date + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    }
}

// defaultProps
PayPalCardForm.defaultProps = {
    onPayPalResponse: () => {
    },
    paymentMethod: {}
};

export {PayPalCardForm};
