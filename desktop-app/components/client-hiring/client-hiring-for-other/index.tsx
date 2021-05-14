import { CustomizeGiftCard } from "../customize-gift-card";
import ViewerClientVideo from "../../common/cards/viewer-client-video";
import { DeliverVideoCard } from "../deliver-video-card";
import classes from "classnames";
import styles from "./styles.module.scss";
import ClientContractType from "desktop-app/types/clientContract";
import VideoActionButtons from "desktop-app/components/common/cards/video/action-buttons";
import { ContractReviewVideoForOtherCard } from "desktop-app/components/client-hiring/contract-review-video-for-other-card";

type ClientHiringForOtherProps = {
  contractData: ClientContractType;
};

function ClientHiringForOther({ contractData }: ClientHiringForOtherProps) {
  return (
    <div className={classes("container", styles.Container)}>
      <div className={styles.LeftSide}>
        <CustomizeGiftCard
          contractReference={contractData.reference}
          deliveryTo={contractData.deliveryTo}
        />
        <DeliverVideoCard
          className={styles.DeliverVideoCard}
          deliveryTo={contractData.deliveryTo}
        />
      </div>
      <div className={styles.RightSide}>
        <div className={styles.VideoPlayer}>
          <ViewerClientVideo
            avatar={contractData.celebrityData.avatar}
            fullName={contractData.celebrityData.fullName}
            username={contractData.celebrityData.username}
            videoUrl={contractData.media}
            videoPosterUrl="https://d3dxo4xx2lwk55.cloudfront.net/videos/609/14805/famosos-videos-personalizados-enriquearce-202102181551-7872249-14805-crf-video-poster480.jpg"
          />
        </div>
        <div className={styles.VideoActionsWrapper}>
          <div>
            <ContractReviewVideoForOtherCard contractData={contractData} />
          </div>
          <div>
            <VideoActionButtons
              videoURL={contractData.media}
            ></VideoActionButtons>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ClientHiringForOther };
