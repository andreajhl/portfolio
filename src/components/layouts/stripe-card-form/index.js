import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class StripeCardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {complete: false};
        this.tokenize = this.tokenize.bind(this);
    }

    async tokenize(event) {
        event.preventDefault();
        let {token} = await this.props.stripe.createToken();
        return token
    }

    render() {
        return (
            <div className="StripeCardForm" style={{border: "solid 2px !important"}}>
                <div className="checkout">
                    <CardElement />
                </div>
            </div>
        );
    }
}

export default injectStripe(StripeCardForm);
