import React, { Component } from "react";
import Stripe3dSecureResponse from "../../containers/stripe-3d-secure-response";

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
