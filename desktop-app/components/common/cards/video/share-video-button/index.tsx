import classes from "classnames";
import styles from "./styles.module.scss";
import { ReactNode, useEffect, useState } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";
import {
  FacebookIcon,
  HyperlinkIcon,
  MailIcon,
  ShareIcon,
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
import { CSSProperties } from "react";
import getWindow from "react-app/src/utils/getWindow";
import { getHiringPreviewPath } from "constants/paths";
import { FormattedMessage } from "react-intl";

type ShareVideoButtonProps = {
  backgroundColor?: CSSProperties["backgroundColor"];
  buttonClassName?: string;
  contractReference: string;
  previewMode?: boolean;
};

type MenuItemType = {
  id: string;
  icon?: ReactNode;
  label: string;
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
  backgroundColor: backgroundColorFromProps,
  buttonClassName = "",
  contractReference,
  previewMode = false,
}: ShareVideoButtonProps) {
  const link = `${getWindow().location.origin}${getHiringPreviewPath(
    contractReference
  )}`;

  const message = `¡Hola! Mira el regalo que he hecho a través de Famosos.com ${link}`;

  const socialMedias: MenuItemType[] = [
    {
      id: "mail",
      icon: <MailIcon />,
      label: "Compartir por e-mail",
      to: getMailShareLink(
        "Me gustaría compartirte este video de Famosos.com",
        message
      ),
    },
    {
      id: "whatsapp",
      icon: <WhatsappIcon />,
      label: "Compartir por Whatsapp",
      to: getWhatsappSharingLink(message),
    },
    {
      id: "facebook",
      icon: <FacebookIcon />,
      label: "Compartir por Facebook",
      to: getFacebookShareLink(link),
    },
    {
      id: "twitter",
      icon: <TwitterIcon />,
      label: "Compartir por Twitter",
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

  const backgroundColor = backgroundColorFromProps || "white"; // Para evitar utilizar string vaciás.

  return (
    <Dropdown
      disabled={previewMode}
      menuPosition="top center"
      menuClassName={styles.ShareDropdownMenu}
      buttonChildren={
        <ShareIcon stroke={backgroundColor !== "white" ? "white" : "black"} />
      }
      buttonClassName={classes("btn", styles.ActionButton)}
      buttonStyle={{ backgroundColor }}
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
