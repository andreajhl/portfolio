import {
  getCelebrityBackstagePostsPath,
  getCelebrityBackstageBenefitsPath,
} from "constants/paths";
import { NavLink } from "../../common/routing";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { ActiveBenefitsCounter } from "react-app/src/components/layouts/active-benefits-counter";
import { NavTabs } from "../nav-tabs";
import classes from "classnames";

type CelebrityBackstageViewsNavTabsProps = {
  className?: string;
  celebrityUsername: string;
  celebrityId: number;
};

function CelebrityBackstageViewsNavTabs({
  className,
  celebrityUsername,
  celebrityId,
}: CelebrityBackstageViewsNavTabsProps) {
  return (
    <NavTabs
      className={classes(styles.CelebrityBackstageViewsNavTabs, className)}
    >
      <NavLink exact to={getCelebrityBackstagePostsPath(celebrityUsername)}>
        <FormattedMessage defaultMessage="Contenido" />
      </NavLink>
      <NavLink exact to={getCelebrityBackstageBenefitsPath(celebrityUsername)}>
        <FormattedMessage defaultMessage="Beneficios" />
        <ActiveBenefitsCounter
          className={styles.SubscriptionBenefitsCounter}
          celebrityId={celebrityId}
        />
      </NavLink>
    </NavTabs>
  );
}

export { CelebrityBackstageViewsNavTabs };
