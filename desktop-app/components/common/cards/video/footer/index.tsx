import React from "react";
import { getCelebrityProfilePath } from "constants/paths";
import { Link } from "desktop-app/components/common/routing/link";
import styles from "./styles.module.scss";
import {
  TextWithOverflow,
  parentElementClass,
} from "../../../text-with-overflow";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  linkTitle: {
    defaultMessage: "Ir al perfil de {fullName}",
  },
});

type FooterProps = {
  avatarURL: string;
  fullName: string;
  userName: string;
};

const VideoFooter = ({ avatarURL, fullName, userName }: FooterProps) => {
  const { formatMessage } = useIntl();

  const linkTitle = formatMessage(messages.linkTitle, { fullName });

  return (
    <Link
      title={linkTitle}
      className={`${styles.CelebrityInfo} ${parentElementClass}`}
      href={getCelebrityProfilePath(userName)}
    >
      <img className={styles.CelebrityAvatar} src={avatarURL} alt={fullName} />
      <TextWithOverflow text={fullName} textClassName={styles.CelebrityName} />
    </Link>
  );
};

export default VideoFooter;
