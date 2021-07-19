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
  showIconBorder?: boolean;
};

function Badge({
  text,
  showIcon = true,
  style,
  iconVariant = <XIcon className={styles.XIcon} />,
  className,
  showIconBorder = true,
  onClick,
}: BadgeProps) {
  return (
    <div
      title={text}
      className={classes(styles.Badge, className)}
      style={{
        ...style,
      }}
    >
      <span className={styles.BadgeText}>{text}</span>
      {showIcon ? (
        <div
          className={classes(showIconBorder ? styles.IconContainer : "")}
          onClick={() => onClick()}
        >
          {iconVariant}
        </div>
      ) : null}
    </div>
  );
}

export default Badge;
