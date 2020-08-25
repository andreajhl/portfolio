import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import {Elements, StripeProvider} from "react-stripe-elements";
import StripeCardElementLayout from "../../layouts/stripe-card-element";


class StripeCardForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showCardError: false,
            cardName: "",
        };

        this.tokenizeCard = this.tokenizeCard.bind(this);

        this.childRef = React.createRef();
    }

    async tokenizeCard() {
        if(!this.state.cardName){
            this.props.onStripeResponse(this.props.paymentMethod, "ERROR", null, "El nombre del titular de la tarjeta es requerido")
        }else{
            let {token} = await this.childRef.current.state.stripe.createToken({
                    name: this.state.cardName,
                    // //Address line 1 (Street address / PO Box / Company name).
                    // address_line1: null,
                    // //Address line 2 (Apartment / Suite / Unit / Building).
                    // address_line2: null,
                    // //City / District / Suburb / Town / Village.
                    // address_city: null,
                    // //State / County / Province / Region.
                    // address_state: null,
                    // //ZIP or postal code.
                    // address_zip: null,
                    // //Billing address country, if provided.
                    // address_country: null,
                },
            );
            if (token) {
                this.setState({showCardError: false},  () => {
                    this.props.onStripeResponse(this.props.paymentMethod, "OK", token.id)
                });
            } else {
                this.setState({showCardError: true}, () => {
                    this.props.onStripeResponse(this.props.paymentMethod, "ERROR", null)
                });
            }
        }
    }

    handleInput = (e) => {
        this.setState({
            ...this.state,
            cardName: e.target.value,
        })
    };

    render() {
        return (
            <div className="StripeCardForm">
                <Form.Group>
                    <h6>Nombre del titular de la tarjeta</h6>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Escribe aquí el nombre"
                        name="cardName"
                        onChange={this.handleInput}
                        value={this.state.cardName}
                    />
                    <h6>Datos de la tarjeta</h6>
                    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
                        <Elements>
                            <StripeCardElementLayout ref={this.childRef}/>
                        </Elements>
                    </StripeProvider>
                    <div className={"text-center mt-2 pb-2"}>
                        <small style={{fontSize: "11px"}}>
                            Ten en cuenta: CVC = Código en el reverso de la tarjeta, CP/ZIP = Código postal
                        </small>
                    </div>
                </Form.Group>
            </div>
        );
    };
}


// defaultProps
StripeCardForm.defaultProps = {
    onStripeResponse: () => {

    },
    paymentMethod: {}
};

export {StripeCardForm};
