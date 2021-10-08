import styles from "./styles.module.scss";
import classes from "classnames";
import Skeleton from "react-loading-skeleton";
import { ReferralsStarIcon } from "desktop-app/components/common/icons";

type SkeletonProps = {
  className?: string;
};

function ReferralsListItemSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={classes(
        styles.ReferralsListItem,
        styles.ReferralsListItemSkeleton,
        className
      )}
    >
      <Skeleton width={66} height={66} circle />
      <span className={styles.ReferralsListItemUserFullName}>
        <Skeleton width="7em" />
      </span>
      <ReferralsStarIcon
        color="#eee"
        className={styles.ReferralsListItemStar}
        width={44}
        height={44}
      />
    </div>
  );
}

export { ReferralsListItemSkeleton };
