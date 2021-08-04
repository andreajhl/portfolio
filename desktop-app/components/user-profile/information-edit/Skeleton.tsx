import LogoutButton from "react-app/src/components/containers/logout-button/logout-button";
import Skeleton from "react-loading-skeleton";
import classes from "classnames";
import styles from "./styles.module.scss";
import { SkeletonText } from "desktop-app/components/common/helpers/skeleton-text";

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
          }}
        >
          <div
            style={{
              width: 128,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Skeleton circle={true} height={128} width={128} />
            <SkeletonText>Agregar foto</SkeletonText>
          </div>
        </div>
        <div className={styles.ConfigOptionsPersonalData}>
          <div className={styles.GridOfInputs}>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
              }}
            >
              <Skeleton height={19} width={53} />
              <Skeleton width={270} height={30} />
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
              }}
            >
              <Skeleton height={19} width={53} />
              <Skeleton width={270} height={30} />
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
              }}
            >
              <Skeleton height={19} width={53} />
              <Skeleton width={270} height={30} />
            </div>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
              }}
            >
              <Skeleton height={19} width={53} />
              <Skeleton width={270} height={30} />
            </div>
          </div>

          <div className={styles.OptionsItems}>
            <Skeleton width={270} height={20} />
          </div>
        </div>
        <div className={styles.LogoutButtonWrapper}>
          <LogoutButton className={classes("btn", styles.LogoutButton)}>
            Cerrar Sesión
          </LogoutButton>
        </div>
      </div>
    </div>
  );
}

export { SkeletonItems };
