import ClientContractType from "desktop-app/types/clientContract";
import { ContractReviewVideo } from "../../client-hiring/contract-review-video-for-other-card";
import VideoActionButtons from "../../common/cards/video/action-buttons";
import ViewerClientVideo from "../../common/cards/viewer-client-video";
import classes from "classnames";
import styles from "./styles.module.scss";
import { CommentContractSection } from "desktop-app/components/client-hiring/comment-contract-section";
import { CSSProperties } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { CLIENT_HIRINGS } from "constants/paths";
import { Link } from "desktop-app/components/common/routing/link";

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
          // TODO: agregar poster de video
          videoPosterUrl={contractData.celebrityData.avatar}
        />
      </div>
      {/* TODO: agregar condicional y conectar con endpoint para saber si existe review del comprador*/}
      <div className={styles.VideoActionsWrapper}>
        <Maybe
          it={asContractOwner && contractData.review === ""}
          orElse={
            <div>
              <CommentContractSection
                previewMode={previewMode}
                contract_reference={contractData.reference}
              />
            </div>
          }
        >
          <ContractReviewVideo contract_reference={contractData.reference} />
        </Maybe>
        <div className={styles.ActionButtons}>
          <VideoActionButtons
            actionButtonsBackgroundColor={actionButtonsBackgroundColor}
            videoURL={contractData.media}
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
