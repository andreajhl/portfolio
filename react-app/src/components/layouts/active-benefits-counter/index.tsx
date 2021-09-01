import classes from "classnames";
import styles from "./styles.module.scss";
import useListSubscriptionBenefits from "lib/hooks/useListSubscriptionBenefits";
import { useEffect, useState } from "react";
import apiService from "react-app/src/state/utils/apiService";
import { LIST_SUBSCRIPTION_BENEFITS_PATH } from "react-app/src/state/ducks/celebrity-subscription-benefits/paths";

type ActiveBenefitsCounterProps = {
  className?: string;
};

function ActiveBenefitsCounter({ className }: ActiveBenefitsCounterProps) {
  /* TODO: Add the correct endpoint, this is a provisional method to get total benefits count */
  const [totalItems, setTotalItems] = useState(0);
  const { totalResults, status } = useListSubscriptionBenefits({
    shouldFetch: false,
  });

  useEffect(() => {
    if (status === "completed") return;

    async function fetchBenefitCount() {
      const response: any = await apiService({
        method: "GET",
        path: LIST_SUBSCRIPTION_BENEFITS_PATH,
        params: { limit: 1, offset: 0 },
      });
      if (!response || response?.status === "ERROR") return;
      setTotalItems(response?.data?.totalResults);
    }

    fetchBenefitCount();
  }, []);

  useEffect(() => {
    if (status !== "completed") return;
    setTotalItems(totalResults);
  }, [status, totalResults]);

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
