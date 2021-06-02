import React, { useState, useEffect, useRef } from "react";
import { sessionOperations } from "../../../state/ducks/session";
import { connect } from "react-redux";
import { AVAILABLE_CURRENCIES_FOR_PAYMENTS } from "constants/availableCurrencyForPayments";
import { allowedFormatDocuments } from "constants/userDocumentFormatAllowedByCurrency";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import {
  AVAILABLE_DOCUMENTS_NAME_FOR_COUNTRIES,
  DOCUMENT_NAME_FOR_COUNTRIES,
} from "react-app/src/constants/messages";

const intlMessages = defineMessages({
  placeholderBuyerNameInput: {
    defaultMessage: "Escribe aquí tu nombre",
  },
  placeholderBuyerEmailInput: {
    defaultMessage: "Escribe aquí tu correo electrónico",
  },
  placeholderBuyerDocumentInput: {
    defaultMessage: "Escribe aquí tu {document_name}",
  },
});

type DLocalPaymentsFormProps = {
  handleChangedInputs: Function;
  userInformation: {
    email: string;
    fullName: string;
  };
  userInformationLoading: boolean;
  getToken: Function;
  userInformationCompleted: boolean;
  currencyExchangeData: any;
  buyerDataIncomplete: boolean;
  currency: string;
  handleValidateData: (result: boolean) => {};
};

const DLocalPaymentsForm = ({
  handleChangedInputs,
  userInformation,
  userInformationLoading,
  userInformationCompleted,
  getToken,
  currencyExchangeData,
  buyerDataIncomplete,
  currency,
  handleValidateData,
}: DLocalPaymentsFormProps) => {
  const intl = useIntl();

  const buyerFullNameInput = useRef<HTMLInputElement>(null);
  const buyerEmailInput = useRef<HTMLInputElement>(null);
  const buyerDocumentInput = useRef<HTMLInputElement>(null);
  const [invalidFormatDocument, setInvalidFormatDocument] = useState(false);
  const [buyerFullName, setBuyerFullName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerDocument, setBuyerDocument] = useState("");
  useEffect(() => {
    if (buyerDataIncomplete) {
      if (buyerFullName.length < 1) {
        const nodeFullName = buyerFullNameInput.current;
        nodeFullName?.focus();
        return;
      }
      if (buyerEmail.length < 1) {
        const nodeEmail = buyerEmailInput.current;
        nodeEmail?.focus();
        return;
      }
      if (buyerDocument.length < 1) {
        const nodeDocument = buyerDocumentInput.current;
        nodeDocument?.focus();
        return;
      }
    }
  }, [buyerDataIncomplete]);
  useEffect(() => {
    if (!userInformationLoading) {
      getToken();
    }
  }, []);
  useEffect(() => {
    if (userInformation.email) {
      setBuyerEmail(userInformation.email);
    }
    if (userInformation.fullName) {
      setBuyerFullName(userInformation.fullName);
    }
  }, [userInformation]);
  useEffect(() => {
    handleChangedInputs({ buyerFullName, buyerDocument, buyerEmail });
  }, [buyerDocument, buyerEmail, buyerFullName]);

  const checkDocumentFormat = () => {
    if (
      typeof allowedFormatDocuments[currencyExchangeData?.to] === "function"
    ) {
      const checkDocument = allowedFormatDocuments[currencyExchangeData?.to];
      const isValid = checkDocument(buyerDocument);
      if (!isValid) {
        setInvalidFormatDocument(true);
        handleValidateData(true);
      } else {
        setInvalidFormatDocument(false);
        handleValidateData(false);
      }
    }
  };
  const document_name_available = AVAILABLE_CURRENCIES_FOR_PAYMENTS.find(
    (data) => data.name === currencyExchangeData.to
  );
  return (
    <form>
      <div className="form-group">
        <label className="font-weight-bold">
          <FormattedMessage defaultMessage="Nombre" />
        </label>
        <input
          autoComplete="off"
          ref={buyerFullNameInput}
          value={buyerFullName}
          type="text"
          onChange={(e) => setBuyerFullName(e.target.value)}
          className="form-control"
          style={{
            borderRadius: "10px",
          }}
          placeholder={intl.formatMessage(
            intlMessages.placeholderBuyerNameInput
          )}
        ></input>
        <label
          className="font-weight-bold"
          style={{
            marginTop: "0.5rem",
          }}
        >
          <FormattedMessage defaultMessage="Email" />
        </label>
        <input
          autoComplete="off"
          style={{
            borderRadius: "10px",
          }}
          type="email"
          ref={buyerEmailInput}
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          className="form-control"
          placeholder={intl.formatMessage(
            intlMessages.placeholderBuyerEmailInput
          )}
        ></input>
        <label
          className="font-weight-bold"
          style={{
            marginTop: "0.5rem",
          }}
        >
          {AVAILABLE_DOCUMENTS_NAME_FOR_COUNTRIES.includes(
            document_name_available?.name
          )
            ? intl.formatMessage(
                DOCUMENT_NAME_FOR_COUNTRIES[document_name_available?.name]
              )
            : document_name_available?.document_name}
        </label>
        <input
          autoComplete="off"
          ref={buyerDocumentInput}
          style={{
            borderRadius: "10px",
          }}
          type="text"
          value={buyerDocument}
          onChange={(e) => setBuyerDocument(e.target.value)}
          className="form-control"
          onBlur={() => checkDocumentFormat()}
          placeholder={intl.formatMessage(
            intlMessages.placeholderBuyerDocumentInput,
            {
              document_name: AVAILABLE_DOCUMENTS_NAME_FOR_COUNTRIES.includes(
                document_name_available?.name
              )
                ? intl.formatMessage(
                    DOCUMENT_NAME_FOR_COUNTRIES[document_name_available?.name]
                  )
                : document_name_available?.document_name,
            }
          )}
        ></input>
        {invalidFormatDocument ? (
          <span className="text-danger">
            <FormattedMessage defaultMessage="Formato no valido" />
          </span>
        ) : null}
        {buyerDataIncomplete ? (
          <span className="text-danger">
            <FormattedMessage defaultMessage=" Por favor introduzca todos los datos" />
          </span>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  userInformation: state.session.getSessionReducer.data,
  userInformationLoading: state.session.getSessionReducer.loading,
  userInformationCompleted: state.session.getSessionReducer.completed,
  currencyExchangeData: state.payments.currencyExchangeReducer.data,
});

const mapDispatchToProps = {
  getToken: sessionOperations.getToken,
};

const _DLocalPaymentsForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(DLocalPaymentsForm);

export { _DLocalPaymentsForm as DLocalPaymentsForm };
