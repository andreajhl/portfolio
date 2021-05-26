import React from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import styles from "./styles.module.scss";
function CardContractVideoSkeleton() {
  return (
    <div
      style={{
        width: 263,
      }}
    >
      <Skeleton
        width="263px"
        height="350px"
        style={{
          borderRadius: 10,
        }}
      ></Skeleton>
      <div
        style={{
          display: "flex",
          alignItems: "center",

          marginTop: 10,
        }}
      >
        <Skeleton
          circle
          height="42px"
          width="42px"
          style={{ marginRight: 10 }}
        />{" "}
        <Skeleton height="30px" width="211px" />
      </div>
    </div>
  );
}

export { CardContractVideoSkeleton };
