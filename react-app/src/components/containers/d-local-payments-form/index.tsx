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
    <form>
      <div className="form-group">
        <label className="font-weight-bold">Nombre</label>
        <input
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
          onChange={(e) => setBuyerEmail(e.target.value)}
          className="form-control"
          placeholder="Escribe aquí tu correo electronico"
        ></input>
        <label className="font-weight-bold">Cedula de identidad</label>
        <input
          style={{
            borderRadius: "10px"
          }}
          type="text"
          onChange={(e) => setBuyerDocument(e.target.value)}
          className="form-control"
          placeholder="Escribe aquí tu numero de identificación"
        ></input>
      </div>
    </form>
  );
};

export default DLocalPaymentsForm;
