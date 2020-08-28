import React, {Component} from 'react';
import {OnApproveData, OnCaptureData, PayPalButton} from "react-paypal-button";


class PayPalCardForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: null,
        }
    }

    createPayPalPayment = (payPalResponse) => {
        this.processPayPalPayment(
            this.props.contractReference,
            payPalResponse,
            null
        )
            .then(r => {

            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    errorMessage: error
                })
            })

    };

    getDate = () => {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return year + '-' + month + '-' + date + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    };

    retry = () => {
        return this.setState({
            ...this.state,
            errorMessage: null
        });
    };

    renderError = () => {
        if (this.state.errorMessage) {
            return (
                <div className={"mx-auto p-4 error-container"}>
                    <div className="text-danger text-center mb-3">
                        <small className={"text-danger font-weight-bold"}>
                            {this.state.errorMessage}
                        </small>
                    </div>
                    <div className={"mx-auto text-center mb-3"}>
                        <button className={"btn btn-primary"} onClick={this.retry}>
                            Volver a intentar
                        </button>
                    </div>
                    <div className="mb-3 text-justify ">
                        <small>
                            Si el problema persiste puedes comunicarte con nuestro equipo de soporte a
                            {" "}
                            <a className={"font-weight-bold"}
                               href="mailto:experiencias@famosos.com">experiencias@famosos.com</a>
                            {" "}
                            para más información.
                        </small>
                    </div>
                </div>
            )
        }
    };

    renderButton = () => {
        const paypalOptions = {
            clientId: process.env.REACT_APP_PAYPAL_KEY,
            intent: 'authorize', // capture
            currency: 'USD',
        };

        const buttonStyles = {
            layout: 'horizontal',
            shape: 'rect',
            color: 'gold',
            size: 'small',
            label: 'paypal',
            tagline: 'false',
        };
        const divStyles = {
            textAlign: "center",
            maxWidth: '100%',
            maxHeight: '50%',
        };
        if (!this.state.errorMessage && this.props.contractPrice > 0) {
            return (
                <div style={divStyles}>
                    <PayPalButton
                        paypalOptions={paypalOptions}
                        buttonStyles={buttonStyles}
                        amount={this.props.contractPrice}
                        onApprove={(data: OnApproveData, authorizationId: string) => {
                            this.createPayPalPayment({
                                create_time: this.getDate(),
                                update_time: this.getDate(),
                                id: data.orderID,
                                status: 'APPROVED',
                                orderID: data.orderID,
                                payerID: data.payerID,
                                authId: authorizationId,
                                intent: "AUTHORIZATION",
                            });
                        }}
                        onPaymentSuccess={(details: OnCaptureData) => {
                            this.createPayPalPayment(details);
                        }}
                        onPaymentError={(error: string) => {
                            this.onPaymentError(error);
                        }}
                    />
                </div>
            );
        }
    };

    onPaymentError = (error: string) =>{
        return this.setState({
            ...this.state,
            errorMessage: error
        });
    };

    render() {
        return (
            <div className={""}>
                <div className={"mb-4"} style={{fontSize: "15px"}}>
                    <li>Haz click sobre el siguiente botón para hacer el pago usando tu cuenta de PayPal.</li>
                    <li>Serás redirigido a la pagina oficial de PayPal para continuar con el pago.</li>
                </div>
                {this.renderError()}
                {this.renderButton()}
            </div>
        );
    }
}

// defaultProps
PayPalCardForm.defaultProps = {
    contractPrice: null,
    contractReference: "",
};

export {PayPalCardForm};
