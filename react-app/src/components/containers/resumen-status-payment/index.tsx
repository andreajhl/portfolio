import { type } from "os";
import React from "react";
import styled from "styled-components";
type ResumenStatusPaymentsProps = {
  status: number;
  paymentDate: string;
  idFollow: string;
  idTransaction?: string;
};

const ResumenStatusPayment = ({
  status,
  paymentDate,
  idFollow,
  idTransaction
}: ResumenStatusPaymentsProps) => {
  const ContainerResumenStatusPayment = styled.div`
    display: flex;
    flex-flow: column;
  `;

  const SpanGray = styled.span`
    color: #838383;
  `;
  return (
    <ContainerResumenStatusPayment>
      <SpanGray className="mt-1">ESTADO DEL PAGO: {status}</SpanGray>
      <SpanGray className="mt-1">FECHA DE PAGO: {paymentDate}</SpanGray>
      <SpanGray className="mt-1">ID DEL SEGUIMIENTO: {idFollow}</SpanGray>
      {idTransaction ? (
        <SpanGray className="mt-1">ID DE TRANSACCIÓN: {idTransaction}</SpanGray>
      ) : null}
    </ContainerResumenStatusPayment>
  );
};

export default ResumenStatusPayment;
