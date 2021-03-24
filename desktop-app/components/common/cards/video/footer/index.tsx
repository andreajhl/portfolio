import React from "react";
import { CELEBRITY_PROFILE } from "constants/paths";
import { Link } from "desktop-app/components/common/routing/link";
import styles from "./styles.module.scss";
type FooterProps = {
  avatarURL: string;
  fullName: string;
  userName: string;
};
const VideoFooter = ({ avatarURL, fullName, userName }: FooterProps) => {
  return (
    <div className={styles.CelebrityInfo}>
      <img
        className={styles.CelebrityAvatar}
        src={avatarURL}
        alt="Avatar de Famoso"
      ></img>
      <span className={`${styles.CelebrityName} text-with-ellipsis`}>
        <Link href={CELEBRITY_PROFILE.replace(":celebrity_username", userName)}>
          {fullName}
        </Link>
      </span>
    </div>
  );
};

export default VideoFooter;
