import React, { useState, useEffect, useRef } from "react";
import { sessionOperations } from "../../../state/ducks/session";
import { connect } from "react-redux";
import { AVAILABLE_CURRENCIES_FOR_PAYMENTS } from "constants/availableCurrencyForPayments";

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
};

const DLocalPaymentsForm = ({
  handleChangedInputs,
  userInformation,
  userInformationLoading,
  userInformationCompleted,
  getToken,
  currencyExchangeData,
  buyerDataIncomplete
}: DLocalPaymentsFormProps) => {
  const buyerFullNameInput = useRef<HTMLInputElement>(null);
  const buyerEmailInput = useRef<HTMLInputElement>(null);
  const buyerDocumentInput = useRef<HTMLInputElement>(null);
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
  return (
    <form>
      <div className="form-group">
        <label className="font-weight-bold">Nombre</label>
        <input
          ref={buyerFullNameInput}
          value={buyerFullName}
          type="text"
          onChange={(e) => setBuyerFullName(e.target.value)}
          className="form-control"
          style={{
            borderRadius: "10px"
          }}
          placeholder="Escribe aquí tu nombre"
        ></input>
        <label
          className="font-weight-bold"
          style={{
            marginTop: "0.5rem"
          }}
        >
          Email
        </label>
        <input
          style={{
            borderRadius: "10px"
          }}
          type="email"
          ref={buyerEmailInput}
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          className="form-control"
          placeholder="Escribe aquí tu correo electrónico"
        ></input>
        <label
          className="font-weight-bold"
          style={{
            marginTop: "0.5rem"
          }}
        >
          {
            AVAILABLE_CURRENCIES_FOR_PAYMENTS.find(
              (data) => data.name === currencyExchangeData.to
            ).document_name
          }
        </label>
        <input
          ref={buyerDocumentInput}
          style={{
            borderRadius: "10px"
          }}
          type="text"
          value={buyerDocument}
          onChange={(e) => setBuyerDocument(e.target.value)}
          className="form-control"
          placeholder="Escribe aquí tu numero de identificación"
        ></input>
        {buyerDataIncomplete ? (
          <span className="text-danger">
            Por favor introduzca todos los datos
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
  currencyExchangeData: state.payments.currencyExchangeReducer.data
});

const mapDispatchToProps = {
  getToken: sessionOperations.getToken
};

const _DLocalPaymentsForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(DLocalPaymentsForm);

export { _DLocalPaymentsForm as DLocalPaymentsForm };
