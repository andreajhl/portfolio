import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.scss";
import classes from "classnames";

function ContractTypeCardsSkeleton() {
  return (
    <div
      className={classes(
        styles.ContractTypeCards,
        styles.ContractTypeCardsSkeleton
      )}
    >
      <Skeleton width="100%" height={152} className={styles.SkeletonCard} />
      <Skeleton width="100%" height={152} className={styles.SkeletonCard} />
      <Skeleton width="100%" height={152} className={styles.SkeletonCard} />
    </div>
  );
}

export { ContractTypeCardsSkeleton };
