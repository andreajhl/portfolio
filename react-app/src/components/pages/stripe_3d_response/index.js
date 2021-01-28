import React, { Component } from "react";
import "./styles.scss";
import Stripe3dSecureResponse from "../../containers/stripe-3d-secure-response";
import { Stripe3dSecureIframe } from "../../containers/stripe-3d-secure-iframe";
import { PageContainer } from "../../layouts/page-container";

class ProcessStripe3DResponsePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientSecret: "",
      sourceId: ""
    };
  }

  componentDidMount() {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const clientSecret = urlParams.get("client_secret");
    const sourceId = urlParams.get("source");
    this.setState({
      clientSecret,
      sourceId
    });
  }

  render() {
    return (
      <div className="ProcessStripe3DResponsePage">
        {this.state.clientSecret ? (
          <Stripe3dSecureResponse
            contractReference={this.props.match.params.contract_reference}
            clientSecret={this.state.clientSecret}
            sourceId={this.state.sourceId}
          />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export { ProcessStripe3DResponsePage };
