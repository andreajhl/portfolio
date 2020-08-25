import React, {Component} from 'react';
import "./styles.scss";
import {PageContainer} from "../../layouts/page-container";
import {Stripe3dSecureIframe} from "../../containers/stripe-3d-secure-iframe";

class ProcessStripe3DFormPage extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="ProcessStripe3DFormPage">
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
                    <Stripe3dSecureIframe
                        iframeUrl={this.props.location.state.url}
                    />
                </PageContainer>
            </div>
        );
    };

}

export {ProcessStripe3DFormPage};

