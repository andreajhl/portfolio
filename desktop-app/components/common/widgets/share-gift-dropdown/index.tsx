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
import { CSSProperties } from "react";
import { PopupProps } from "reactjs-popup/dist/types";

type ShareGiftDropdownProps = {
  backgroundColor?: CSSProperties["backgroundColor"];
  buttonClassName?: string;
  buttonChildren: ReactNode;
  menuPosition?: PopupProps["position"];
  link: string;
  deliveryTo: string;
  contractReference: string;
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

function ShareGiftDropdown({
  menuPosition = "top center",
  buttonChildren,
  buttonClassName = "",
  link,
}: ShareGiftDropdownProps) {
  // TODO DEFINIR TEXTOS
  const socialMedias: MenuItemType[] = [
    {
      id: "mail",
      icon: <MailIcon />,
      label: "Compartir por e-mail",
      to: getMailShareLink(
        "Me gustaría contarte sobre la plataforma Famosos",
        `¡Ahora puedes comprar videos personalizados de tus Famosos favoritos! Ingresa ya a ${link}`
      ),
    },
    {
      id: "whatsapp",
      icon: <WhatsappIcon />,
      label: "Compartir por Whatsapp",
      to: getWhatsappSharingLink(
        `¡Ahora puedes comprar videos personalizados de tus Famosos favoritos! Ingresa ya a ${link}`
      ),
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
      to: getTwitterSharingLink(
        `¡Ahora puedes comprar videos personalizados de tus Famosos favoritos! Ingresa ya a ${link}`,
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
      menuPosition={menuPosition}
      menuClassName={styles.ShareDropdownMenu}
      buttonChildren={buttonChildren}
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

export { ShareGiftDropdown };
