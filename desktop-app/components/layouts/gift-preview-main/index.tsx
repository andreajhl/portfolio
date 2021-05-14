import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import classes from "classnames";
import styles from "./styles.module.scss";
import { GiftCard } from "../../common/cards/gift-card";
import { ContractVideoPreview } from "../contract-video-preview";
import ClientContractType from "desktop-app/types/clientContract";

type GiftPreviewMainProps = {
  className?: string;
  contract: ClientContractType;
  hiringConfiguration: HiringPreviewConfigurationType;
};

function GiftPreviewMain({
  className = "",
  contract,
  hiringConfiguration,
}: GiftPreviewMainProps) {
  return (
    <main
      className={classes(styles.GiftPreviewMain, className)}
      style={{
        backgroundImage: `url(${hiringConfiguration.pageBackgroundUrl})`,
      }}
    >
      <div className={classes("container", styles.Container)}>
        <div className={styles.LeftSide}>
          <GiftCard
            className={styles.GiftCard}
            cardColor={hiringConfiguration.cardColor}
            occasion={contract?.occasion}
          >
            <GiftCard.Title>{hiringConfiguration.cardTitle}</GiftCard.Title>
            <GiftCard.SpecialText>
              {hiringConfiguration.cardMessage}
            </GiftCard.SpecialText>
          </GiftCard>
        </div>
        <ContractVideoPreview
          className={styles.RightSide}
          contractData={contract}
        />
      </div>
    </main>
  );
}

export { GiftPreviewMain };
