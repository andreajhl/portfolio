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
  iconButtonVariant?: React.ReactNode;
  onClick?: typeof noop;
  disabled?: boolean;
};

function DirectionButton({
  direction = "right",
  className = "",
  iconButtonVariant,
  onClick = noop,
  style = defaultButtonsStyle,
  disabled
}: DirectionButtonProps) {
  const width = style?.size || defaultButtonStylesSize;
  const appliedStyles = style;
  delete appliedStyles?.size;
  return (
    <button
      disabled={disabled}
      type="button"
      className={`${styles.DirectionButton} ${className}`}
      onClick={onClick}
      style={{ ...appliedStyles, width, height: width }}
    >
      {iconButtonVariant ? (
        iconButtonVariant
      ) : (
        <i className={`fa fa-chevron-${direction}`} />
      )}
    </button>
  );
}

export default DirectionButton;
