import React from "react";
import { getCelebrityProfilePath } from "constants/paths";
import { Link } from "desktop-app/components/common/routing/link";
import styles from "./styles.module.scss";
import {
  TextWithOverflow,
  parentElementClass
} from "desktop-app/components/text-with-overflow";
type FooterProps = {
  avatarURL: string;
  fullName: string;
  userName: string;
};
const VideoFooter = ({ avatarURL, fullName, userName }: FooterProps) => {
  return (
    <Link
      title={`Ir al perfil de ${fullName}`}
      className={`${styles.CelebrityInfo} ${parentElementClass}`}
      href={getCelebrityProfilePath(userName)}
    >
      <img className={styles.CelebrityAvatar} src={avatarURL} alt={fullName} />
      <TextWithOverflow text={fullName} textClassName={styles.CelebrityName} />
    </Link>
  );
};

export default VideoFooter;
