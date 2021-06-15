import ClientContractType from "desktop-app/types/clientContract";
import VideoActionButtons from "../../common/cards/video/action-buttons";
import ViewerClientVideo from "../../common/cards/viewer-client-video";
import classes from "classnames";
import styles from "./styles.module.scss";
import { CSSProperties } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { HiringReviewSection } from "../../common/widgets/hiring-review-section";
import { GoToContractDetailsButton } from "desktop-app/components/common/button/go-to-contract-details-button";

type VideoContractFeedProps = {
  className?: string;
  contractData: ClientContractType;
  actionButtonsBackgroundColor?: CSSProperties["backgroundColor"];
  asContractOwner?: boolean;
  previewMode?: boolean;
};

function VideoContractFeed({
  actionButtonsBackgroundColor,
  className,
  contractData,
  asContractOwner = false,
  previewMode = false,
}: VideoContractFeedProps) {
  if (!contractData.reference) return null; // mostrar skeleton
  const videoPosterUrl =
    contractData.mediaPosterUrl || contractData.celebrityData.avatar;

  return (
    <div className={classes(styles.VideoContractFeed, className)}>
      <div className={styles.VideoPlayer}>
        <ViewerClientVideo
          avatar={contractData.celebrityData.avatar}
          fullName={contractData.celebrityData.fullName}
          username={contractData.celebrityData.username}
          videoUrl={contractData.media}
          previewMode={previewMode}
          videoPosterUrl={videoPosterUrl}
        />
      </div>
      {/* TODO: agregar condicional y conectar con endpoint para saber si existe review del comprador*/}
      <div className={styles.VideoActionsWrapper}>
        <HiringReviewSection
          asContractOwner={asContractOwner}
          contractData={contractData}
          previewMode={previewMode}
        />
        <div className={styles.ActionButtons}>
          <VideoActionButtons
            actionButtonsBackgroundColor={actionButtonsBackgroundColor}
            videoURL={contractData.media}
            previewMode={previewMode}
            contractReference={contractData.reference}
          />
          <Maybe it={asContractOwner && !previewMode}>
            <GoToContractDetailsButton
              className={styles.GoToContractDetailsLink}
            />
          </Maybe>
        </div>
      </div>
    </div>
  );
}

export { VideoContractFeed };
