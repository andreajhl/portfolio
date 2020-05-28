import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class StripeCardElementLayout extends Component {
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
            <div className="StripeCardElementLayout" style={{border: "solid 2px !important"}}>
                <div className="checkout">
                    <CardElement autofocus={true}/>
                </div>
            </div>
        );
    }
}

export default injectStripe(StripeCardElementLayout);
