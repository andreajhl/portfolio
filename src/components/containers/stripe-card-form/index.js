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

        this.childRef = React.createRef();
    }

    async tokenizeCard() {
        this.setState({showCardError: false}, async () => {
            let {token} = await this.childRef.current.state.stripe.createToken();
            if (token) {
                alert("2")
                this.props.onTokenizeCard("OK", token.id)
            } else {
                alert("3")
                this.setState({showCardError: true}, () => {
                    this.props.onTokenizeCard("ERROR", token.id)
                });
            }
        });
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
    onTokenizeCard: () => {

    }
};

export {StripeCardForm};
