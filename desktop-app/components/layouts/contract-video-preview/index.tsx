import ClientContractType from "desktop-app/types/clientContract";
import { ContractReviewVideoForOtherCard } from "../../client-hiring/contract-review-video-for-other-card";
import VideoActionButtons from "../../common/cards/video/action-buttons";
import ViewerClientVideo from "../../common/cards/viewer-client-video";
import classes from "classnames";
import styles from "./styles.module.scss";
import { CommentContractSection } from "desktop-app/components/client-hiring/comment-contract-section";

type ContractVideoPreviewProps = {
  className?: string;
  contractData: ClientContractType;
};

function ContractVideoPreview({
  className,
  contractData,
}: ContractVideoPreviewProps) {
  if (!contractData.reference) return null; // mostrar skeleton
  return (
    <div className={classes(styles.ContractVideoPreview, className)}>
      <div className={styles.VideoPlayer}>
        <ViewerClientVideo
          avatar={contractData.celebrityData.avatar}
          fullName={contractData.celebrityData.fullName}
          username={contractData.celebrityData.username}
          videoUrl={contractData.media}
          videoPosterUrl={contractData.celebrityData.avatar}
        />
      </div>
      {/* TODO: agregar condicional */}
      <div className={styles.VideoActionsWrapper}>
        <div>
          <CommentContractSection contract_reference={contractData.reference} />
        </div>
        {/* <div>
          <ContractReviewVideoForOtherCard contractData={contractData} />
        </div> */}
        <div>
          <VideoActionButtons videoURL={contractData.media} />
        </div>
      </div>
    </div>
  );
}

export { ContractVideoPreview };
