import { CSSProperties } from "react";
import styles from "./styles.module.scss";

function noop() {}

export type ButtonStyle = CSSProperties & {
  size: number;
};

const defaultButtonStylesSize = 35;

const defaultButtonsStyle: ButtonStyle = {
  size: defaultButtonStylesSize,
  top: "1rem"
};

type DirectionButtonProps = {
  direction?: "right" | "left";
  className?: string;
  style?: ButtonStyle;
  onClick?: typeof noop;
};

function DirectionButton({
  direction = "right",
  className = "",
  onClick = noop,
  style = defaultButtonsStyle
}: DirectionButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.DirectionButton} ${className}`}
      onClick={onClick}
      style={style}
    >
      <i className={`fa fa-caret-${direction}`} />
    </button>
  );
}

export default DirectionButton;
