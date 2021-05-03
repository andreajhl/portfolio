import { Dropdown } from "../../common/button/dropdown";
import classes from "classnames";
import styles from "./styles.module.scss";
import { ReactNode } from "react";
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

type ShareDropdownProps = {
  buttonClassName?: string;
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

function ShareDropdown({ buttonClassName = "" }: ShareDropdownProps) {
  const socialMedias: MenuItemType[] = [
    {
      id: "mail",
      icon: <MailIcon />,
      label: "Compartir por e-mail",
      to: getMailShareLink(
        `Me gustaría contarte sobre la plataforma Famosos, conoce más con este link`
      ),
    },
    {
      id: "whatsapp",
      icon: <WhatsappIcon />,
      label: "Compartir por Whatsapp",
      to: getWhatsappSharingLink(
        `Me gustaría contarte sobre la plataforma Famosos, conoce más con este link`
      ),
    },
    {
      id: "facebook",
      icon: <FacebookIcon />,
      label: "Compartir por Facebook",
      to: getFacebookShareLink(),
    },
    {
      id: "twitter",
      icon: <TwitterIcon />,
      label: "Compartir por Twitter",
      to: getTwitterSharingLink(
        `Me gustaría contarte sobre la plataforma Famosos, conoce más con este link.`
      ),
    },
  ];

  return (
    <Dropdown
      menuClassName={styles.ShareDropdownMenu}
      buttonChildren="Compartir"
      buttonClassName={classes(
        "btn",
        styles.ShareDropdownButton,
        buttonClassName
      )}
    >
      <div
        className={styles.ShareDropdownItem}
        onClick={() => copyTextToClipboard("https://famosos.com")}
      >
        <HyperlinkIcon />
        <span>Copiar enlace</span>
      </div>
      {socialMedias.map(toMenuItem)}
    </Dropdown>
  );
}

export { ShareDropdown };
