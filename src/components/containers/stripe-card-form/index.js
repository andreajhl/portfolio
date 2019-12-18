import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import {Elements, StripeProvider} from "react-stripe-elements";
import StripeCardElementLayout from "../../layouts/stripe-card-element";


class StripeCardForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showCardError: false
        };

        this.tokenizeCard = this.tokenizeCard.bind(this);

        this.childRef = React.createRef();
    }

    async tokenizeCard() {
        let {token} = await this.childRef.current.state.stripe.createToken();
        if (token) {
            this.setState({showCardError: false},  () => {
                this.props.onStripeResponse("OK", token.id)
            });
        } else {
            this.setState({showCardError: true}, () => {
                this.props.onStripeResponse("ERROR", null)
            });
        }
    }

    render() {
        return (
            <div className="StripeCardForm">
                <Form.Group>
                    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
                        <Elements>
                            <StripeCardElementLayout ref={this.childRef}/>
                        </Elements>
                    </StripeProvider>
                    <div className={"text-center mt-2"}>
                        <small>
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

    }
};

export {StripeCardForm};
