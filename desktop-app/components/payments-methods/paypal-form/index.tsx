import {
  DotCircle,
  Ellipse,
  PaypalIcon,
} from "desktop-app/components/common/icons";
import React from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import styles from "./styles.module.scss";
type PaypalFormProps = {
  expanded: boolean;
  index: number;
  onToggle: () => void;
};

function PaypalForm({ expanded, index, onToggle }: PaypalFormProps) {
  const sectionId = `section-${index}`;
  const labelId = `label-${index}`;

  return (
    <div className={styles.FormSection}>
      <div
        role="button"
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
        <PaypalIcon className={styles.CardIcon} />

        <span className={styles.Label}>Paypal</span>
        {expanded ? (
          <DotCircle className={styles.CheckIcon} />
        ) : (
          <Ellipse className={styles.CheckIcon} />
        )}
      </div>
      <div
        role="region"
        aria-labelledby={labelId}
        id={sectionId}
        hidden={!expanded}
      >
        <Maybe it={expanded}>
          <span>Hola!</span>
        </Maybe>
      </div>
    </div>
  );
}

export default PaypalForm;
