import classes from "classnames";
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
        alt="Icono de Club de Fans"
      />
      Club de Fans
    </div>
  );
}

export { FansClubBadge };
