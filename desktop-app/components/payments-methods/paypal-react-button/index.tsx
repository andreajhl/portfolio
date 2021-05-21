import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import Maybe from "desktop-app/components/common/helpers/maybe";
import Skeleton from "react-loading-skeleton";
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
  isScriptLoaded: boolean;
  isScriptLoadSucceed: boolean;
  contractReference: string;
  contractPrice: number;
  onPayPalButtonError: (string) => void;
  onPayPalButtonCancel: (string) => void;
  onPayPalButtonApprove: (orderID: string, authorizationID: string) => void;
};

function PaypalReactButton({
  isScriptLoaded,
  isScriptLoadSucceed,
  contractPrice,
  contractReference,
  onPayPalButtonError,
  onPayPalButtonCancel,
  onPayPalButtonApprove,
}: PaypalReactButtonProps) {
  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      setShowButton(true);
    }
  }, [isScriptLoaded, isScriptLoadSucceed]);
  const [approved, setApproved] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const createOrder = (data, actions) => {
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
    actions.order.authorize().then((authorization) => {
      console.dir(authorization);
      authorizationID =
        authorization.purchase_units[0].payments.authorizations[0].id;
      setShowButton(false);
      onPayPalButtonApprove(data["orderID"], authorizationID);
    });
  };
  const onCancel = (data) => {
    onPayPalButtonCancel(data["orderID"]);
  };

  const onError = (error) => {
    onPayPalButtonError(error);
  };
  const divStyles = {
    TextAlign: "center",
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
      {(showButton && (
        <div style={divStyles}>
          <PayPalButton
            styles={buttonStyles}
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onError={onError}
            onCancel={onCancel}
          />
        </div>
      )) || <Skeleton height="40px" width="100%" />}
      {approved && <h6>Guardando...</h6>}
    </div>
  );
}

export default scriptLoader(SDK_URL)(PaypalReactButton);
