import React from "react";
import moment from "moment";
import styles from "./styles.module.scss";

type StatusPaymentDetailsProps = {
  payment_date: string;
  contractReference: string;
};

function StatusPaymentDetails({
  payment_date,
  contractReference,
}: StatusPaymentDetailsProps) {
  return (
    <div className={styles.StatusPaymentDetails}>
      <p>ESTADO DEL PAGO: APROBADO</p>
      <p>FECHA DE PAGO: {moment(payment_date).format("L")}</p>
      <p>ID DE SEGUIMIENTO: {contractReference}</p>
    </div>
  );
}

export default StatusPaymentDetails;
