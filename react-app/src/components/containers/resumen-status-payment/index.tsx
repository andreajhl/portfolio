import { type } from "os";
import React from "react";
import styled from "styled-components";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import { returnPaymentStatusLabel } from "react-app/src/constants/messages";

type ResumenStatusPaymentsProps = {
  status: number;
  paymentDate: string;
  idFollow: string;
  idTransaction?: string;
  textColor?: string;
};

const ContainerResumenStatusPayment = styled.div`
  display: flex;
  flex-flow: column;
`;

const SpanGray = styled.span`
  color: ${(props) => (props.textColor ? props.textColor : "#838383")};
  font-size: 1.1rem;
  text-transform: uppercase;
`;
const ResumenStatusPayment = ({
  status,
  paymentDate,
  idFollow,
  idTransaction,
  textColor
}: ResumenStatusPaymentsProps) => {
  console.log(status);
  return (
    <ContainerResumenStatusPayment>
      <SpanGray textColor={textColor} className="mt-3">
        <FormattedMessage defaultMessage="ESTADO DEL PAGO:" />{" "}
        {returnPaymentStatusLabel(status)[0]}
      </SpanGray>
      <SpanGray textColor={textColor} className="mt-3">
        <FormattedMessage defaultMessage="FECHA DE PAGO:" />{" "}
        {moment(paymentDate).format("L")}
      </SpanGray>
      {idTransaction ? (
        <SpanGray textColor={textColor} className="mt-3">
          <FormattedMessage defaultMessage="ID DE TRANSACCIÓN:" />{" "}
          {idTransaction}
        </SpanGray>
      ) : null}
      {idFollow ? (
        <SpanGray textColor={textColor} className="mt-3">
          <FormattedMessage defaultMessage="ID DE SEGUIMIENTO:" /> {idFollow}
        </SpanGray>
      ) : null}
    </ContainerResumenStatusPayment>
  );
};

export default ResumenStatusPayment;
