import React, { MouseEventHandler } from "react";
import { getCelebrityProfilePath } from "constants/paths";
import { Link } from "desktop-app/components/common/routing/link";
import styles from "./styles.module.scss";
import {
  TextWithOverflow,
  parentElementClass,
} from "../../../text-with-overflow";
import { defineMessages, useIntl } from "react-intl";
import LazyLoadingImage from "react-app/src/components/common/lazy-loading-image";

const messages = defineMessages({
  linkTitle: {
    defaultMessage: "Ir al perfil de {fullName}",
  },
});

type FooterProps = {
  avatarURL: string;
  fullName: string;
  userName: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const VideoFooter = ({
  avatarURL,
  fullName,
  userName,
  onClick,
}: FooterProps) => {
  const { formatMessage } = useIntl();

  const linkTitle = formatMessage(messages.linkTitle, { fullName });

  return (
    <Link
      title={linkTitle}
      className={`${styles.CelebrityInfo} ${parentElementClass}`}
      href={getCelebrityProfilePath(userName)}
      onClick={onClick}
    >
      <LazyLoadingImage
        placeholderSrc="/assets/img/avatar-blank.png"
        src={avatarURL}
        alt={fullName}
        height="42px"
        width="42px"
        style={{ objectFit: "cover" }}
        className={styles.CelebrityAvatar}
      />
      <TextWithOverflow text={fullName} textClassName={styles.CelebrityName} />
    </Link>
  );
};

export default VideoFooter;
