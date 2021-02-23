import React, { useState, useEffect } from "react";
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
};

const DLocalPaymentsForm = ({
  handleChangedInputs,
  userInformation,
  userInformationLoading,
  userInformationCompleted,
  getToken,
  currencyExchangeData
}: DLocalPaymentsFormProps) => {
  const [buyerFullName, setBuyerFullName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerDocument, setBuyerDocument] = useState("");
  useEffect(() => {
    if (!userInformationLoading) {
      getToken();
    }
  }, []);
  useEffect(() => {
    console.log(userInformation);
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
          value={buyerFullName}
          type="text"
          onChange={(e) => setBuyerFullName(e.target.value)}
          className="form-control"
          style={{
            borderRadius: "10px"
          }}
          placeholder="Escribe aquí tu nombre"
        ></input>
        <label className="font-weight-bold">Email</label>
        <input
          style={{
            borderRadius: "10px"
          }}
          type="email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          className="form-control"
          placeholder="Escribe aquí tu correo electronico"
        ></input>
        <label className="font-weight-bold">
          {
            AVAILABLE_CURRENCIES_FOR_PAYMENTS.find(
              (data) => data.name === currencyExchangeData.to
            ).document_name
          }
        </label>
        <input
          style={{
            borderRadius: "10px"
          }}
          type="text"
          value={buyerDocument}
          onChange={(e) => setBuyerDocument(e.target.value)}
          className="form-control"
          placeholder="Escribe aquí tu numero de identificación"
        ></input>
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
