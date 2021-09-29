import Maybe from "desktop-app/components/common/helpers/maybe";
import {
  BasePrice,
  DiscountAmount,
  TotalPrice,
  OriginalPrice,
} from "desktop-app/components/price-summary-layouts";
import useContractHasCelebrityDiscount from "lib/hooks/useContractHasCelebrityDiscount";
import useHasAppliedCoupon from "lib/hooks/useHasAppliedCoupon";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

function ContractPriceSummary() {
  const hasAppliedCoupon = useHasAppliedCoupon();
  const contractHasCelebrityDiscount = useContractHasCelebrityDiscount();

  return (
    <div className={styles.ContractPriceSummary}>
      <Maybe it={hasAppliedCoupon || contractHasCelebrityDiscount}>
        <div className={styles.SummaryRow}>
          <span className={styles.BoldText}>
            <FormattedMessage defaultMessage="Precio Original" />
          </span>
          <div>
            <Maybe it={contractHasCelebrityDiscount}>
              <span className={styles.OriginalPrice}>
                <OriginalPrice />
              </span>
            </Maybe>
            <span className={styles.BoldText}>
              <BasePrice />
            </span>
          </div>
        </div>
      </Maybe>
      <Maybe it={hasAppliedCoupon}>
        <div className={styles.SummaryRow}>
          <span className={styles.BoldText}>
            <FormattedMessage defaultMessage="Descuento" />
          </span>
          <div>
            <DiscountAmount />
          </div>
        </div>
      </Maybe>
      <div className={styles.SummaryRow}>
        <span className={styles.BoldText}>
          <FormattedMessage defaultMessage="Total" />
        </span>
        <span className={styles.BoldText}>
          <TotalPrice />
        </span>
      </div>
    </div>
  );
}

export { ContractPriceSummary };
