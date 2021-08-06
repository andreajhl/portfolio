import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import Maybe from "desktop-app/components/common/helpers/maybe";
import Skeleton from "react-loading-skeleton";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { analytics } from "react-app/src/state/utils/gtm";
let PayPalButton = null;
const INTENT = "authorize";
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_KEY;
const CURRENCY = "USD";
const LOCALE = "es_CO";
const PAYPAL_URL = "https://www.paypal.com/sdk/js?disable-funding=credit,card";
const SDK_URL = `${PAYPAL_URL}&client-id=${CLIENT_ID}&intent=${INTENT}&currency=${CURRENCY}&locale=${LOCALE}`;

declare global {
  interface Window {
    paypal: any;
  }
}

type PaypalReactButtonProps = {
  contractReference: string;
  contractPrice: number;
  onPayPalButtonError: (string) => void;
  onPayPalButtonCancel: (string) => void;
  onPayPalButtonApprove: (orderID: string, authorizationID: string) => void;
};

function PaypalReactButton({
  contractPrice,
  contractReference,
  onPayPalButtonError,
  onPayPalButtonCancel,
  onPayPalButtonApprove,
}: PaypalReactButtonProps) {
  // useEffect(() => {
  //   if (isScriptLoaded && isScriptLoadSucceed) {
  //     PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
  //     setShowButton(true);
  //   }
  // }, [isScriptLoaded, isScriptLoadSucceed]);
  const [approved, setApproved] = useState(false);
  // const [showButton, setShowButton] = useState(false);

  const onCreateOrder = (data, actions) => {
    analytics.track("CLICK_PAY_WITH_PAYPAL_BUTTON", {
      widget: "PaypalReactButton",
      contractPrice,
      contractReference,
    });
    return actions.order.create({
      purchase_units: [
        {
          reference_id: contractReference,
          description: "Compra en Famosos.com. Ref: " + contractReference,
          amount: {
            currency_code: "USD",
            value: contractPrice,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    setApproved(true);
    let authorizationID = null;
    return actions.order.authorize().then((authorization) => {
      authorizationID =
        authorization.purchase_units[0].payments.authorizations[0].id;
      onPayPalButtonApprove(data["orderID"], authorizationID);
    });
  };
  const onCancel = (data) => {
    analytics.track("CLOSE_PAYPAL_POPUP", {
      widget: "PaypalReactButton",
      contractPrice,
      contractReference,
      orderId: data["orderID"],
    });
    onPayPalButtonCancel(data["orderID"]);
  };

  const onError = (error) => {
    onPayPalButtonError(error);
  };
  const divStyles = {
    TextAlign: "center",
    maxWidth: "100%",
    maxHeight: "50%",
  };

  return (
    <div>
      <div style={divStyles}>
        <PayPalButtons
          style={{
            layout: "vertical",
            shape: "rect",
            color: "gold",
            label: "pay",
            tagline: false,
          }}
          createOrder={onCreateOrder}
          onApprove={onApprove}
          onError={onError}
          onCancel={onCancel}
          disabled={approved}
        />
        {/* <PayPalButton
            styles={buttonStyles}
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onError={onError}
            onCancel={onCancel}
          /> */}
      </div>

      {approved && <h6>Guardando...</h6>}
    </div>
  );
}

export default PaypalReactButton;
