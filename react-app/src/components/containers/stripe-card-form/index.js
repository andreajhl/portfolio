import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import "./styles.scss"
import {CardElement, injectStripe} from "react-stripe-elements";
import {Session} from "../../../state/utils/session";
import * as PATHS from "../../../routing/Paths";
import {withRouter} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';


class StripeCardForm extends Component {

    constructor(props) {
        super(props);
        this.session = new Session();
        this.state = {
            showCardError: false,
            ownerName: this.session.getSession().fullName,
            ownerEmail: this.session.getSession().email,
            iframeUrl: null
        };

    }

    addStripePoll = async (clientSecret, sourceId) => {
        const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
        const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
        console.log("stripe", stripe)
        stripe.source.poll(
            sourceId,
            clientSecret,
            this.onPollCallback
        );
    };

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
                            return_url: window.location.origin + PATHS.STRIPE_3D_SECURE_RESPONSE.replace(":contract_reference", this.props.contractReference)
                        },
                        owner: userData
                    }).then(response => {

                        console.log("createSource 3D REQUIRED", response);

                        // ERROR
                        if (response.error) {
                            console.log("createSource ERROR", response.error.message);
                            // TODO
                            return;
                        }

                        console.log("response", response);

                        // ON POLL
                        this.addStripePoll(response.source.client_secret, response.source.id)

                        // // GO TO IFRAME
                        // this.setState({
                        //     ...this.state,
                        //     iframeUrl: response.source.redirect.url
                        // });


                        // this.props.history.push({
                        //     pathname: PATHS.STRIPE_3D_SECURE_IFRAME.replace(
                        //         ":contract_reference",
                        //         this.props.contractReference
                        //     ),
                        //     state: {url: response.source.redirect.url}
                        // });
                    });
                }
            })
    };

    onPollCallback = (paymentRequest, resolve, reject) => {
        return (status, source) => {
            console.log('onPoolCallback --> ', source);

            if (status !== 200 || source.error) {
                console.log('onPoolCallback --> REJECT --> not 200 or error --> ', source);
                reject(source.error);
            } else if (source.status === 'canceled' || source.status === 'consumed' || source.status === 'failed') {
                console.log('onPoolCallback --> REJECT --> canceled/consumed/fail --> ', source);
                reject(source.status);
            } else if (/* source.three_d_secure.authenticated && */ source.status === 'chargeable') {
                /* some cards do not need to be authenticated, like the 4242 4242 4242 4242 */
                console.log('onPoolCallback --> SUCCESS --> ', source);
                resolve(source);
            }
        };
    };

    render() {
        return (
            <div className="StripeCardForm">
                {
                    this.state.iframeUrl
                        ?
                        <iframe src={this.state.iframeUrl} width={"100%"} height={"700px"}/>
                        :
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
                            <div className={"mx-auto text-center"}>
                                <button className={"btn btn-primary"} onClick={this.apply3DCharge}>Pagar</button>
                            </div>
                        </Form.Group>
                }
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
