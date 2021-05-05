import classes from "classnames";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";

function ItemSkeleton() {
  return (
    <div className={classes(styles.PaymentMethodItem, styles.ItemSkeleton)}>
      <Skeleton width={58} height={38} />
      <Skeleton width={127} />
      <Skeleton
        className={styles.RemoveButtonSkeleton}
        width={14}
        height={16}
      />
    </div>
  );
}

export { ItemSkeleton };
