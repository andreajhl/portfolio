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
import { getCelebrityProfilePath } from "constants/paths";
import { celebrityType } from "desktop-app/types/celebrityType";
import getWindow from "react-app/src/utils/getWindow";

type ShareDropdownProps = {
  buttonClassName?: string;
  celebrity: celebrityType;
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

function ShareCelebrityDropdown({
  buttonClassName = "",
  celebrity,
}: ShareDropdownProps) {
  const link =
    getWindow().location.origin + getCelebrityProfilePath(celebrity.username);
  const message = `¡Visita el perfil de ${celebrity.fullName} en Famosos.com! Ingresa ya a ${link}`;
  const socialMedias: MenuItemType[] = [
    {
      id: "mail",
      icon: <MailIcon />,
      label: "Compartir por e-mail",
      to: getMailShareLink(
        `Me gustaría compartirte el perfil de ${celebrity.fullName}`,
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

  return (
    <Dropdown
      menuPosition="bottom right"
      menuClassName={styles.ShareDropdownMenu}
      buttonChildren={<i className="fa fa-share-alt cursor-pointer" />}
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
              <span>Copiar enlace</span>
            </>
          }
        >
          <i className={classes("fa fa-check-circle", styles.CheckIcon)} />
          <span>Enlace copiado</span>
        </Maybe>
      </div>
      {socialMedias.map(toMenuItem)}
    </Dropdown>
  );
}

export { ShareCelebrityDropdown };
