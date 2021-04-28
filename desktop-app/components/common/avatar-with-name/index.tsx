import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";

type AvatarWithNameProps = {
  src: string;
  imgAlt: string;
  name: string;
  className?: string;
  onClick?: () => void;
};

function AvatarWithName({
  src,
  name,
  imgAlt,
  className = "",
  onClick,
}: AvatarWithNameProps) {
  return (
    <div
      onClick={onClick}
      className={classes(styles.AvatarWithNameContainer, className)}
    >
      <img className={styles.AvatarImg} src={src} alt={imgAlt} />
      <span className={classes("text-with-ellipsis", styles.AvatarName)}>
        {name}
      </span>
    </div>
  );
}

export default AvatarWithName;
