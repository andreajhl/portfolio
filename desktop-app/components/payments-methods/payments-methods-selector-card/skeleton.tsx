import React from "react";
import Skeleton from "react-loading-skeleton";
import classes from "classnames";
import styles from "./styles.module.scss";

function PaymentMethodsSelectorCardSkeleton() {
  return (
    <div className={styles.PaymentsMethodsSelectorCard}>
      <Skeleton
        height={25}
        width={395}
        className={styles.PaymentMethodFormTitle}
      />
      <div
        className={classes(
          styles.PaymentMethodFormSection,
          styles.SkeletonForm
        )}
        tabIndex={-1}
      >
        <Skeleton height={40} className={styles.SkeletonInput} />
        <Skeleton height={40} className={styles.SkeletonInput} />
        <Skeleton height={40} className={styles.SkeletonInput} />
      </div>
      <div className={styles.PaymentMethodFormSection}>
        <Skeleton
          height={25}
          width={330}
          className={styles.PaymentMethodFormTitle}
        />
        <div className={styles.SkeletonPaymentMethods}>
          <Skeleton height={45} className={styles.SkeletonPaymentMethod} />
          <Skeleton height={45} className={styles.SkeletonPaymentMethod} />
        </div>
      </div>
    </div>
  );
}

export { PaymentMethodsSelectorCardSkeleton };
