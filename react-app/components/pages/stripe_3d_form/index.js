import React, { Component } from "react";

import { PageContainer } from "../../layouts/page-container";
import { Stripe3dSecureIframe } from "../../containers/stripe-3d-secure-iframe";
import * as ROUTING_PATHS from "../../../routing/Paths";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_KEY);

class ProcessStripe3DFormPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    window.addEventListener("message", this.handleIframeTask);
  }

  handleIframeTask = (message) => {
    if (typeof message.data === "string") {
      if (message.data === "GO_TO_PAYMENT_METHODS") {
        this.props.history._pushRoute(
          ROUTING_PATHS.PAYMENT_METHODS.replace(
            ":contract_reference",
            this.props.match.params.contract_reference
          )
        );
      } else if (message.data.includes("CONTRACT_CREATED")) {
        this.props.history._pushRoute(
          message.data.replace("CONTRACT_CREATED", "")
        );
      }
    }
  };

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
          <div className="PaymentMethodsSection">
            <div
              className={
                "row justify-content-center payment-methods-section-row"
              }
            >
              <div className="col-12 col-md-6 p-0 m-0 mb-4 f-rounded f-shadow">
                <div className="ContractCheckoutSummary">
                  <div className="row contract-summary col-lg-12 justify-content-center">
                    <div className="col-lg-12 custom-card-title f-rounded">
                      <h6 className="text-white">
                        Verificación de autenticidad de la tarjeta
                      </h6>
                    </div>
                  </div>
                </div>
                <Stripe3dSecureIframe
                  iframeUrl={
                    this.props.location.state
                      ? this.props.location.state.url
                      : ""
                  }
                />
                <div className={"p-4 text-center"}>
                  <div className="mt-4 mx-auto text-center">
                    <img
                      width="230px"
                      src={"/assets/img/pago-seguro.png"}
                      alt={"pago-seguro"}
                    />
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>
    );
  }
}

export { ProcessStripe3DFormPage };
