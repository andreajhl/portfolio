import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import classes from "classnames";
import styles from "./styles.module.scss";
import { GiftCard } from "../../common/cards/gift-card";
import { VideoContractFeed } from "../video-contract-feed";
import ClientContractType from "desktop-app/types/clientContract";
import { HiringReviewSection } from "../../common/widgets/hiring-review-section";
import getDefaultHiringConfiguration from "constants/getDefaultHiringConfiguration";

type GiftPreviewMainProps = {
  className?: string;
  contract: ClientContractType;
  hiringConfiguration?: HiringPreviewConfigurationType;
  previewMode?: boolean;
};

function GiftPreviewMain({
  className = "",
  contract,
  hiringConfiguration = getDefaultHiringConfiguration(contract),
  previewMode = false,
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
          <div className={styles.ReviewSectionWrapper}>
            <HiringReviewSection contractData={contract} asContractOwner />
          </div>
        </div>
        <VideoContractFeed
          actionButtonsBackgroundColor={
            hiringConfiguration.actionButtonsBackgroundColor
          }
          className={styles.RightSide}
          contractData={contract}
          previewMode={previewMode}
        />
      </div>
    </main>
  );
}

export { GiftPreviewMain };
