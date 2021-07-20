import { Dropdown } from "../../common/button/dropdown";
import classes from "classnames";
import styles from "./styles.module.scss";
import { ReactNode, useEffect, useState } from "react";
import {
  HyperlinkIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  MailIcon,
} from "../../common/icons";
import copyTextToClipboard from "../../../../lib/utils/copyTextToClipboard";
import {
  getWhatsappSharingLink,
  getFacebookShareLink,
  getTwitterSharingLink,
  getMailShareLink,
} from "../../../../lib/utils/getSocialMediaLink";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

type ShareDropdownProps = {
  buttonClassName?: string;
  link: string;
};

type MenuItemType = {
  id: string;
  icon?: ReactNode;
  label: ReactNode;
  to: ReactNode;
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

const messages = defineMessages({
  shareLinkEmailSubject: {
    defaultMessage: "Me gustaría contarte sobre la plataforma Famosos",
  },
  shareLinkEmailBody: {
    defaultMessage:
      "¡Ahora puedes comprar videos personalizados de tus Famosos favoritos! Ingresa ya a {link}",
  },
  shareLinkWhatsappMessage: {
    defaultMessage:
      "¡Ahora puedes comprar videos personalizados de tus Famosos favoritos! Ingresa ya a {link}",
  },
  shareLinkTwitterText: {
    defaultMessage:
      "¡Ahora puedes comprar videos personalizados de tus Famosos favoritos! Ingresa ya a {link}",
  },
});

function ShareDropdown({ buttonClassName = "", link }: ShareDropdownProps) {
  const { formatMessage } = useIntl();
  const socialMedias: MenuItemType[] = [
    {
      id: "mail",
      icon: <MailIcon />,
      label: <FormattedMessage defaultMessage="Compartir por e-mail" />,
      to: getMailShareLink(
        formatMessage(messages.shareLinkEmailSubject),
        formatMessage(messages.shareLinkEmailBody, { link })
      ),
    },
    {
      id: "whatsapp",
      icon: <WhatsappIcon />,
      label: "Compartir por Whatsapp",
      to: getWhatsappSharingLink(
        formatMessage(messages.shareLinkWhatsappMessage, { link })
      ),
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
      to: getTwitterSharingLink(
        formatMessage(messages.shareLinkTwitterText, { link }),
        link,
        "contratafamosos"
      ),
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
      menuPosition="bottom right"
      menuClassName={styles.ShareDropdownMenu}
      buttonChildren="Compartir"
      buttonClassName={classes(
        "btn",
        styles.ShareDropdownButton,
        buttonClassName
      )}
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

export { ShareDropdown };
