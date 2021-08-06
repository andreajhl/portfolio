import ClientContractType from "desktop-app/types/clientContract";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import getGiftPageBackgroundStyle from "lib/utils/getGiftPageBackgroundStyle";
import { FormattedMessage } from "react-intl";
import { GiftPreviewMain } from "../../layouts/gift-preview-main";
import styles from "./styles.module.scss";

type LivePreviewCardProps = {
  contract: ClientContractType;
  configuration: HiringPreviewConfigurationType;
};

function LivePreviewCard({ contract, configuration }: LivePreviewCardProps) {
  const deliveryTo = contract?.deliveryTo;
  return (
    <section className={styles.LivePreviewCard}>
      <header className={styles.LivePreviewHeader}>
        <h2>
          <FormattedMessage
            defaultMessage="Así lo verá {deliveryTo}"
            values={{ deliveryTo }}
          />
        </h2>
      </header>
      <div
        className={styles.LivePreviewBody}
        style={getGiftPageBackgroundStyle(configuration)}
      >
        <GiftPreviewMain
          className={styles.GiftPreview}
          contract={contract}
          hiringConfiguration={configuration}
          previewMode
        />
      </div>
    </section>
  );
}

export { LivePreviewCard };
