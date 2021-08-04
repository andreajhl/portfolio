import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.scss";

function ContractTypeCardsSkeleton() {
  return (
    <div className={styles.ContractTypeCards}>
      <Skeleton width={123} height={152} className={styles.SkeletonCard} />
      <Skeleton width={123} height={152} className={styles.SkeletonCard} />
      <Skeleton width={123} height={152} className={styles.SkeletonCard} />
    </div>
  );
}

export { ContractTypeCardsSkeleton };
