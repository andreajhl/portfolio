import { SUBSCRIPTION_BENEFITS, SUBSCRIPTION_FEED } from "constants/paths";
import { NavLink } from "../../common/routing";
import classes from "classnames";
import styles from "./styles.module.scss";

type SubscriptionViewsNavTabsProps = {
  className?: string;
};

function SubscriptionViewsNavTabs({
  className,
}: SubscriptionViewsNavTabsProps) {
  return (
    <div className={classes(styles.SubscriptionViewsNavTabs, className)}>
      <NavLink to={SUBSCRIPTION_FEED}>Contenido</NavLink>
      <NavLink to={SUBSCRIPTION_BENEFITS}>Beneficios</NavLink>
    </div>
  );
}

export { SubscriptionViewsNavTabs };
