import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import "./styles.scss"
import {CardElement, injectStripe} from "react-stripe-elements";
import {Session} from "../../../state/utils/session";
import * as PATHS from "../../../routing/Paths";
import {withRouter} from 'react-router-dom';


class StripeCardForm extends Component {

    constructor(props) {
        super(props);
        this.session = new Session();
        this.state = {
            showCardError: false,
            ownerName: this.session.getSession().fullName,
            ownerEmail: this.session.getSession().email,
            threeDSecureURL: "",
        };

    }

    handleInput = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
    };

    apply3DCharge = () => {

        const amount = this.props.contractPrice * 100;
        const currency = "USD";
        const userData = {
            name: this.state.ownerName,
            email: this.state.ownerEmail,
        };

        // CREATE A SOURCE CARD
        this.props.stripe
            .createSource({
                type: 'card',
                currency: currency,
                amount: amount,
                owner: userData
            })
            .then(response => {
                console.log("createSource Response: ", response);

                // ERROR
                if (response.error) {
                    // ERROR
                    console.log("createSource ERROR", response.error);
                    // TODO
                    return;
                }


                // SEND TO THE BACKEND TO LINKED WITH THE CUSTOMER AND APPLY THE AUTHORIZATION
                if (response.source.card.three_d_secure === 'not_supported' && response.source.status === 'chargeable') {
                    console.log("createSource NOT 3D NOT REQUIRED", response);
                    // TODO
                    return;
                }

                // APPLY 3D FLOW
                if (response.source.card.three_d_secure === 'required' ||
                    response.source.card.three_d_secure === 'recommended' ||
                    response.source.card.three_d_secure === 'optional'
                ) {
                    console.log("createSource 3D REQUIRED", response);

                    const redirectUrl = PATHS.STRIPE_3D_SECURE_IFRAME.replace(
                        ":contract_reference",
                        this.props.contractReference
                    );
                    // CREATE A 3D SOURCE
                    this.props.stripe.createSource({
                        type: 'three_d_secure',
                        currency: currency,
                        amount: amount,
                        three_d_secure: {
                            card: response.source.id
                        },
                        redirect: {
                            return_url: window.location.origin + "/" + PATHS.STRIPE_3D_SECURE_RESPONSE.replace(":contract_reference", this.props.contractReference)
                        },
                        owner: userData
                    }).then(response => {

                        // ERROR
                        if (response.error) {
                            console.log("createSource ERROR", response.error.message);
                            // TODO
                            return;
                        }

                        // GO TO IFRAME
                        this.props.history.push({
                            pathname: PATHS.STRIPE_3D_SECURE_IFRAME.replace(
                                ":contract_reference",
                                this.props.contractReference
                            ),
                            state: {url: response.source.redirect.url}
                        });
                    });
                }
            })
    };

    returnIframe = () => {
        if (this.state.threeDSecureURL !== "") {
            return <iframe
                src={this.state.threeDSecureURL}
                width="100%"
                height="700"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
            />
        }
    };

    render() {
        return (
            <div className="StripeCardForm">
                <Form.Group>
                    <h6 className={"font-weight-light"}>Correo del titular de la tarjeta</h6>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Escribe aquí el correo"
                        name="ownerEmail"
                        onChange={this.handleInput}
                        value={this.state.ownerEmail}
                    />
                    <h6 className={"font-weight-light"}>Nombre del titular de la tarjeta</h6>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Escribe aquí el nombre"
                        name="ownerName"
                        onChange={this.handleInput}
                        value={this.state.ownerName}
                    />
                    <h6 className={"font-weight-light"}>Datos de la tarjeta</h6>
                    <div className="StripeCardElementLayout" style={{border: "solid 2px !important"}}>
                        <div className="checkout">
                            <CardElement/>
                        </div>
                    </div>
                    <div className={"text-center mt-2 pb-2"}>
                        <div className={"font-weight-light"} style={{fontSize: "10px"}}>
                            Ten en cuenta: CVC = Código en el reverso de la tarjeta, CP/ZIP = Código postal
                        </div>
                    </div>
                </Form.Group>
                <div className={"mx-auto text-center"}>
                    <button className={"btn btn-primary"} onClick={this.apply3DCharge}>Pagar</button>
                </div>
                {this.returnIframe()}
            </div>
        );
    };
}


// defaultProps
StripeCardForm.defaultProps = {
    contractReference: "",
    contractPrice: 0
};
export default withRouter(injectStripe(StripeCardForm));
