import PageContainer from "desktop-app/components/layouts/page-container";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import classes from "classnames";
import styles from "./styles.module.scss";
import { GiftCard } from "desktop-app/components/common/cards/gift-card";
import ViewerClientVideo from "desktop-app/components/common/cards/viewer-client-video";

const mockHiringConfiguration: HiringPreviewConfigurationType = {
  cardTitle: `¡Feliz
  cumpleaños
  mi amor!`,
  cardMessage: `Mi amor hermosa, te dedico esta canción con todo mi corazón.
  Te amo infinito. Que tengas un cumpleaños hermoso. 
  Con todo mi amor, Luis.`,
  cardColor: "#E8E8FF",
  pageBackgroundUrl: "/assets/img/hirings-preview-backgrounds/background-1.png",
};

function GiftPreviewPage({ hiringConfiguration = mockHiringConfiguration }) {
  return (
    <PageContainer showFooter={false}>
      <main
        className={styles.HiringPreviewPage}
        style={{
          backgroundImage: `url(${hiringConfiguration.pageBackgroundUrl})`,
        }}
      >
        <div className={classes("container", styles.Container)}>
          <div className={styles.LeftSide}>
            <GiftCard
              className={styles.GiftCard}
              cardColor={hiringConfiguration.cardColor}
              occasion="BIRTHDAY"
            >
              <GiftCard.Title>{hiringConfiguration.cardTitle}</GiftCard.Title>
              <GiftCard.SpecialText>
                {hiringConfiguration.cardMessage}
              </GiftCard.SpecialText>
            </GiftCard>
          </div>
          <div className={styles.RightSide}>
            <ViewerClientVideo
              avatar="https://dqb0851cl2gjs.cloudfront.net/celebrities/2530/avatar/famosos-videos-personalizados-nacho-compressed.jpeg"
              fullName="Enrique Arce"
              username="enriquearce"
              videoUrl="https://dqb0851cl2gjs.cloudfront.net/main-videos/2530/famosos-videos-personalizados-nacho-crf-video480.mp4"
              videoPosterUrl="https://d3dxo4xx2lwk55.cloudfront.net/videos/609/14805/famosos-videos-personalizados-enriquearce-202102181551-7872249-14805-crf-video-poster480.jpg"
            />
          </div>
        </div>
      </main>
    </PageContainer>
  );
}

export { GiftPreviewPage };
