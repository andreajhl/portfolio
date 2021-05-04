import { ReactNode } from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import Maybe from "../maybe";
import styles from "./styles.module.scss";

type SkeletonTextProps = {
  isLoading?: boolean;
  children?: ReactNode;
} & SkeletonProps;

function SkeletonText({
  isLoading = true,
  children,
  ...skeletonProps
}: SkeletonTextProps) {
  return (
    <Maybe it={isLoading} orElse={children}>
      <div className={styles.Wrapper}>
        <span className={styles.ShadowText} aria-hidden="true">
          {children}
        </span>
        <Skeleton {...skeletonProps} />
      </div>
    </Maybe>
  );
}

export { SkeletonText };
