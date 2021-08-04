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
import getWindow, { getWindowPathname } from "react-app/src/utils/getWindow";
import { FormattedMessage } from "react-intl";
import { analytics } from "react-app/src/state/utils/gtm";

type AnalyticsDataType = {
  widget: string;
  path: string;
  celebrity: celebrityType;
  link: string;
  message: string;
};

type MenuItemType = {
  id: string;
  icon?: ReactNode;
  label: string;
  to: string;
};

const toMenuItem = (analyticsData: AnalyticsDataType) => ({
  id,
  to,
  icon,
  label,
}) => {
  function trackShareLinkClick() {
    analytics.track("SHARE_CELEBRITY_CLICK", {
      ...analyticsData,
      id,
      shareLink: to,
      label,
    });
  }
  return (
    <a
      href={to}
      className={styles.ShareDropdownItem}
      key={id}
      target="_blank"
      rel="noreferrer"
      onClick={trackShareLinkClick}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

type ShareDropdownProps = {
  buttonClassName?: string;
  celebrity: celebrityType;
};

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

  const analyticsData: AnalyticsDataType = {
    widget: "ShareCelebrityDropdown",
    path: getWindowPathname(),
    celebrity,
    link,
    message,
  };

  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  function trackLinkCopy() {
    analytics.track("SHARE_CELEBRITY_LINK_COPIED", analyticsData);
  }

  function copyLinkToClipboard() {
    copyTextToClipboard(link);
    setHasCopiedLink(true);
    trackLinkCopy();
  }

  useEffect(() => {
    if (!hasCopiedLink) return;

    const timeout = setTimeout(() => setHasCopiedLink(false), 5000);

    return () => clearTimeout(timeout);
  }, [hasCopiedLink]);

  function trackDropdownOpen() {
    analytics.track("SHARE_CELEBRITY_DROPDOWN_OPEN", analyticsData);
  }

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
      onOpen={trackDropdownOpen}
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
      {socialMedias.map(toMenuItem(analyticsData))}
    </Dropdown>
  );
}

export { ShareCelebrityDropdown };
