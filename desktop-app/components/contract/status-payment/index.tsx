import React from "react";
import moment from "moment";
import styles from "./styles.module.scss";

type StatusPaymentDetailsProps = {
  payment_date: string;
  transaction_charge_id?: string;
  payment_id: number;
};

function StatusPaymentDetails({
  payment_date,
  transaction_charge_id,
  payment_id
}: StatusPaymentDetailsProps) {
  return (
    <div className={styles.StatusPaymentDetails}>
      <p>ESTADO DEL PAGO: APROBADO</p>
      <p>FECHA DE PAGO: {moment(payment_date).format("L")}</p>
      {typeof transaction_charge_id === "string" ? (
        <p>ID DE TRANSACCION: {transaction_charge_id}</p>
      ) : null}
      <p>ID DE SEGUIMIENTO: {payment_id}</p>
    </div>
  );
}

export default StatusPaymentDetails;
