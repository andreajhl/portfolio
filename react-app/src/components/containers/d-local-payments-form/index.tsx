import React, { useState, useEffect } from "react";

type DLocalPaymentsFormProps = {
  handleChangedInputs: Function;
};

const DLocalPaymentsForm = ({
  handleChangedInputs
}: DLocalPaymentsFormProps) => {
  const [buyerFullName, setBuyerFullName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerDocument, setBuyerDocument] = useState("");
  useEffect(() => {
    handleChangedInputs({ buyerFullName, buyerDocument, buyerEmail });
  }, [buyerDocument, buyerEmail, buyerFullName]);
  return (
    <div className="form-group">
      <h6 className="font-weight-bold">Nombre</h6>
      <input
        type="text"
        onChange={(e) => setBuyerFullName(e.target.value)}
        className="form-control"
        placeholder="Escribe aquí tu nombre"
      ></input>
      <h6 className="font-weight-bold">Email</h6>
      <input
        type="email"
        onChange={(e) => setBuyerEmail(e.target.value)}
        className="form-control"
        placeholder="Escribe aquí tu correo electronico"
      ></input>
      <h6 className="font-weight-bold">Id</h6>
      <input
        type="text"
        onChange={(e) => setBuyerDocument(e.target.value)}
        className="form-control"
        placeholder="Escribe aquí tu numero de identificación"
      ></input>
    </div>
  );
};

export default DLocalPaymentsForm;
