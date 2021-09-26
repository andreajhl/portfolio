import styles from "./styles.module.scss";
import classes from "classnames";
import { DOMAttributes, ReactNode } from "react";
import useCopyToClipboard from "lib/hooks/useCopyToClipboard";
import Maybe from "../../helpers/maybe";
import { FormattedMessage } from "react-intl";
import { IconButton } from "desktop-app/components/common/button/icon-button";
import useIsOpen from "lib/hooks/useIsOpen";
import { OffCanvasShareReferralLinkMenu } from "../off-canvas-share-referral-link-menu";

type CopyLinkContainerProps = {
  className?: string;
  children?: ReactNode;
  link: string;
  onClick?: DOMAttributes<HTMLDivElement>["onClick"];
};

function CopyLinkContainer({
  className,
  children,
  link,
  onClick,
}: CopyLinkContainerProps) {
  const [copyToClipboard, hasCopiedLink] = useCopyToClipboard();
  const { isOpen, open, close } = useIsOpen(false);

  function copyLink(event) {
    copyToClipboard(link);
    onClick?.(event);
  }

  return (
    <div className={classes(styles.CopyLinkContainer, className)}>
      <IconButton onClick={open} className={styles.CopyLinkContainerButton}>
        <img
          src="/assets/img/share-icon.png"
          alt="Share icon"
          width="15"
          height="14"
        />
      </IconButton>
      <OffCanvasShareReferralLinkMenu isOpen={isOpen} onClose={close} />
      <span
        className={classes(
          "text-with-ellipsis",
          styles.CopyLinkContainerText,
          hasCopiedLink && styles.CopyLinkContainerLinkCopied
        )}
        onClick={copyLink}
      >
        <Maybe it={hasCopiedLink} orElse={children || link}>
          <FormattedMessage defaultMessage="¡Copiado!" />
        </Maybe>
      </span>
    </div>
  );
}

export { CopyLinkContainer };
