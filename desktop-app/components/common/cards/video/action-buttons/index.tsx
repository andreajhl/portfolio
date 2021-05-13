import LikeVideoButton from "../like-video-button";
import { ShareVideoButton } from "../share-video-button";
import DownloadVideoButton from "../download-video-button";

function VideoActionButtons() {
  return (
    <div>
      <LikeVideoButton isLiked={false} onClick={() => {}} />
      <ShareVideoButton link="https://dqb0851cl2gjs.cloudfront.net/main-videos/367/famosos-videos-personalizados-vanessaguzman-crf-video-watermark480.mp4" />
      <DownloadVideoButton
        videoURL={
          "https://dqb0851cl2gjs.cloudfront.net/main-videos/367/famosos-videos-personalizados-vanessaguzman-crf-video-watermark480.mp4"
        }
      />
    </div>
  );
}

export default VideoActionButtons;
