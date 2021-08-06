import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";

const VideoFooterSkeleton = () => {
  return (
    <div className={styles.CelebrityInfo}>
      <Skeleton
        width={42}
        height={42}
        circle
        className={styles.CelebrityAvatar}
      />
      <Skeleton width={50} />
    </div>
  );
};

export default VideoFooterSkeleton;
