import ClientContractType from "desktop-app/types/clientContract";
import VideoActionButtons from "../../common/cards/video/action-buttons";
import ViewerClientVideo from "../../common/cards/viewer-client-video";
import classes from "classnames";
import styles from "./styles.module.scss";
import { CSSProperties } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { CLIENT_HIRINGS } from "constants/paths";
import { Link } from "desktop-app/components/common/routing/link";
import { HiringReviewSection } from "../../common/widgets/hiring-review-section";

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
  return (
    <div className={classes(styles.VideoContractFeed, className)}>
      <div className={styles.VideoPlayer}>
        <ViewerClientVideo
          avatar={contractData.celebrityData.avatar}
          fullName={contractData.celebrityData.fullName}
          username={contractData.celebrityData.username}
          videoUrl={contractData.media}
          previewMode={previewMode}
          // TODO: agregar poster de video
          videoPosterUrl={contractData.celebrityData.avatar}
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
          />
          <Maybe it={asContractOwner && !previewMode}>
            <Link
              href={CLIENT_HIRINGS}
              className={styles.GoToContractDetailsLink}
            >
              <button
                className={`btn btn-tertiary ${styles.GoToContractDetailsButton}`}
              >
                Ver detalles de video
              </button>
            </Link>
          </Maybe>
        </div>
      </div>
    </div>
  );
}

export { VideoContractFeed };
