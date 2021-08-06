import classes from "classnames";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";
import { SkeletonText } from "desktop-app/components/common/helpers/skeleton-text";

function ItemSkeleton() {
  return (
    <div className={classes(styles.PaymentMethodItem, styles.ItemSkeleton)}>
      <Skeleton className={styles.ItemSkeletonBrand} width={58} height={38} />
      <SkeletonText>**********1234</SkeletonText>
      <Skeleton
        className={styles.RemoveButtonSkeleton}
        width={14}
        height={16}
      />
    </div>
  );
}

export { ItemSkeleton };
