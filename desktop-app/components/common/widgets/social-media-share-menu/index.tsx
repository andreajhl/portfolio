import useCopyToClipboard from "lib/hooks/useCopyToClipboard";
import {
  getFacebookShareLink,
  getMailShareLink,
  getTelegramShareLink,
  getTwitterSharingLink,
  getWhatsappSharingLink,
} from "lib/utils/getSocialMediaLink";
import { ReactNode } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { FormattedMessage } from "react-intl";
import {
  FacebookIcon,
  HyperlinkIcon,
  MailIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "../../icons";
import styles from "./styles.module.scss";
import classes from "classnames";

type MenuItemType = {
  id: string;
  icon?: ReactNode;
  label: ReactNode;
  to: string;
};

function getSocialMedias(
  link: string,
  message: string,
  mailSubject: string
): MenuItemType[] {
  return [
    {
      id: "mail",
      icon: <MailIcon />,
      label: <FormattedMessage defaultMessage="Compartir por e-mail" />,
      to: getMailShareLink(mailSubject, message),
    },
    {
      id: "whatsapp",
      icon: <WhatsappIcon />,
      label: <FormattedMessage defaultMessage="Compartir por Whatsapp" />,
      to: getWhatsappSharingLink(message),
    },
    {
      id: "facebook",
      icon: <FacebookIcon />,
      label: <FormattedMessage defaultMessage="Compartir por Facebook" />,
      to: getFacebookShareLink(link),
    },
    {
      id: "twitter",
      icon: <TwitterIcon />,
      label: <FormattedMessage defaultMessage="Compartir por Twitter" />,
      to: getTwitterSharingLink(message, link, "contratafamosos"),
    },
    {
      id: "telegram",
      icon: <TelegramIcon />,
      label: <FormattedMessage defaultMessage="Compartir por Telegram" />,
      to: getTelegramShareLink(link, message),
    },
  ];
}

const toMenuItemLink = (
  onClick: (item: MenuItemType) => void,
  className?: string
) => ({ id, to, icon, label }) => {
  return (
    <a
      href={to}
      className={classes(styles.SocialMediaShareMenuItem, className)}
      key={id}
      target="_blank"
      rel="noreferrer"
      onClick={() => onClick?.({ id, to, icon, label })}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

export type SocialMediaShareMenuProps = {
  className?: string;
  itemClassName?: string;
  link: string;
  message: string;
  mailSubject: string;
  onClickItem?: (item: MenuItemType) => void;
};

function SocialMediaShareMenu({
  className,
  itemClassName,
  link,
  message,
  mailSubject,
  onClickItem,
}: SocialMediaShareMenuProps) {
  const [copyLink, hasCopiedLink] = useCopyToClipboard();
  const socialMedias = getSocialMedias(link, message, mailSubject);

  function copyLinkToClipboard() {
    copyLink(link);
    onClickItem?.({ id: "copy-to-clipboard", to: link, label: "Copy Link" });
  }

  return (
    <div className={classes(styles.SocialMediaShareMenu, className)}>
      <div
        tabIndex={0}
        className={classes(styles.SocialMediaShareMenuItem, itemClassName)}
        onClick={copyLinkToClipboard}
      >
        <Maybe
          it={hasCopiedLink}
          orElse={
            <>
              <HyperlinkIcon />
              <span>
                <FormattedMessage defaultMessage="Copiar enlace" />
              </span>
            </>
          }
        >
          <i className={classes("fa fa-check-circle", styles.CheckIcon)} />
          <span>
            <FormattedMessage defaultMessage="Enlace copiado" />
          </span>
        </Maybe>
      </div>
      {socialMedias.map(toMenuItemLink(onClickItem, itemClassName))}
    </div>
  );
}

export { SocialMediaShareMenu };
