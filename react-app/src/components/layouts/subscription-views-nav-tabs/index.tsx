import { SUBSCRIPTION_BENEFITS, SUBSCRIPTION_FEED } from "constants/paths";
import { NavLink } from "../../common/routing";
import classes from "classnames";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { ActiveBenefitsCounter } from "react-app/src/components/layouts/active-benefits-counter";

type SubscriptionViewsNavTabsProps = {
  className?: string;
};

function SubscriptionViewsNavTabs({
  className,
}: SubscriptionViewsNavTabsProps) {
  return (
    <div className={classes(styles.SubscriptionViewsNavTabs, className)}>
      <NavLink to={SUBSCRIPTION_FEED}>
        <FormattedMessage defaultMessage="Contenido" />
      </NavLink>
      <NavLink to={SUBSCRIPTION_BENEFITS}>
        <FormattedMessage defaultMessage="Beneficios" />
        <ActiveBenefitsCounter className={styles.SubscriptionBenefitsCounter} />
      </NavLink>
    </div>
  );
}

export { SubscriptionViewsNavTabs };
