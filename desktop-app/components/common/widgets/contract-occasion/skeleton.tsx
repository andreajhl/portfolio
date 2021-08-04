import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.scss";

function ContractOccasionSkeleton() {
  return (
    <div className={`${styles.ContractOccasion}`}>
      <div className={styles.ContractOccasionIcon}></div>
      <Skeleton height={14} width={90} />
    </div>
  );
}

export { ContractOccasionSkeleton };
