import React from "react";
import styles from "./styles.module.scss";
interface PaymentMethodFormWrapperProps {
  children: React.ReactNode;
}

function PaymentMethodFormWrapper({ children }: PaymentMethodFormWrapperProps) {
  return <div className={styles.FormSection}>{children}</div>;
}

export default PaymentMethodFormWrapper;
