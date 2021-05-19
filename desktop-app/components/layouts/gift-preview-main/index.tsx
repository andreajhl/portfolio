import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import classes from "classnames";
import styles from "./styles.module.scss";
import { GiftCard } from "../../common/cards/gift-card";
import { VideoContractFeed } from "../video-contract-feed";
import ClientContractType from "desktop-app/types/clientContract";
import { getDefaultGiftCardContent } from "constants/hiring-preview-configuration";

function getDefaultHiringConfiguration({
  occasion,
  deliveryTo,
}: ClientContractType): HiringPreviewConfigurationType {
  const cardContent = getDefaultGiftCardContent(occasion, deliveryTo);
  return {
    cardTitle: cardContent.title,
    cardMessage: cardContent.message,
    cardColor: "#E8E8FF",
    pageBackgroundUrl:
      "/assets/img/hirings-preview-backgrounds/background-2.png",
    actionButtonsBackgroundColor: "#FB177D",
  };
}

type GiftPreviewMainProps = {
  className?: string;
  contract: ClientContractType;
  hiringConfiguration?: HiringPreviewConfigurationType;
};

function GiftPreviewMain({
  className = "",
  contract,
  hiringConfiguration = getDefaultHiringConfiguration(contract),
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
        <VideoContractFeed
          actionButtonsBackgroundColor={
            hiringConfiguration.actionButtonsBackgroundColor
          }
          className={styles.RightSide}
          contractData={contract}
          previewMode
        />
      </div>
    </main>
  );
}

export { GiftPreviewMain };
