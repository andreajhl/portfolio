import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

let PayPalButton = null;
const INTENT = "subscription";
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_KEY;
const CURRENCY = "USD";
const LOCALE = "es_CO";
const PAYPAL_URL = "https://www.paypal.com/sdk/js?disable-funding=credit,card";
const VAULT = "true";
const SDK_URL = `${PAYPAL_URL}&client-id=${CLIENT_ID}&vault=${VAULT}&intent=${INTENT}`;

class SubscriptionPaypalReactButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      approved: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;
    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;
    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createSubscription = (data, actions) => {
    return actions.subscription.create({
      plan_id: "P-37H55955PE295851GL726VIQ"
    });
  };

  onApprove = (data, actions) => {
    this.setState({
      ...this.state,
      approved: true,
      showButtons: false
    });
    this.props.onPayPalButtonApprove(data);
  };

  onCancel = (data) => {
    this.props.onPayPalButtonCancel(data["orderID"]);
  };

  onError = (error) => {
    this.props.onPayPalButtonError(error);
  };

  render() {
    const { showButtons, loading, approved } = this.state;
    const divStyles = {
      textAlign: "center",
      maxWidth: "100%",
      maxHeight: "50%",
      display: !approved ? "block" : "none"
    };
    const buttonStyles = {
      layout: "vertical",
      shape: "rect",
      color: "gold",
      size: "small",
      label: "pay",
      tagline: "false",
      fundingicons: "false"
    };
    return (
      <div>
        {showButtons && (
          <div style={divStyles}>
            <PayPalButton
              styles={buttonStyles}
              createSubscription={this.createSubscription}
              onApprove={this.onApprove}
              onError={this.onError}
              onCancel={this.onCancel}
            />
          </div>
        )}
        {approved && <h6 className={"text-center"}>Guardando...</h6>}
      </div>
    );
  }
}

// DEFAULT PROPS
SubscriptionPaypalReactButton.defaultProps = {
  planId: null,
  contractPrice: null,
  onPayPalButtonApprove: () => {},
  onPayPalButtonCancel: () => {},
  onPayPalButtonError: () => {}
};

export default scriptLoader(SDK_URL)(SubscriptionPaypalReactButton);
