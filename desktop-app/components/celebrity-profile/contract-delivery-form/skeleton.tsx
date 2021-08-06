import { ContractTypeCardsSkeleton } from "desktop-app/components/common/cards/contract-type/skeleton";
import { WizardTopNavigationSkeleton } from "desktop-app/components/common/wizard-top-navigation/skeleton";
import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.scss";

function ContractDeliveryFormSkeleton() {
  return (
    <div className={styles.VideoDeliveryForm}>
      <WizardTopNavigationSkeleton />
      <div className={styles.VideoDeliveryFormHeader}>
        <h3>
          <Skeleton width={215} height={22} />
          <Skeleton width={200} height={22} />
        </h3>
      </div>
      <ContractTypeCardsSkeleton />
      <div className={styles.InputFieldElements}>
        <Skeleton height={33} />
      </div>
      <Skeleton className={styles.SkeletonSubmitButton} height={50} />
    </div>
  );
}

export { ContractDeliveryFormSkeleton };
