import { type } from "os";
import React from "react";
import styled from "styled-components";
import moment from "moment";

type ResumenStatusPaymentsProps = {
  status: number;
  paymentDate: string;
  idFollow: string;
  idTransaction?: string;
  textColor?: string;
};

const ResumenStatusPayment = ({
  status,
  paymentDate,
  idFollow,
  idTransaction,
  textColor
}: ResumenStatusPaymentsProps) => {
  const ContainerResumenStatusPayment = styled.div`
    display: flex;
    flex-flow: column;
  `;

  const SpanGray = styled.span`
    color: ${(props) => (props.textColor ? props.textColor : "#838383")};
  `;
  return (
    <ContainerResumenStatusPayment>
      <SpanGray textColor={textColor} className="mt-3">
        ESTADO DEL PAGO: {status}
      </SpanGray>
      <SpanGray textColor={textColor} className="mt-3">
        FECHA DE PAGO: {moment(paymentDate).format("L")}
      </SpanGray>
      <SpanGray textColor={textColor} className="mt-3">
        ID DEL SEGUIMIENTO: {idFollow}
      </SpanGray>
      {idTransaction ? (
        <SpanGray className="mt-3">ID DE TRANSACCIÓN: {idTransaction}</SpanGray>
      ) : null}
    </ContainerResumenStatusPayment>
  );
};

export default ResumenStatusPayment;
