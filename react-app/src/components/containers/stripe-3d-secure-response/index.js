import React, {Component} from 'react';
import "./styles.scss"
import {withRouter} from "react-router";
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_KEY);


class Stripe3dSecureResponse extends Component {

    constructor(props) {
        super(props);

        this.state = {
            source: ""
        }
    }

    onChange = (event) => {
        this.setState({
            source: event.target.value
        })
    };

    save = async () => {
        this.pollForSourceStatus();
    };

    pollForSourceStatus = () => {
        // After some amount of time, we should stop trying to resolve the order synchronously:
        let MAX_POLL_COUNT = 10;
        let pollCount = 0;
        stripe.retrieveSource({
            id: "src_1HKRkSBr69O3Zf7hDixsQJ61",
            client_secret: "src_client_secret_0RbG7LSva5PTTaU7Yctx5Sxp"
        }).then(function (result) {
            var source = result.source;
            console.log("result", result);
            if (source.status === 'chargeable') {
                // Make a request to your server to charge the Source.
                // Depending on the Charge status, show your customer the relevant message.
            } else if (source.status === 'pending' && pollCount < MAX_POLL_COUNT) {
                // Try again in a second, if the Source is still `pending`:
                setTimeout(this.pollForSourceStatus, 1000);
            } else {
                // Depending on the Source status, show your customer the relevant message.
            }
        });
    };

    render() {
        console.log("window.location:", window.location.search);
        return (
            <div className="Stripe3dSecureResponse">
                <h2>Stripe3dSecureResponse</h2>
                <input value={this.state.source} onChange={this.onChange}/>
                <button onClick={this.save}>CLick Me</button>
            </div>
        );
    };
}


// defaultProps
Stripe3dSecureResponse.defaultProps = {};

// Export class
export default withRouter(Stripe3dSecureResponse);
