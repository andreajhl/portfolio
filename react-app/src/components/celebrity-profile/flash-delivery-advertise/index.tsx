import styles from "./styles.module.scss";
import classes from "classnames";
import { FormattedMessage } from "react-intl";

type FlashDeliveryAdvertiseProps = {
  className?: string;
};

function FlashDeliveryAdvertise({ className }: FlashDeliveryAdvertiseProps) {
  return (
    <div className={classes(styles.FlashDeliveryAdvertise, className)}>
      <span className={styles.FlashDeliveryAdvertiseIcon}>
        <i className="fa fa-bolt text-warning" />
      </span>
      <FormattedMessage defaultMessage="Entrega Flash (Menos de 24 hrs.)" />
    </div>
  );
}

export { FlashDeliveryAdvertise };
