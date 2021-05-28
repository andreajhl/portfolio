import LikeVideoButton from "../like-video-button";
import { ShareVideoButton } from "../share-video-button";
import DownloadVideoButton from "../download-video-button";
import styles from "./styles.module.scss";
import { CSSProperties } from "react";

type VideoActionButtonsProps = {
  videoURL: string;
  actionButtonsBackgroundColor?: CSSProperties["backgroundColor"];
  previewMode?: boolean;
  contractReference: string;
};

function VideoActionButtons({
  videoURL,
  actionButtonsBackgroundColor,
  previewMode = false,
  contractReference,
}: VideoActionButtonsProps) {
  return (
    <div className={styles.VideoActionButtonsWrapper}>
      <div>
        <LikeVideoButton
          backgroundColor={actionButtonsBackgroundColor}
          isLiked={false}
          onClick={() => {}}
        />
      </div>
      <div>
        <ShareVideoButton
          previewMode={previewMode}
          backgroundColor={actionButtonsBackgroundColor}
          contractReference={contractReference}
        />
      </div>
      <div>
        <DownloadVideoButton
          previewMode={previewMode}
          backgroundColor={actionButtonsBackgroundColor}
          videoURL={videoURL}
        />
      </div>
    </div>
  );
}

export default VideoActionButtons;
