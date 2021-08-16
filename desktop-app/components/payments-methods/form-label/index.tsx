import React from "react";
import { AriaRole } from "react";
import styles from "./styles.module.scss";

interface PaymentMethodFormLabelProps {
  children: React.ReactNode;
  onToggle: () => void;
  role?: AriaRole;
}

function PaymentMethodFormLabel({
  children,
  role = "button",
  onToggle,
}: PaymentMethodFormLabelProps) {
  return (
    <div
      role={role}
      onClick={onToggle}
      onKeyDown={(e) => {
        switch (e.key) {
          case " ":
          case "Enter":
            onToggle();
            break;
          default:
        }
      }}
      className={styles.FormLabel}
    >
      {children}
    </div>
  );
}

export default PaymentMethodFormLabel;
