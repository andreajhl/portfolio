import LikeVideoButton from "../like-video-button";
import { ShareVideoButton } from "../share-video-button";
import DownloadVideoButton from "../download-video-button";
import styles from "./styles.module.scss";

type VideoActionButtonsProps = {
  videoURL: string;
};

function VideoActionButtons({ videoURL }: VideoActionButtonsProps) {
  return (
    <div className={styles.VideoActionButtonsWrapper}>
      <div>
        <LikeVideoButton isLiked={false} onClick={() => {}} />
      </div>
      <div>
        <ShareVideoButton link={videoURL} />
      </div>
      <div>
        <DownloadVideoButton videoURL={videoURL} />
      </div>
    </div>
  );
}

export default VideoActionButtons;
// "https://dqb0851cl2gjs.cloudfront.net/main-videos/367/famosos-videos-personalizados-vanessaguzman-crf-video-watermark480.mp4"
