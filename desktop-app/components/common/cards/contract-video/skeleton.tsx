import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.scss";

function CardContractVideoSkeleton() {
  return (
    <div className={styles.CardContractVideoSkeleton}>
      <Skeleton
        width="263px"
        height="350px"
        className={styles.VideoElementSkeleton}
      />
      <div className={styles.VideoFooterSkeleton}>
        <Skeleton
          circle
          height="42px"
          width="42px"
          className={styles.VideoFooterAvatarSkeleton}
        />
        <Skeleton height="30px" width="211px" />
      </div>
    </div>
  );
}

export { CardContractVideoSkeleton };
