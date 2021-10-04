import { ContractInfo } from "desktop-app/components/payments-methods/contract-info";
import styles from "./styles.module.scss";
import { PaymentsMethodsSelectorCard } from "desktop-app/components/payments-methods/payments-methods-selector-card";
import { PaymentMethodsSelectorCardSkeleton } from "desktop-app/components/payments-methods/payments-methods-selector-card/skeleton";
import { WhatHappensBeforeBanner } from "desktop-app/components/payments-methods/what-happens-before-banner";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ContractInfoSkeleton } from "desktop-app/components/payments-methods/contract-info/skeleton";
import ContractToPayType from "desktop-app/types/contractToPayType";

type PaymentMethodsLayoutAProps = {
  isCompleted: boolean;
  isLoading: boolean;
  contract: ContractToPayType;
};

export function PaymentMethodsLayoutA({
  isCompleted,
  isLoading,
  contract,
}: PaymentMethodsLayoutAProps) {
  return (
    <div className={`container ${styles.PaymentMethodsPageContent}`}>
      <div className={styles.PaymentMethodsPurchaseForm}>
        <Maybe it={isCompleted && !isLoading} orElse={<ContractInfoSkeleton />}>
          <ContractInfo
            contract_reference={contract.reference}
            celebrityAvatar={contract.celebrity_avatar}
            celebrityFullName={contract.celebrity_full_name}
            occasion={contract.occasion}
            deliveryTo={contract.delivery_to}
            deliveryFrom={contract.delivery_from}
            instructions={contract.instructions}
            price={contract.price}
            original_price={contract.original_price}
            celebrityDiscountPercentage={contract.discount_percentage}
            priceBeforeCelebrityDiscount={contract.original_price}
          />
        </Maybe>
        <Maybe
          it={isCompleted && !isLoading}
          orElse={<PaymentMethodsSelectorCardSkeleton />}
        >
          <PaymentsMethodsSelectorCard
            contractReference={contract.reference}
            celebrityId={contract.celebrity_id}
          />
        </Maybe>
      </div>
      <WhatHappensBeforeBanner
        className={styles.WhatHappensBeforeBannerModifier}
        direction="column"
      />
    </div>
  );
}
