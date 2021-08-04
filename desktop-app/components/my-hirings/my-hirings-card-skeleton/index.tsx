import classes from "classnames";
import getArrayOfLength from "lib/utils/getArrayOfLength";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { SkeletonText } from "../../common/helpers/skeleton-text";
import styles from "./styles.module.scss";

type MyHiringsCardSkeletonProps = {
  className?: string;
};

function MyHiringsCardSkeleton({ className = "" }: MyHiringsCardSkeletonProps) {
  return (
    <div className={classes(styles.MyHiringsCardSkeleton, className)}>
      <header className={styles.MyHiringsCardSkeletonHeader}>
        <div className={styles.MyHiringsCardSkeletonHeaderContainer}>
          <div className={styles.MyHiringsCardSkeletonHeaderHeading}>
            <h2>
              <SkeletonText>
                Video personalizado de Nombre Apellido
              </SkeletonText>
            </h2>
            <Skeleton width={108.75} height={33} />
          </div>
          <div className={styles.MyHiringsCardSkeletonHeaderInfo}>
            <span>
              <SkeletonText>Fecha de solicitud: 12/mar/2021</SkeletonText>
            </span>
            <span>
              <SkeletonText>Fecha de grabación: 16/mar/2021</SkeletonText>
            </span>
            <span>
              <SkeletonText>
                ID de seguimiento: 202011071915-8853254-7556
              </SkeletonText>
            </span>
          </div>
        </div>
      </header>
      <div className={styles.MyHiringsCardSkeletonBody}>
        <div className={styles.MyHiringsCardSkeletonBodyLeftSideContainer}>
          <div className={styles.MyHiringsCardSkeletonDetails}>
            <Skeleton circle={true} width={143} height={143} />
            <div className={styles.MyHiringsCardSkeletonInfo}>
              <div className={styles.MyHiringsCardSkeletonOccasion}>
                <Skeleton width={34} height={34} />
                <SkeletonText>Cumpleaños</SkeletonText>
              </div>
              <SkeletonText>Para: Ana</SkeletonText>
              <br />
              <SkeletonText>De: Luis</SkeletonText>
            </div>
            <div className={styles.MyHiringsCardSkeletonInstructions}>
              <label>
                <SkeletonText>Mensaje</SkeletonText>
              </label>
              <Skeleton count={3} />
            </div>
          </div>
        </div>
        <div className={styles.MyHiringsCardSkeletonBodyRightSideContainer}>
          {getArrayOfLength(3).map((_, index) => (
            <div className={styles.MyHiringsCardSkeletonBannerItem} key={index}>
              <Skeleton
                className={styles.MyHiringsCardSkeletonBannerIcon}
                width={29}
                height={29}
              />
              <Skeleton count={2} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { MyHiringsCardSkeleton };
