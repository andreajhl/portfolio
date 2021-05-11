import React, { useState } from "react";
import useVideoPlayer from "react-app/src/utils/useVideoPlayer";
import Maybe from "../../helpers/maybe";
import { PlayIcon } from "../../icons";
import VideoFooter from "../video/footer";
import useLoad from "react-app/src/utils/useLoad";
import styles from "./styles.module.scss";

type ViewerClientVideoProps = {
  avatar: string;
  fullName: string;
  username: string;
  videoUrl?: string;
  videoPosterUrl: string;
};

function ViewerClientVideo({
  avatar,
  fullName,
  username,
  videoUrl,
  videoPosterUrl,
}: ViewerClientVideoProps) {
  const videoKey = `client-video-${videoUrl}`;
  const { videoRef, videoIsPlaying, togglePlay } = useVideoPlayer(videoKey, {
    onPlayVideo() {
      // TODO: conectar GTM
      console.log("onPlayVideo()");
      //   GTM.tagManagerDataLayer("PLAY_MAIN_VIDEO_SECTION", {
      //     ...analyticsData,
      //     videoIsPlaying: true
      //   });
    },
    onPauseVideo() {
      // TODO: conectar GTM
      console.log("onPauseVideo()");
      // GTM.tagManagerDataLayer("PAUSE_MAIN_VIDEO_SECTION", {
      //   ...analyticsData,
      //   videoIsPlaying: false
      // });
    },
  });
  const [videoIsLoaded, onVideoLoadedData] = useLoad(videoRef);
  const [videoIsMuted, setVideoIsMuted] = useState(true);

  return (
    <div className={styles.ViewerClientVideoWrapper}>
      <section onClick={togglePlay} className={styles.ContractVideoPlayer}>
        <Maybe it={!videoUrl && !videoIsLoaded}>
          <img
            src={videoPosterUrl}
            alt={`Poster de vídeo de famoso`}
            className={styles.VideoPoster}
          ></img>
        </Maybe>
        <video
          muted={videoIsMuted}
          ref={videoRef}
          onLoadedData={onVideoLoadedData}
          src={videoUrl}
          preload="none"
          className={styles.VideoElement}
        ></video>
        <Maybe it={!videoIsPlaying}>
          <PlayIcon className={styles.CTAPlayIcon} onClick={togglePlay} />
        </Maybe>
      </section>
      <div className={styles.CelebrityDetails}>
        <VideoFooter
          avatarURL={avatar}
          fullName={fullName}
          userName={username}
        />
      </div>
    </div>
  );
}

export default ViewerClientVideo;
