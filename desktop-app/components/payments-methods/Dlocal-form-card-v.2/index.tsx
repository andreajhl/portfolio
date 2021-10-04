import { allowedFormatDocuments } from "constants/userDocumentFormatAllowedByCurrency";
import SubmitButton from "desktop-app/components/common/button/submit-button";
import WarningMessage from "desktop-app/components/common/warning-message";
import { getEmailValidator, getDateValidator } from "lib/validations/common";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { getDeliveryToValidator } from "lib/validations/contractData";
import Maybe from "desktop-app/components/common/helpers/maybe";
import useForm, { ValidationsType } from "lib/hooks/useForm";
import errorMessages from "lib/validations/errorMessages";
import scriptLoader from "react-async-script-loader";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { useState } from "react";

// const Select = dynamic(() => import("react-select"), { ssr: false });

const getValidateDataCard = (value: string, nameValue: string) => {
  if (value.length === 0 || value.length < 3) {
    switch (nameValue) {
      case "numberCard":
        return "Los datos de su tarjeta no son validos";
      default:
        return "Debes introducir un minimo de 3 caracteres";
    }
  }
};

// const identificationDocument=(value:string)=> {
//   const checkDocument = allowedFormatDocuments[currency];
//   if (!checkDocument(value)) {
//     return formatMessage(errorMessages.invalidIdentificationDocument);
//   }
// }

const InitialValues = {
  name: "",
  email: "",
  identificationDocument: "",
  numberCard: "",
  vto: "",
  CVV: "",
  streetAddress: "",
  city: "",
  state: "",
  code: "",
  country: "",
};
type InitialValuesType = typeof InitialValues;

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
  disabled: boolean;
};

const messages = defineMessages({
  tokenErrorInvalidCard: {
    defaultMessage: "Los datos de su tarjeta no son validos.",
  },
  inputBuyerNamePlaceholder: {
    defaultMessage: "Nombre",
  },
  inputBuyerEmailPlaceholder: {
    defaultMessage: "E-mail",
  },
  inputBuyerCURPPlaceholder: {
    defaultMessage: "CURP",
  },
  inputBuyerNumCardPlaceholder: {
    defaultMessage: "Número de tarjeta",
  },
  inputBuyerExpirationPlaceholder: {
    defaultMessage: "Expiración",
  },
  inputBuyerTokenPlaceholder: {
    defaultMessage: "CVV",
  },
  inputBuyerAddressPlaceholder: {
    defaultMessage: "Direccion de calle",
  },
  inputBuyerCityPlaceholder: {
    defaultMessage: "Ciudad",
  },
  inputBuyerStatePlaceholder: {
    defaultMessage: "Estado",
  },
  inputBuyerCountryPlaceholder: {
    defaultMessage: "País/Región",
  },
  inputBuyerCodePlaceholder: {
    defaultMessage: "Código ZIP",
  },
});

function DLocalFormCard({
  paymentsMethodsAvailable,
  paymentMethodType,
  paymentInProcess,
  disabled,
}: DLocalFormCardProps) {
  const [stateInputs, setStateInputs] = useState(InitialValues);
  const [tokenError, settokenError] = useState("");
  const { formatMessage } = useIntl();

  const handleChange = (e) => {
    setStateInputs({
      ...stateInputs,
      [e.target.name]: e.target.value,
    });
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.DLocalFormCardWrapper}>
      <h2>
        <FormattedMessage defaultMessage="DETALLES DE TU TARJETA" />
      </h2>
      <div className={styles.DLocalFormCard_Data}>
        <h6>
          <FormattedMessage defaultMessage="Datos de quien realiza el pago" />
        </h6>
        <input
          placeholder={formatMessage(messages.inputBuyerNamePlaceholder)}
          type="text"
          name="name"
          autoComplete="name"
          value={stateInputs.name}
          onChange={(e) => handleChange(e)}
        />
        <input
          placeholder={formatMessage(messages.inputBuyerEmailPlaceholder)}
          type="email"
          name="email"
          autoComplete="email"
          value={stateInputs.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          placeholder={formatMessage(messages.inputBuyerCURPPlaceholder)}
          type="text"
          name="identificationDocument"
          required
          value={stateInputs.identificationDocument}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={styles.DLocalFormCard_Payment}>
        <input
          placeholder={formatMessage(messages.inputBuyerNumCardPlaceholder)}
          type="text"
          name="numberCard"
          required
          autoComplete="cc-number"
          value={stateInputs.numberCard}
          onChange={(e) => handleChange(e)}
        />
        <div className={styles.DLocalFormCard_Payment_div}>
          <input
            placeholder={formatMessage(
              messages.inputBuyerExpirationPlaceholder
            )}
            type="text"
            name="vto"
            autoComplete="cc-exp"
            maxLength={3}
            required
            className={styles.InputElement1}
            value={stateInputs.vto}
            onChange={(e) => handleChange(e)}
          />
          <input
            placeholder={formatMessage(messages.inputBuyerTokenPlaceholder)}
            type="text"
            name="CVV"
            maxLength={3}
            required
            autoComplete="cc-csc"
            className={styles.InputElement2}
            value={stateInputs.CVV}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div>
        <h6>
          <FormattedMessage defaultMessage="Dirección de Envío" />
        </h6>
        <input
          placeholder={formatMessage(messages.inputBuyerAddressPlaceholder)}
          type="text"
          name="streetAddress"
          autoComplete="street-address"
          required
          value={stateInputs.streetAddress}
          onChange={(e) => handleChange(e)}
        />
        <input
          placeholder={formatMessage(messages.inputBuyerCityPlaceholder)}
          type="text"
          name="city"
          autoComplete="address-line1"
          value={stateInputs.city}
          onChange={(e) => handleChange(e)}
        />
        <div className={styles.DLocalFormCard_Payment_div}>
          <input
            className={styles.InputElement1}
            placeholder={formatMessage(messages.inputBuyerStatePlaceholder)}
            type="text"
            name="state"
            autoComplete="address-line2"
            value={stateInputs.state}
            onChange={(e) => handleChange(e)}
          />
          <input
            className={styles.InputElement2}
            placeholder={formatMessage(messages.inputBuyerCodePlaceholder)}
            type="text"
            name="code"
            autoComplete="postal-code"
            value={stateInputs.code}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div>
        <input
          placeholder={formatMessage(messages.inputBuyerCountryPlaceholder)}
          type="text"
          name="country"
          autoComplete="country"
          value={stateInputs.country}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={styles.CardFieldWrapper}>
        <div
          id={`card-field-${paymentMethodType}`}
          className="mx-auto"
          style={{
            width: "96%",
          }}
        ></div>
      </div>
      <Maybe it={tokenError !== ""}>
        <WarningMessage message={tokenError} />
      </Maybe>
      <SubmitButton
        disabled={disabled}
        type="button"
        loading={paymentInProcess}
        onClick={(e) => handlerSubmit(e)}
      >
        {paymentInProcess ? (
          <FormattedMessage defaultMessage="Procesando" />
        ) : (
          <FormattedMessage defaultMessage="Pagar" />
        )}
      </SubmitButton>
    </div>
  );
}

export default scriptLoader(scriptSrc)(DLocalFormCard);
