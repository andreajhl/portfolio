import { LikeButton } from "../../common/button/like";
import classes from "classnames";
import styles from "./styles.module.scss";
import useCelebrityFavorite from "../../../../lib/hooks/useCelebrityFavorite";

type CelebrityFavoriteButtonProps = {
  celebrityId: number;
  className?: string;
};

function CelebrityFavoriteButton({
  celebrityId,
  className = "",
}: CelebrityFavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useCelebrityFavorite(celebrityId);
  return (
    <LikeButton
      onClick={toggleFavorite}
      isFavorite={isFavorite}
      isFavoriteClassName={styles.IsFavorite}
      className={classes(styles.CelebrityFavoriteButton, className)}
    />
  );
}

export { CelebrityFavoriteButton };
