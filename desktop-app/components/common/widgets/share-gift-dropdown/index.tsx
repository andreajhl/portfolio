import classes from "classnames";
import styles from "./styles.module.scss";
import { ReactNode, useEffect, useRef, useState } from "react";
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
import { PopupActions, PopupProps } from "reactjs-popup/dist/types";
import {
  getClientHiringShareInMailPath,
  getClientHiringShareInWhatsappPath,
  getGiftPreviewPath,
} from "constants/paths";
import { ShareModeSelectorModal } from "../../modals/share-mode-selector-modal";
import getWindow from "react-app/src/utils/getWindow";

type ShareGiftDropdownProps = {
  backgroundColor?: CSSProperties["backgroundColor"];
  buttonClassName?: string;
  buttonChildren: ReactNode;
  menuPosition?: PopupProps["position"];
  deliveryTo: string;
  contractReference: string;
};

type MenuItemType =
  | {
      id: string;
      icon?: ReactNode;
      label: string;
      to: string;
    }
  | JSX.Element;

const toMenuItem = (item) => {
  if (!item?.label) return item;
  const { id, to, icon, label } = item;
  return (
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
};

function ShareGiftDropdown({
  menuPosition = "top center",
  buttonChildren,
  buttonClassName = "",
  deliveryTo,
  contractReference,
}: ShareGiftDropdownProps) {
  const shareInMailRef = useRef<PopupActions>();
  const shareInWhatsappRef = useRef<PopupActions>();
  const link = `${getWindow()?.location?.origin}${getGiftPreviewPath(
    contractReference
  )}`;

  const message = `¡Hola ${deliveryTo}! Mira el regalo que te he hecho a través de Famosos.com ${link}`;

  const socialMedias: MenuItemType[] = [
    <div
      className={styles.ShareDropdownItem}
      onClick={shareInMailRef.current?.open}
    >
      <MailIcon />
      <span>Compartir por e-mail</span>
    </div>,
    <div
      className={styles.ShareDropdownItem}
      onClick={shareInWhatsappRef.current?.open}
    >
      <WhatsappIcon />
      <span>Compartir por Whatsapp</span>
    </div>,
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
    <>
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
      <ShareModeSelectorModal
        ref={shareInMailRef}
        type="mail"
        shareInstantlyLink={getMailShareLink(
          "Te he hecho un regalo muy especial",
          message
        )}
        scheduleShareLink={getClientHiringShareInMailPath(contractReference)}
      />
      <ShareModeSelectorModal
        ref={shareInWhatsappRef}
        type="whatsapp"
        shareInstantlyLink={getWhatsappSharingLink(message)}
        scheduleShareLink={getClientHiringShareInWhatsappPath(
          contractReference
        )}
      />
    </>
  );
}

export { ShareGiftDropdown };
