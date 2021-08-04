import styles from "./styles.module.scss";
import classes from "classnames";
import Maybe from "../helpers/maybe";
import { FormattedMessage } from "react-intl";

type FlashDeliveryBadgeProp = {
  className?: string;
  color?: "white" | "dark";
  showTime?: boolean;
  showTitle?: boolean;
};

function FlashDeliveryBadge({
  className = "",
  color = "white",
  showTime = false,
  showTitle = false,
}: FlashDeliveryBadgeProp) {
  return (
    <span
      className={classes(
        styles.FlashDeliveryLayout,
        styles[`FlashDeliveryLayout--color-${color}`],
        !showTitle && !showTime && styles["FlashDeliveryLayout--without-text"],
        className
      )}
    >
      <Maybe it={showTime}>
        <span className={styles.FlashDeliveryLayoutTitle}>
          <FormattedMessage defaultMessage="Entrega Flash" />
        </span>
      </Maybe>
      <Maybe it={showTime}>
        <span className={styles.FlashDeliveryLayoutTime}>
          <FormattedMessage
            defaultMessage="24 hrs."
            description="1 day in hours"
          />
        </span>
      </Maybe>
      <i
        className={classes(
          styles.FlashDeliveryLayoutIcon,
          "fa fa-bolt text-warning"
        )}
      />
    </span>
  );
}

export { FlashDeliveryBadge as FlashDeliveryBadgeLayout };
