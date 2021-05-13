import PageContainer from "desktop-app/components/layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import ViewerClientVideo from "desktop-app/components/common/cards/viewer-client-video";
import { CustomizeGiftCard } from "desktop-app/components/client-hiring/customize-gift-card";
import { DeliverVideoCard } from "desktop-app/components/deliver-video-card";

function ClientHiringPage() {
  return (
    <PageContainer showFooter={false}>
      <div className={classes("container", styles.Container)}>
        <div className={styles.LeftSide}>
          <CustomizeGiftCard deliveryTo="Ana" />
          <DeliverVideoCard
            className={styles.DeliverVideoCard}
            deliveryTo="Ana"
          />
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
    </PageContainer>
  );
}

export { ClientHiringPage };
