import React from "react";
import Skeleton from "react-loading-skeleton";
import classes from "classnames";
import styles from "./styles.module.scss";

function PaymentMethodsSelectorCardSkeleton() {
  return (
    <div className={styles.PaymentsMethodsSelectorCard}>
      <h2 className={styles.PaymentMethodFormTitle}>
        1. Datos de la persona que realiza el pago.
      </h2>
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
        <h2 className={styles.PaymentMethodFormTitle}>
          2. Selecciona un Método de Pago.
        </h2>
        <div className={styles.SkeletonPaymentMethods}>
          <Skeleton height={45} className={styles.SkeletonPaymentMethod} />
          <Skeleton height={45} className={styles.SkeletonPaymentMethod} />
        </div>
      </div>
    </div>
  );
}

export { PaymentMethodsSelectorCardSkeleton };
