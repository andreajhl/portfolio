import styles from "./styles.module.scss";
import classes from "classnames";
import getArrayOfLength from "lib/utils/getArrayOfLength";
import { SkeletonText } from "desktop-app/components/common/helpers/skeleton-text";
import Skeleton from "react-loading-skeleton";

function CelebritiesFavoritesEditReelSkeleton() {
  return (
    <>
      <h2 className={styles.ContainerTitle}>Famosos Favoritos</h2>
      <div className={styles.SkeletonList}>
        {getArrayOfLength(3).map((_, index) => (
          <div className={styles.CelebrityFavoriteAvatar} key={index}>
            <Skeleton
              className={styles.SkeletonAvatarImg}
              width={88}
              height={88}
              circle
            />
            <SkeletonText>Eliminar</SkeletonText>
          </div>
        ))}
      </div>
    </>
  );
}

export { CelebritiesFavoritesEditReelSkeleton };
