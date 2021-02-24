import React, { useEffect, useState, useRef } from "react";
import getWindow from "react-app/src/utils/getWindow";
import { findDOMNode } from "react-dom";
import scriptLoader from "react-async-script-loader";
import { LoaderLayout } from "../../layouts/loader";
const DLOCALKEY = process.env.NEXT_PUBLIC_DLOCAL_API_KEY;
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_KEY;
const scriptSrc = "https://js-sandbox.dlocal.com/";

declare global {
  interface Window {
    dlocal: any;
  }
}

const DLocalFormCard = ({
  isScriptLoaded,
  isScriptLoadSucceed,
  onScriptLoaded,
  handleStartPayment,
  paymentInProcess
}) => {
  const [card, setCard] = useState(null);
  const [buyerName, setBuyerName] = useState("");
  const [tokenError, settokenError] = useState("");
  const [dLocalInstance, setDLocalInstance] = useState(null);
  const handlerSubmitCreditCardDetails = (e) => {
    e.preventDefault();
    dLocalInstance
      .createToken(card, {
        name: buyerName
      })
      .then((result) => {
        handleStartPayment(result.token);
      })
      .catch((err) => {
        err.result
          ? settokenError(err.result)
          : settokenError("Los datos de su tarjeta no son validos");
      });
  };
  const inputEl = useRef(null);
  const style = {
    base: {
      fontSize: "16px",
      color: "#32325d"
    }
  };
  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      console.log("Script loaded");
      const dlocalInstance = window.dlocal(DLOCALKEY);
      const fields = dlocalInstance.fields({
        locale: "es",
        country: "CO"
      });
      const card = fields.create("card", { style: style });
      card.mount(findDOMNode(inputEl.current));
      setCard(card);
      setDLocalInstance(dlocalInstance);
    }
  }, [isScriptLoaded, isScriptLoadSucceed]);
  return isScriptLoaded ? (
    <form className="d-flex flex-column w-100">
      <div className="form-group">
        <label htmlFor="card-holdername" className="font-weight-bold">
          Nombre del titular de la tarjeta
        </label>
        <input
          type="text"
          className="form-control mb-4"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          id="card-holdername"
        ></input>
        <div id="card-field" ref={inputEl}></div>
        <div id="card-errors" role="alert"></div>
        <div>{tokenError}</div>
      </div>
      <button
        onClick={(e) => handlerSubmitCreditCardDetails(e)}
        disabled={paymentInProcess}
        className="btn btn-primary mx-auto mt-2"
        style={{
          backgroundColor: `${paymentInProcess ? "white" : "#FB177D"}`,
          height: "50px",
          borderRadius: "10px",
          width: "100%"
        }}
      >
        {paymentInProcess ? <LoaderLayout /> : "Pagar"}
      </button>
    </form>
  ) : (
    <LoaderLayout></LoaderLayout>
  );
};

export default scriptLoader(scriptSrc)(DLocalFormCard);
