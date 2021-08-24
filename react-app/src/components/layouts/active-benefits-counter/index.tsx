import classes from "classnames";
import styles from "./styles.module.scss";

type ActiveBenefitsCounterProps = {
  className?: string;
};

function ActiveBenefitsCounter({ className }: ActiveBenefitsCounterProps) {
  const totalItems = 1;
  const hasItems = totalItems > 0;
  const itemsCount = totalItems <= 9 ? totalItems : "";

  if (!hasItems) return null;

  return (
    <span className={classes(styles.ActiveBenefitsCounter, className)}>
      {itemsCount}
    </span>
  );
}

export { ActiveBenefitsCounter };
