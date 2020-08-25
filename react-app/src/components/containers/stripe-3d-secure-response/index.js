import React, {Component} from 'react';
import "./styles.scss"
import {injectStripe} from "react-stripe-elements";
import {withRouter} from 'react-router-dom';


class Stripe3dSecureResponse extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Stripe3dSecureResponse">
                <h2>Stripe3dSecureResponse</h2>
            </div>
        );
    };
}


// defaultProps
Stripe3dSecureResponse.defaultProps = {};

// Export class
export default withRouter(injectStripe(Stripe3dSecureResponse));
