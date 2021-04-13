import React from "react";
import { XIcon } from "../icons";
import styles from "./styles.module.scss";
import classes from "classnames";

type BadgeProps = {
  text: string;
  showIcon?: boolean;
  iconVariant?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
};

function Badge({
  text,
  showIcon = true,
  style,
  iconVariant = <XIcon className={styles.XIcon} />,
  className,
  onClick
}: BadgeProps) {
  return (
    <div
      className={classes(styles.Badge, className)}
      style={{
        ...style
      }}
    >
      <span className={styles.BadgeText}>{text}</span>
      {showIcon ? (
        <div className={styles.IconContainer} onClick={() => onClick()}>
          {iconVariant}
        </div>
      ) : null}
    </div>
  );
}

export default Badge;
