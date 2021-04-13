import React from "react";
import { XIcon } from "../icons";
import styles from "./styles.module.scss";
type BadgeProps = {
  text: string;
  showIcon?: boolean;
  iconVariant?: React.ReactNode;
  onClick?: () => void;
};

function Badge({
  text,
  showIcon = true,
  iconVariant = <XIcon className={styles.XIcon} />,
  onClick
}: BadgeProps) {
  return (
    <div className={styles.Badge}>
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
