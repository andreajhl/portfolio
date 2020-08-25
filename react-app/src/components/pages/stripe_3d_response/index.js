import React, {Component} from 'react';
import "./styles.scss";
import {PageContainer} from "../../layouts/page-container";
import Stripe3dSecureResponse from "../../containers/stripe-3d-secure-response";


class ProcessStripe3DResponsePage extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="ProcessStripe3DResponsePage">
                <PageContainer
                    applyFetchCelebrities={false}
                    showSearch={false}
                    showNavbarButtons={false}
                    showSearchWeb={false}
                    showInputSearchSm={false}
                    showLogin={false}
                    showFooter={false}
                    hideControls={true}
                >
                    <Stripe3dSecureResponse/>
                </PageContainer>
            </div>
        );
    };

}

export {ProcessStripe3DResponsePage};

