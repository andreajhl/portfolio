import React, {Component} from 'react';
import PaypalReactButton from "../paypal-react-button"
import {processPayPalPayment} from "../../../state/ducks/payments/actions";
import * as GTM from "../../../state/utils/gtm";
import {history} from "../../../routing/History";
import * as ROUTING_PATHS from "../../../routing/Paths";


class SubscriptionPayPalCardForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: null,
        }
    }

    retry = () => {
        return this.setState({
            ...this.state,
            errorMessage: null
        });
    };

    onPayPalButtonApprove = (orderId, authorizationId) => {
        console.log(orderId, authorizationId)
        console.log('to do')
        // // connect to out backend
        // processPayPalPayment(
        //     //send data required
        //     this.props.contractReference,
        //     orderId,
        //     authorizationId,
        //     this.props.discountCouponId,
        // )
        //     .then(res => {
        //       //Send data to GTM
        //         console.log('Response OK')
        //       //Redirect user
        //     })
        //     .catch(error => {
        //         this.setState({
        //             ...this.state,
        //             errorMessage: error
        //         })
        //     })
    };

    onPayPalButtonCancel = (orderId) => {
        return this.setState({
            ...this.state,
            errorMessage: "Acción cancelada por el usuario"
        });
    };

    onPayPalButtonError = (error: string) => {
        return this.setState({
            ...this.state,
            errorMessage: error
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

    render() {
        return (
          <div className={''}>
            <div className={'mb-4'} style={{ fontSize: '15px' }}>
              <li>
                Haz click sobre el siguiente botón para hacer el pago usando tu
                cuenta de PayPal.
              </li>
              <li>
                Serás redirigido a la pagina oficial de PayPal para continuar
                con el pago.
              </li>
            </div>
            {this.renderError()}
            {!this.state.errorMessage && this.props.contractPrice > 0 ? (
              <PaypalReactButton
                contractReference={this.props.contractReference}
                contractPrice={this.props.contractPrice}
                onPayPalButtonApprove={this.onPayPalButtonApprove}
                onPayPalButtonCancel={this.onPayPalButtonCancel}
                onPayPalButtonError={this.onPayPalButtonError}
              />
            ) : null}
          </div>
        );
    }
}

// defaultProps
SubscriptionPayPalCardForm.defaultProps = {
    contractPrice: null,
    contractReference: "",
};

export {SubscriptionPayPalCardForm};
