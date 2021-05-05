import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.scss";
function SkeletonItems() {
  return (
    <div className={styles.UserInformationConfigContainer}>
      <h2 className={styles.UserInformationConfigTitle}>
        Información de tu cuenta
      </h2>
      <div className={styles.ConfigOptionsSections}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton circle={true} height={128} width={128} />
        </div>
        <div className={styles.ConfigOptionsPersonalData}>
          <div className={styles.OptionsItems}>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
              }}
            >
              <Skeleton height={19} width={53} />
              <Skeleton width={270} height={37} />
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
              }}
            >
              <Skeleton height={19} width={53} />
              <Skeleton width={270} height={37} />
            </div>
          </div>
          <div className={styles.OptionsItems}>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
              }}
            >
              <Skeleton height={19} width={53} />
              <Skeleton width={270} height={37} />
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
              }}
            >
              <Skeleton height={19} width={53} />
              <Skeleton width={270} height={37} />
            </div>
          </div>

          <div className={styles.OptionsItems}>
            <Skeleton width={270} height={37} />
          </div>
        </div>
      </div>
    </div>
  );
}

export { SkeletonItems };
