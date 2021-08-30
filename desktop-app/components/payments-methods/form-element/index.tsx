import React from "react";
import styles from "./styles.module.scss";

interface PaymentMethodFormElementProps {
  labelId: string;
  sectionId: string;
  expanded: boolean;
  children: React.ReactNode;
}

function PaymentMethodFormElement({
  expanded,
  labelId,
  sectionId,
  children,
}: PaymentMethodFormElementProps) {
  return (
    <div
      role="region"
      aria-labelledby={labelId}
      id={sectionId}
      className={styles.FormElement}
      hidden={!expanded}
    >
      {children}
    </div>
  );
}

export default PaymentMethodFormElement;
