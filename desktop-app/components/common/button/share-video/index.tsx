import classes from "classnames";
import styles from "./styles.module.scss";
import { ReactNode, useEffect, useState } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";
import {
  FacebookIcon,
  HyperlinkIcon,
  MailIcon,
  TwitterIcon,
  WhatsappIcon,
} from "desktop-app/components/common/icons";
import {
  getFacebookShareLink,
  getMailShareLink,
  getTwitterSharingLink,
  getWhatsappSharingLink,
} from "lib/utils/getSocialMediaLink";
import copyTextToClipboard from "lib/utils/copyTextToClipboard";
import { Dropdown } from "desktop-app/components/common/button/dropdown";
import getWindow from "react-app/src/utils/getWindow";
import { getHiringPreviewPath } from "constants/paths";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  shareMessage: {
    defaultMessage: "¡Hola! Mira este video de Famosos.com {link}",
  },
  mailSubject: {
    defaultMessage: "Me gustaría compartirte este video de Famosos.com",
  },
});

type ShareVideoButtonProps = {
  buttonClassName?: string;
  contractReference: string;
  iconColor?: string;
  children: ReactNode;
};

type MenuItemType = {
  id: string;
  icon?: ReactNode;
  label: ReactNode;
  to: string;
};

const toMenuItem = ({ id, to, icon, label }) => (
  <a
    href={to}
    className={styles.ShareDropdownItem}
    key={id}
    target="_blank"
    rel="noreferrer"
  >
    {icon}
    <span>{label}</span>
  </a>
);

function ShareVideoButton({
  buttonClassName = "",
  children,
  contractReference,
}: ShareVideoButtonProps) {
  const { formatMessage } = useIntl();
  const link = `${getWindow().location.origin}${getHiringPreviewPath(
    contractReference
  )}`;

  const message = formatMessage(messages.shareMessage, { link });
  const mailSubject = formatMessage(messages.mailSubject);

  const socialMedias: MenuItemType[] = [
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
  ];

  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  function copyLinkToClipboard() {
    copyTextToClipboard(link);
    setHasCopiedLink(true);
  }

  useEffect(() => {
    if (!hasCopiedLink) return;

    const timeout = setTimeout(() => setHasCopiedLink(false), 5000);

    return () => clearTimeout(timeout);
  }, [hasCopiedLink]);

  return (
    <Dropdown
      menuPosition="top right"
      menuClassName={styles.ShareDropdownMenu}
      buttonChildren={children}
      buttonClassName={buttonClassName}
    >
      <div
        tabIndex={0}
        className={styles.ShareDropdownItem}
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
      {socialMedias.map(toMenuItem)}
    </Dropdown>
  );
}

export { ShareVideoButton };
