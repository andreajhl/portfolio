import { ReactNode } from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
import Maybe from "desktop-app/components/common/helpers/maybe";

type PaymentMethodFormHeaderProps = {
  title?: ReactNode;
  closePaymentModal?: () => void;
};

function PaymentMethodFormHeader({
  title,
  closePaymentModal,
}: PaymentMethodFormHeaderProps) {
  return (
    <header className={styles.PaymentMethodFormHeader}>
      <div className={classes("container", styles.Container)}>
        <button
          className={styles.PaymentMethodFormHeaderButton}
          onClick={closePaymentModal}
        >
          <i className="fa fa-times" />
        </button>
        <Maybe it={Boolean(title)}>
          <h2 className={styles.PaymentMethodFormHeaderTitle}>{title}</h2>
        </Maybe>
      </div>
    </header>
  );
}

export { PaymentMethodFormHeader };
