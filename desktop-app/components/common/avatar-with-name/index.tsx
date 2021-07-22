import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
import { Link } from "../routing/link";
import { getCelebrityProfilePath } from "constants/paths";

type AvatarWithNameProps = {
  src: string;
  imgAlt: string;
  name: string;
  className?: string;
  username: string;
  onClick?: () => void;
};

function AvatarWithName({
  src,
  name,
  imgAlt,
  className = "",
  username,
  onClick,
}: AvatarWithNameProps) {
  return (
    <Link
      href={getCelebrityProfilePath(username)}
      onClick={onClick}
      className={classes(styles.AvatarWithNameContainer, className)}
    >
      <img className={styles.AvatarImg} src={src} alt={imgAlt} />
      <span className={classes("text-with-ellipsis", styles.AvatarName)}>
        {name}
      </span>
    </Link>
  );
}

export default AvatarWithName;
