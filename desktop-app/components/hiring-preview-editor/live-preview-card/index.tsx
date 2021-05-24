import ClientContractType from "desktop-app/types/clientContract";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { GiftPreviewMain } from "../../layouts/gift-preview-main";
import styles from "./styles.module.scss";

type LivePreviewCardProps = {
  contract: ClientContractType;
  configuration: HiringPreviewConfigurationType;
};

function LivePreviewCard({ contract, configuration }: LivePreviewCardProps) {
  return (
    <section className={styles.LivePreviewCard}>
      <header className={styles.LivePreviewHeader}>
        <h2>Así lo verá {contract?.deliveryTo}</h2>
      </header>
      <div
        className={styles.LivePreviewBody}
        style={{
          backgroundImage: `url(${configuration.pageBackgroundUrl})`,
        }}
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
