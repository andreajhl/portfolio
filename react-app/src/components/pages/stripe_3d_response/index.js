import React, {Component} from 'react';
import "./styles.scss";
import Stripe3dSecureResponse from "../../containers/stripe-3d-secure-response";


class ProcessStripe3DResponsePage extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="ProcessStripe3DResponsePage">
                <Stripe3dSecureResponse/>
            </div>

        );
    };

}

export {ProcessStripe3DResponsePage};

