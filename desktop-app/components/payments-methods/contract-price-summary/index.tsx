import Maybe from "desktop-app/components/common/helpers/maybe";
import {
  BasePrice,
  DiscountAmount,
  TotalPrice,
  OriginalPrice,
  DiscountStarsSelectedPrice,
} from "desktop-app/components/price-summary-layouts";
import useContractHasCelebrityDiscount from "lib/hooks/useContractHasCelebrityDiscount";
import useHasAppliedCoupon from "lib/hooks/useHasAppliedCoupon";
import Collapse from "react-bootstrap/Collapse";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import { useHasStarsDiscount } from "../../../../lib/hooks/useHasStarsDiscount";

function ContractPriceSummary() {
  const hasAppliedCoupon = useHasAppliedCoupon();
  const contractHasCelebrityDiscount = useContractHasCelebrityDiscount();
  const hasStarsDiscount = useHasStarsDiscount();

  const hasDiscount =
    hasAppliedCoupon || contractHasCelebrityDiscount || hasStarsDiscount;

  return (
    <div className={styles.ContractPriceSummary}>
      <Collapse in={hasDiscount} unmountOnExit>
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
      </Collapse>
      <Collapse in={hasAppliedCoupon} unmountOnExit>
        <div className={styles.SummaryRow}>
          <span className={styles.BoldText}>
            <FormattedMessage defaultMessage="Descuento" />
          </span>
          <div>
            <DiscountAmount />
          </div>
        </div>
      </Collapse>
      <Collapse in={hasStarsDiscount} unmountOnExit>
        <div className={styles.SummaryRow}>
          <span className={styles.BoldText}>
            <FormattedMessage defaultMessage="Estrellas" />
          </span>
          <span className={styles.StarSelected}>
            <DiscountStarsSelectedPrice />
          </span>
        </div>
      </Collapse>
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
