import styles from "./styles.module.scss";
import classes from "classnames";
import Skeleton from "react-loading-skeleton";

function WizardTopNavigationSkeleton({ className }: { className?: string }) {
  return (
    <div className={classes(styles.WizardTopNavigation, className)}>
      <div className={styles.WizardStepsListSkeleton}>
        <Skeleton width={11} height={11} circle />
        <Skeleton width={11} height={11} circle />
        <Skeleton width={11} height={11} circle />
      </div>
    </div>
  );
}

export { WizardTopNavigationSkeleton };
