import React from "react";
import moment from "moment";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";

type StatusPaymentDetailsProps = {
  payment_date: string;
  contractReference: string;
};

function StatusPaymentDetails({
  payment_date,
  contractReference,
}: StatusPaymentDetailsProps) {
  const formattedPaymentDate = moment(payment_date).format("L");
  return (
    <div className={styles.StatusPaymentDetails}>
      <p>
        <FormattedMessage defaultMessage="ESTADO DEL PAGO: APROBADO" />
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
