import classes from "classnames";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { getCountActiveBenefits } from "react-app/src/state/ducks/celebrity-subscription-benefits/actions";

type ActiveBenefitsCounterProps = {
  className?: string;
  celebrityId?: number;
};

function ActiveBenefitsCounter({
  className,
  celebrityId,
}: ActiveBenefitsCounterProps) {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    async function fetchBenefitCount() {
      try {
        const response: any = await getCountActiveBenefits(celebrityId);
        if (!response || response?.data?.status === "ERROR") return;
        setTotalItems(response?.data?.data?.benefitCount);
      } catch (error) {
        console.log(error?.toString?.());
      }
    }

    fetchBenefitCount();
  }, [celebrityId]);

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
