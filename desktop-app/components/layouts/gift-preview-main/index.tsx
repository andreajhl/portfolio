import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import classes from "classnames";
import styles from "./styles.module.scss";
import { GiftCard } from "../../common/cards/gift-card";
import { VideoContractFeed } from "../video-contract-feed";
import ClientContractType from "desktop-app/types/clientContract";
import { HiringReviewSection } from "../../common/widgets/hiring-review-section";
import getDefaultHiringConfiguration from "constants/getDefaultHiringConfiguration";
import getGiftPageBackgroundStyle from "../../../../lib/utils/getGiftPageBackgroundStyle";
import { useIntl } from "lib/custom-intl";

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
  const { formatMessage } = useIntl();

  const deliveryTo = contract.deliveryTo;
  const cardMessage = formatMessage(hiringConfiguration.cardMessage, {
    deliveryTo,
  });
  const cardTitle = formatMessage(hiringConfiguration.cardTitle, {
    deliveryTo,
  });

  return (
    <main
      className={classes(styles.GiftPreviewMain, className)}
      style={getGiftPageBackgroundStyle(hiringConfiguration)}
    >
      <div className={classes("container", styles.Container)}>
        <div className={styles.LeftSide}>
          <GiftCard
            className={styles.GiftCard}
            cardColor={hiringConfiguration.cardColor}
            occasion={contract?.occasion}
          >
            <GiftCard.Title>{cardTitle}</GiftCard.Title>
            <GiftCard.SpecialText>{cardMessage}</GiftCard.SpecialText>
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
