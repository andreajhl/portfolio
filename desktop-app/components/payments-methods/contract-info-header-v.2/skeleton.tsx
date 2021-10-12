import { ContractOccasionSkeleton } from "desktop-app/components/common/widgets/contract-occasion/skeleton";
import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.scss";

function ContractInfoHeaderSkeleton() {
  return (
    <>
      <div className={styles.ContractInfoCelebrityInfo}>
        <Skeleton
          className={styles.AvatarSkeleton}
          height={102}
          width={102}
          circle
        />
        <div className={styles.ContractInfoTitle}>
          <Skeleton height={24} width={200} />
          <br />
          <Skeleton height={24} width={150} />
        </div>
      </div>
      <ContractOccasionSkeleton />
    </>
  );
}

export { ContractInfoHeaderSkeleton };
