import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.scss";

function ContractDataFormSkeleton() {
  return (
    <form className={styles.ContractDataForm} method="post">
      <div className={styles.ContractDataFormEditButtonWrapper}>
        <Skeleton width={20} height={20} />
      </div>
      <div className={styles.ContractDataFormDeliveryInputs}>
        <Skeleton width={120} height={14} />
        <Skeleton width={90} height={14} />
      </div>
      <div>
        <Skeleton
          className={styles.ContractDataFormInstructionsLabel}
          width={95}
          height={14}
        />
        <Skeleton height={14} />
        <Skeleton width="80%" height={14} />
        <Skeleton width="75%" height={14} />
      </div>
    </form>
  );
}

export { ContractDataFormSkeleton };
