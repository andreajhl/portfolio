import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import { FormattedMessage } from "react-intl";
import { analytics } from "react-app/src/state/utils/gtm";

let PayPalButton = null;
const INTENT = "authorize";
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_KEY;
const CURRENCY = "USD";
const LOCALE = "es_CO";
const PAYPAL_URL = "https://www.paypal.com/sdk/js?disable-funding=credit,card";
const SDK_URL = `${PAYPAL_URL}&client-id=${CLIENT_ID}&intent=${INTENT}&currency=${CURRENCY}&locale=${LOCALE}`;

class PaypalReactButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      approved: false,
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
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createOrder = (data, actions) => {
    analytics.track("CLICK_PAY_WITH_PAYPAL_BUTTON", {
      widget: "PaypalReactButton",
      contractPrice: this.props.contractPrice,
      contractReference: this.props.contractReference,
    });
    return actions.order.create({
      purchase_units: [
        {
          reference_id: this.props.contractReference,
          description:
            "Compra en Famosos.com. Ref: " + this.props.contractReference,
          amount: {
            currency_code: "USD",
            value: this.props.contractPrice,
          },
        },
      ],
    });
  };

  onApprove = (data, actions) => {
    this.setState({
      ...this.state,
      approved: true,
    });
    // Authorize the transaction
    let authorizationID = null;
    actions.order.authorize().then((authorization) => {
      // Get the authorization id
      authorizationID =
        authorization.purchase_units[0].payments.authorizations[0].id;
      this.setState(
        {
          ...this.state,
          showButtons: false,
        },
        () => {
          this.props.onPayPalButtonApprove(data["orderID"], authorizationID);
        }
      );
    });
  };

  onCancel = (data) => {
    const orderId = data["orderID"];
    analytics.track("CLOSE_PAYPAL_POPUP", {
      widget: "PaypalReactButton",
      contractPrice: this.props.contractPrice,
      contractReference: this.props.contractReference,
      orderId,
    });
    this.props.onPayPalButtonCancel(orderId);
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
      display: !approved ? "block" : "none",
    };
    const buttonStyles = {
      layout: "vertical",
      shape: "rect",
      color: "gold",
      size: "small",
      label: "pay",
      tagline: "false",
      fundingicons: "false",
    };
    return (
      <div>
        {showButtons && (
          <div style={divStyles}>
            <PayPalButton
              styles={buttonStyles}
              createOrder={this.createOrder}
              onApprove={this.onApprove}
              onError={this.onError}
              onCancel={this.onCancel}
            />
          </div>
        )}
        {approved && (
          <h6 className={"text-center"}>
            <FormattedMessage defaultMessage="Guardando..." />
          </h6>
        )}
      </div>
    );
  }
}

// DEFAULT PROPS
PaypalReactButton.defaultProps = {
  contractReference: null,
  contractPrice: null,
  onPayPalButtonApprove: () => {},
  onPayPalButtonCancel: () => {},
  onPayPalButtonError: () => {},
};

export default scriptLoader(SDK_URL)(PaypalReactButton);
