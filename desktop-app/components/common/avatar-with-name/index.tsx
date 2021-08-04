import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
import { Link } from "../routing/link";
import { getCelebrityProfilePath } from "constants/paths";
import { TextWithOverflow, parentElementClass } from "../text-with-overflow";

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
      title={name}
      className={classes(
        styles.AvatarWithNameContainer,
        parentElementClass,
        className
      )}
    >
      <img className={styles.AvatarImg} src={src} alt={imgAlt} />
      <TextWithOverflow text={name} textClassName={styles.AvatarName} />
    </Link>
  );
}

export default AvatarWithName;
