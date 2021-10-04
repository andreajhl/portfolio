import styles from "./styles.module.scss";
import { PaymentMethodsSelectorCardSkeleton } from "desktop-app/components/payments-methods/payments-methods-selector-card/skeleton";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ContractInfoSkeleton } from "desktop-app/components/payments-methods/contract-info/skeleton";
import ContractToPayType from "desktop-app/types/contractToPayType";
import { ContractInfoV2 } from "../contract-info-v.2";
import PaymentsMethodsSelectorCardV2 from "../payments-methods-selector-card-v.2";
import { PaymentSecureBannerV2 } from "../payment-secure-banner-v.2";

type PaymentMethodsLayoutBProps = {
  isCompleted: boolean;
  isLoading: boolean;
  contract: ContractToPayType;
};

function PaymentMethodsLayoutB({
  isCompleted,
  isLoading,
  contract,
}: PaymentMethodsLayoutBProps) {
  return (
    <div className={`container ${styles.PaymentMethodsPageContent}`}>
      <div className={styles.PaymentMethodsPurchaseForm}>
        <Maybe it={isCompleted && !isLoading} orElse={<ContractInfoSkeleton />}>
          <ContractInfoV2
            celebrityAvatar={contract.celebrity_avatar}
            celebrityFullName={contract.celebrity_full_name}
            occasion={contract.occasion}
            price={contract.price}
            star={5}
            original_price={contract.original_price}
            celebrityDiscountPercentage={contract.discount_percentage}
            priceBeforeCelebrityDiscount={contract.original_price}
            contractReference={contract.reference}
          />
        </Maybe>
        <Maybe
          it={isCompleted && !isLoading}
          orElse={<PaymentMethodsSelectorCardSkeleton />}
        >
          <PaymentsMethodsSelectorCardV2
            contractPrice={contract.price}
            contractReference={contract.reference}
            celebrityId={contract.celebrity_id}
          />
        </Maybe>
        <PaymentSecureBannerV2
          className={styles.PaymentMethodsLayoutBSecureBanner}
        />
      </div>
    </div>
  );
}

export { PaymentMethodsLayoutB };
