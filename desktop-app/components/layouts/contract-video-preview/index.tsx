import ClientContractType from "desktop-app/types/clientContract";
import { ContractReviewVideoForOtherCard } from "../../client-hiring/contract-review-video-for-other-card";
import VideoActionButtons from "../../common/cards/video/action-buttons";
import ViewerClientVideo from "../../common/cards/viewer-client-video";
import styles from "./styles.module.scss";

type ContractVideoPreviewProps = {
  className?: string;
  contractData: ClientContractType;
};

function ContractVideoPreview({
  className,
  contractData,
}: ContractVideoPreviewProps) {
  return (
    <div className={className}>
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
          <VideoActionButtons videoURL={contractData.media} />
        </div>
      </div>
    </div>
  );
}

export { ContractVideoPreview };
