import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import scriptLoader from "react-async-script-loader";
import { findDOMNode } from "react-dom";
import { LoaderLayout } from "react-app/src/components/layouts/loader";
import styles from "./styles.module.scss";
import WarningMessage from "desktop-app/components/common/warning-message";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { SubmitText } from "desktop-app/components/common/helpers/submit-button-text";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { analytics } from "react-app/src/state/utils/gtm";
const Select = dynamic(() => import("react-select"), { ssr: false });

declare global {
  interface Window {
    dlocal: any;
  }
}
const DLOCALKEY = process.env.NEXT_PUBLIC_DLOCAL_API_KEY;
const isProdEnvironment =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ||
  process.env.NEXT_PUBLIC_ENVIRONMENT === "qa";
const scriptSrc = isProdEnvironment
  ? "https://js.dlocal.com/"
  : "https://js-sandbox.dlocal.com/";

type SelectCardBankPaymentMethodProps = {
  options: Array<{
    value: number;
    label: string;
  }>;
  onChangeOptionSelected: Function;
};

const SelectCardBankPaymentMethod = ({
  options,
  onChangeOptionSelected,
}: SelectCardBankPaymentMethodProps) => {
  const [optionSelected, setOptionSelected] = useState(null);
  const handleChange = (selectedOption) => {
    setOptionSelected(selectedOption);
    onChangeOptionSelected(selectedOption);
  };
  return (
    <Select
      value={optionSelected}
      options={options}
      onChange={(selectedOption) => handleChange(selectedOption)}
    />
  );
};

// export default SelectCardBankPaymentMethod;

const cardStyle = {
  base: {
    fontSize: "1rem",
    lineHeight: "50px",
    color: "#838383",
  },
};
type DLocalFormCardProps = {
  paymentMethodType: string;
  paymentsMethodsAvailable: Array<{
    brand: string;
    id: number;
    identifier: string;
    logo: string;
    name: string;
    redirect: boolean;
  }>;
  isScriptLoaded: boolean;
  isScriptLoadSucceed: boolean;
  paymentInProcess: boolean;
  handleStartPayment: (
    cardToken: string,
    currentOption: {
      name: string;
      paymentMethodId: string;
    }
  ) => void;
  disabled: boolean;
};

const messages = defineMessages({
  tokenErrorInvalidCard: {
    defaultMessage: "Los datos de su tarjeta no son validos.",
  },
  errorCardNotSelected: {
    defaultMessage: "Por favor, seleccione una tarjeta.",
  },
  inputBuyerNamePlaceholder: {
    defaultMessage: "Escribe aquí el nombre",
  },
});

function DLocalFormCard({
  paymentsMethodsAvailable,
  paymentMethodType,
  paymentInProcess,
  isScriptLoadSucceed,
  handleStartPayment,
  isScriptLoaded,
  disabled,
}: DLocalFormCardProps) {
  const [currentOption, setCurrentOption] = useState({
    name: "",
    paymentMethodId: "",
  });
  const [buyerName, setBuyerName] = useState("");
  const inputEl = useRef(null);
  const [dLocalInstance, setDLocalInstance] = useState(null);
  const [card, setCard] = useState(null);
  const buyerNameCard = useRef<HTMLInputElement>(null);
  const [cardIsNotSelectedError, setCardIsNotSelectedError] = useState("");
  const [tokenError, settokenError] = useState("");
  const { formatMessage } = useIntl();
  const handleChangePaymentMethod = (name, paymentMethodId) => {
    setCurrentOption({ name: name, paymentMethodId: paymentMethodId });
  };
  const handlerSubmitCreditCardDetails = (e) => {
    if (currentOption.paymentMethodId || currentOption.name) {
      e.preventDefault();
      analytics.track("SUBMIT_DLOCAL_CREDIT_CARD_DETAILS", {
        widget: "DLocalFormCard",
        paymentMethodType,
        buyerNameCard: buyerNameCard.current,
        bank: currentOption,
      });
      if (buyerName) {
        dLocalInstance
          .createToken(card, {
            name: buyerName,
          })
          .then((result) => {
            handleStartPayment(result.token, currentOption);
          })
          .catch((err) => {
            err.result
              ? settokenError(err.result)
              : settokenError(formatMessage(messages.tokenErrorInvalidCard));
          });
      } else {
        const nodeDocument = buyerNameCard.current;
        nodeDocument?.focus();
      }
    } else {
      setCardIsNotSelectedError(formatMessage(messages.errorCardNotSelected));
    }
  };
  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      console.log("Script loaded");
      const dlocalInstance = window.dlocal(DLOCALKEY);
      const fields = dlocalInstance.fields({
        locale: "es",
        country: "CO",
      });
      const card = fields.create("card", { style: cardStyle });
      card.mount(findDOMNode(inputEl.current));
      setCard(card);
      setDLocalInstance(dlocalInstance);
    }
  }, [isScriptLoaded, isScriptLoadSucceed]);
  return (
    <div className={styles.DLocalFormCardWrapper}>
      <label className={styles.Label}>
        <FormattedMessage defaultMessage="Selecciona una tarjeta" />
      </label>
      <SelectCardBankPaymentMethod
        onChangeOptionSelected={(selected) => {
          setCardIsNotSelectedError("");
          handleChangePaymentMethod(selected.name, selected.value);
          analytics.track("CHANGE_DLOCAL_BANK", {
            widget: "DLocalFormCard",
            selected,
            paymentMethodType,
          });
        }}
        options={paymentsMethodsAvailable.map((paymentMethod) => ({
          value: paymentMethod.id,
          label: paymentMethod.name,
        }))}
      />
      <Maybe it={cardIsNotSelectedError !== ""}>
        <WarningMessage message={cardIsNotSelectedError} />
      </Maybe>
      <label className={styles.Label}>
        <FormattedMessage defaultMessage="Nombre del titular de la tarjeta" />
      </label>
      <input
        placeholder={formatMessage(messages.inputBuyerNamePlaceholder)}
        type="text"
        ref={buyerNameCard}
        className={styles.InputElement}
        value={buyerName}
        onChange={(e) => setBuyerName(e.target.value)}
        id="card-holdername"
      ></input>
      <label className={styles.Label}>
        <FormattedMessage defaultMessage="Datos de la tarjeta" />
      </label>
      <div className={styles.CardFieldWrapper}>
        <div
          id={`card-field-${paymentMethodType}`}
          className="mx-auto"
          style={{
            width: "96%",
          }}
          ref={inputEl}
        ></div>
      </div>
      <Maybe it={tokenError !== ""}>
        <WarningMessage message={tokenError} />
      </Maybe>
      <button
        onClick={(e) => handlerSubmitCreditCardDetails(e)}
        disabled={disabled}
        className="btn btn-primary"
        style={{
          backgroundColor: `${paymentInProcess ? "white" : "#FB177D"}`,
          height: "50px",
          borderRadius: "10px",
          width: "100%",
        }}
      >
        <SubmitText
          baseText={
            paymentInProcess ? (
              <FormattedMessage defaultMessage="Procesando" />
            ) : (
              <FormattedMessage defaultMessage="Pagar" />
            )
          }
          status={paymentInProcess ? "loading" : "idle"}
        />
      </button>
    </div>
  );
}

export default scriptLoader(scriptSrc)(DLocalFormCard);
