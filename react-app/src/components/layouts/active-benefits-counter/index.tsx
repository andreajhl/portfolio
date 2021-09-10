import classes from "classnames";
import styles from "./styles.module.scss";
import useListSubscriptionBenefits from "lib/hooks/useListSubscriptionBenefits";
import { useEffect, useState } from "react";
import apiService from "react-app/src/state/utils/apiService";
import {
  LIST_SUBSCRIPTION_BENEFITS_PATH,
  PUBLIC_LIST_SUBSCRIPTION_BENEFITS_PATH,
} from "react-app/src/state/ducks/celebrity-subscription-benefits/paths";
import { useAuth } from "lib/famosos-auth";

type ActiveBenefitsCounterProps = {
  className?: string;
  celebrityId?: number;
};

function ActiveBenefitsCounter({
  className,
  celebrityId,
}: ActiveBenefitsCounterProps) {
  /* TODO: Add the correct endpoint, this is a provisional method to get total benefits count */
  const [totalItems, setTotalItems] = useState(0);
  const { totalResults, status } = useListSubscriptionBenefits({
    shouldFetch: false,
  });
  const { isLoading: isLoadingAuthentication, isAuthenticated } = useAuth();

  useEffect(() => {
    if (status === "completed" || isLoadingAuthentication) return;

    async function fetchBenefitCount() {
      try {
        const response: any = await apiService({
          method: "GET",
          path: isAuthenticated
            ? LIST_SUBSCRIPTION_BENEFITS_PATH
            : PUBLIC_LIST_SUBSCRIPTION_BENEFITS_PATH,
          params: { limit: 1, offset: 0, celebrityId },
        });
        if (!response || response?.status === "ERROR") return;
        setTotalItems(response?.data?.totalResults);
      } catch (error) {
        console.log(error?.toString?.());
      }
    }

    fetchBenefitCount();
  }, [isLoadingAuthentication, isAuthenticated]);

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
