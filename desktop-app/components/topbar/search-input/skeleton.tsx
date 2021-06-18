import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.scss";

function SkeletonItem() {
  return (
    <div className={styles.PreviewResultItem}>
      <Skeleton
        circle={true}
        height={58}
        width={58}
        className={styles.AvatarCelebrity}
      />
      <div className={styles.CelebrityInfo}>
        <Skeleton
          height={14}
          width={150}
          className={styles.CelebrityName}
        ></Skeleton>
        <Skeleton
          height={14}
          width={60}
          className={styles.CelebrityCategory}
        ></Skeleton>
      </div>
    </div>
  );
}

function SkeletonTopbarSearchInput() {
  return (
    <>
      <SkeletonItem></SkeletonItem>
      <SkeletonItem></SkeletonItem>
      <SkeletonItem></SkeletonItem>
    </>
  );
}

export { SkeletonTopbarSearchInput };
