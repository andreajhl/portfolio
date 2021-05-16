import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import classes from "classnames";
import styles from "./styles.module.scss";
import { GiftCard } from "../../common/cards/gift-card";
import { VideoContractFeed } from "../video-contract-feed";
import ClientContractType from "desktop-app/types/clientContract";

const defaultHiringConfiguration: HiringPreviewConfigurationType = {
  cardTitle: `¡Feliz
  cumpleaños
  mi amor!`,
  cardMessage: `Mi amor hermosa, te dedico esta canción con todo mi corazón.
  Te amo infinito. Que tengas un cumpleaños hermoso. 
  Con todo mi amor, Luis.`,
  cardColor: "#E8E8FF",
  pageBackgroundUrl: "/assets/img/hirings-preview-backgrounds/background-1.png",
  actionButtonsBackgroundColor: "#000000",
};

type GiftPreviewMainProps = {
  className?: string;
  contract: ClientContractType;
  hiringConfiguration?: HiringPreviewConfigurationType;
};

function GiftPreviewMain({
  className = "",
  contract,
  hiringConfiguration = defaultHiringConfiguration,
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
        />
      </div>
    </main>
  );
}

export { GiftPreviewMain };
