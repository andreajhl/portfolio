import React from "react";
import moment from "moment";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { returnPaymentStatusLabel } from "react-app/src/constants/messages";

type StatusPaymentDetailsProps = {
  payment_date: string;
  contractReference: string;
  status: number;
};

function StatusPaymentDetails({
  payment_date,
  contractReference,
  status,
}: StatusPaymentDetailsProps) {
  const formattedPaymentDate = moment(payment_date).format("L");
  return (
    <div className={styles.StatusPaymentDetails}>
      <p>
        <FormattedMessage defaultMessage="ESTADO DEL PAGO:" />
        {returnPaymentStatusLabel(status)[0]}
      </p>
      <p>
        <FormattedMessage
          defaultMessage="FECHA DE PAGO: {formattedPaymentDate}"
          values={{ formattedPaymentDate }}
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="ID DE SEGUIMIENTO: {contractReference}"
          values={{ contractReference }}
        />
      </p>
    </div>
  );
}

export default StatusPaymentDetails;
