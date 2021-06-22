import React, { useEffect, useState, useRef } from "react";
import getWindow from "react-app/src/utils/getWindow";
import { findDOMNode } from "react-dom";
import scriptLoader from "react-async-script-loader";
import styled from "styled-components";
import { LoaderLayout } from "../../layouts/loader";
import { FormattedMessage, useIntl, defineMessage } from "react-intl";

const inputcardHoldername = defineMessage({
  defaultMessage: "Escribe aquí el nombre",
});

const DLOCALKEY = process.env.NEXT_PUBLIC_DLOCAL_API_KEY;
const isProdEnvironment =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ||
  process.env.NEXT_PUBLIC_ENVIRONMENT === "qa";
const scriptSrc = isProdEnvironment
  ? "https://js.dlocal.com/"
  : "https://js-sandbox.dlocal.com/";
declare global {
  interface Window {
    dlocal: any;
  }
}
const InputElement = styled.input`
  height: 56px !important;
`;
const LabelElement = styled.label`
  font-weight: 300;
  color: #838383;
`;

const CardField = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  background-color: white;
`;

const DLocalFormCard = ({
  isScriptLoaded,
  isScriptLoadSucceed,
  onScriptLoaded,
  handleStartPayment,
  paymentInProcess,
  paymentErrorMessage,
  paymentMethodType,
  disabled,
}) => {
  const intl = useIntl();
  const [card, setCard] = useState(null);
  const [buyerName, setBuyerName] = useState("");
  const [processingCard, setProcessingCard] = useState(false);
  const [tokenError, settokenError] = useState("");
  const [dLocalInstance, setDLocalInstance] = useState(null);
  const buyerNameCard = useRef<HTMLInputElement>(null);
  const handlerSubmitCreditCardDetails = (e) => {
    e.preventDefault();
    if (buyerName) {
      setProcessingCard(true);
      dLocalInstance
        .createToken(card, {
          name: buyerName,
        })
        .then((result) => {
          handleStartPayment(result.token);
          setProcessingCard(false);
        })
        .catch((err) => {
          setProcessingCard(false);
          err.result
            ? settokenError(err.result)
            : settokenError("Los datos de su tarjeta no son validos.");
        });
    } else {
      const nodeDocument = buyerNameCard.current;
      nodeDocument?.focus();
    }
  };
  const inputEl = useRef(null);
  const style = {
    base: {
      fontSize: "1rem",
      lineHeight: "50px",
      color: "#838383",
    },
  };
  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      console.log("Script loaded");
      const dlocalInstance = window.dlocal(DLOCALKEY);
      const fields = dlocalInstance.fields({
        locale: "es",
        country: "CO",
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
        <LabelElement htmlFor="card-holdername">
          <FormattedMessage defaultMessage="Nombre del titular de la tarjeta" />
        </LabelElement>
        <InputElement
          autoComplete="off"
          placeholder={intl.formatMessage(inputcardHoldername)}
          type="text"
          ref={buyerNameCard}
          className="form-control mb-4"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          id="card-holdername"
        ></InputElement>
        <LabelElement htmlFor="card-field">
          <FormattedMessage defaultMessage="Datos de la tarjeta" />
        </LabelElement>
        <CardField>
          <div
            id={`card-field-${paymentMethodType}`}
            className="mx-auto"
            style={{
              width: "96%",
            }}
            ref={inputEl}
          ></div>
        </CardField>
        <div id="card-errors" role="alert"></div>
        <div>{tokenError}</div>
        <span
          style={{
            fontSize: "10px",
          }}
        >
          <FormattedMessage
            defaultMessage="Ten en cuenta: CVC = Código en el reverso de la tarjeta, CP/ZIP =
          Código postal"
          />
        </span>
      </div>
      <div className="mx-auto text-danger">{paymentErrorMessage}</div>
      <button
        onClick={(e) => handlerSubmitCreditCardDetails(e)}
        disabled={processingCard || disabled}
        className="btn btn-primary mx-auto mt-2"
        style={{
          backgroundColor: `${paymentInProcess ? "white" : "#FB177D"}`,
          height: "50px",
          borderRadius: "10px",
          width: "100%",
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
