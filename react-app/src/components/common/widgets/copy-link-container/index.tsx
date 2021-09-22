import styles from "./styles.module.scss";
import classes from "classnames";
import { DOMAttributes, ReactNode } from "react";
import useCopyToClipboard from "lib/hooks/useCopyToClipboard";
import Maybe from "../../helpers/maybe";
import { FormattedMessage } from "react-intl";

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

  function handleOnClick(event) {
    copyToClipboard(link);
    onClick?.(event);
  }

  return (
    <div
      className={classes(
        styles.CopyLinkContainer,
        className,
        hasCopiedLink && styles.CopyLinkContainerCopiedLink
      )}
      onClick={handleOnClick}
    >
      <i className={classes("fa fa-link", styles.CopyLinkContainerIcon)} />
      <span
        className={classes(
          "text-with-ellipsis",
          styles.CopyLinkContainerText,
          hasCopiedLink && styles.CopyLinkContainerLinkCopied
        )}
      >
        <Maybe it={hasCopiedLink} orElse={children || link}>
          <FormattedMessage defaultMessage="¡Copiado!" />
        </Maybe>
      </span>
    </div>
  );
}

export { CopyLinkContainer };
