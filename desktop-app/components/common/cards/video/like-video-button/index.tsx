import { LikeButton } from "desktop-app/components/common/button/like";
import classes from "classnames";
import styles from "./styles.module.scss";
import { CSSProperties } from "react";

type LikeVideoButtonProps = {
  onClick: () => void;
  isLiked: boolean;
  backgroundColor?: CSSProperties["backgroundColor"];
};

function LikeVideoButton({
  onClick,
  isLiked,
  backgroundColor: backgroundColorFromProps,
}: LikeVideoButtonProps) {
  const backgroundColor = backgroundColorFromProps || "white"; // Para evitar utilizar string vaciás.
  return (
    <button
      onClick={onClick}
      className={classes("btn btn-outline", styles.ActionButton)}
      style={{ backgroundColor }}
    >
      <LikeButton
        isFavorite={isLiked}
        className={classes(
          styles.LikeButtonModifier,
          backgroundColor !== "white" && styles.LikeButtonLight
        )}
      />
    </button>
  );
}

export default LikeVideoButton;
