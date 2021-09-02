import classes from "classnames";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

type FansClubBadgeProps = {
  className?: string;
};

function FansClubBadge({ className = "" }: FansClubBadgeProps) {
  return (
    <div className={classes(styles.FanClubBadge, className)}>
      <img
        className={styles.FanClubBadgeIcon}
        src="/assets/img/subscription-star-pink.svg"
        alt="Icono de Backstage"
      />
      <FormattedMessage defaultMessage="Backstage" />
    </div>
  );
}

export { FansClubBadge };
