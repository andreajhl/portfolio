import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

type HiringPreviewBannerProps = {
  className?: string;
  celebrityFullName: string;
  deliveryTo: string;
};

function HiringPreviewBanner({
  className,
  celebrityFullName,
  deliveryTo,
}: HiringPreviewBannerProps) {
  return (
    <div className={className}>
      <img
        className={styles.FamososLogo}
        src="/assets/img/famosos-icon.png"
        alt="Famosos Inc."
        width="51"
        height="49"
      />
      <h1 className={styles.Title}>
        <FormattedMessage
          defaultMessage="Mira este video de {celebrityFullName} para {deliveryTo}."
          values={{ celebrityFullName, deliveryTo }}
        />
      </h1>
    </div>
  );
}

export { HiringPreviewBanner };
