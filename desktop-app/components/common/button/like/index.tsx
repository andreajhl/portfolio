import styles from "./styles.module.scss";
import { HeartIcon } from "../../icons";
import classes from "classnames";

function noop() {}

export type LikeButtonProps = {
  isFavorite?: boolean;
  filledImageSource?: string;
  className?: string;
  isFavoriteClassName?: string;
  width?: string;
  height?: string;
  onClick?: (event: any) => void;
};

const LikeButton = ({
  isFavorite = false,
  isFavoriteClassName = "",
  className = "",
  width = "15px",
  height = width,
  onClick = noop,
}: LikeButtonProps) => {
  return (
    <HeartIcon
      onClick={onClick}
      style={{ width, height }}
      className={classes(
        styles.LikeButton,
        className,
        isFavorite && classes(styles.LikeButtonIsFavorite, isFavoriteClassName)
      )}
    />
  );
};

export { LikeButton };
