import Maybe from "../../helpers/maybe";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";

type CelebrityCardSkeletonProps = {
  thumbnailWidth?: number | string;
  thumbnailHeight?: number | string;
  showPrice?: boolean;
};

function CelebrityCardSkeleton({
  thumbnailWidth = 170,
  thumbnailHeight = 210,
  showPrice = true,
}: CelebrityCardSkeletonProps) {
  return (
    <div className={styles.CelebrityCard} style={{ width: thumbnailWidth }}>
      <div className={styles.CelebrityCardThumbnail}>
        <Skeleton height={thumbnailHeight} width={thumbnailWidth} />
      </div>
      <div className={styles.CelebrityCardInfo}>
        <h4 className={styles.CelebrityCardHeading}>
          <Skeleton height={13} width={20} className="mr-2" />
          <Skeleton height={14} width={100} />
        </h4>
        <p className={styles.CelebrityCardHashtags}>
          <Skeleton width={80} />
          <Skeleton width={60} />
        </p>
        <Maybe it={showPrice}>
          <p className={styles.CelebrityCardPrice}>
            <Skeleton width={60} />
          </p>
        </Maybe>
      </div>
    </div>
  );
}

export { CelebrityCardSkeleton };
