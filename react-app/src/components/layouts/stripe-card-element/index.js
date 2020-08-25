import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class StripeCardElementLayout extends Component {
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
