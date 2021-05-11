import { LikeButton } from "desktop-app/components/common/button/like";
import classes from "classnames";
import styles from "./styles.module.scss";

type LikeVideoButtonProps = {
  onClick: () => void;
  isLiked: boolean;
};

function LikeVideoButton({ onClick, isLiked }: LikeVideoButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classes("btn btn-outline", styles.ActionButton)}
    >
      <LikeButton className={styles.LikeButtonModifier} />
    </button>
  );
}

export default LikeVideoButton;
