import { SUBSCRIPTION_BENEFITS, SUBSCRIPTION_FEED } from "constants/paths";
import { NavLink } from "../../common/routing";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { ActiveBenefitsCounter } from "react-app/src/components/layouts/active-benefits-counter";
import { NavTabs } from "../nav-tabs";

type SubscriptionViewsNavTabsProps = {
  className?: string;
  celebrityId: number;
};

function SubscriptionViewsNavTabs({
  className,
  celebrityId,
}: SubscriptionViewsNavTabsProps) {
  return (
    <NavTabs className={className}>
      <NavLink to={SUBSCRIPTION_FEED}>
        <FormattedMessage defaultMessage="Contenido" />
      </NavLink>
      <NavLink to={SUBSCRIPTION_BENEFITS}>
        <FormattedMessage defaultMessage="Beneficios" />
        <ActiveBenefitsCounter
          className={styles.SubscriptionBenefitsCounter}
          celebrityId={celebrityId}
        />
      </NavLink>
    </NavTabs>
  );
}

export { SubscriptionViewsNavTabs };
