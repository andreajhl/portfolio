import React from "react";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { celebrityType } from "desktop-app/types/celebrityType";
import { useState } from "react";
import useVideoPlayer from "react-app/src/utils/useVideoPlayer";
import useLoad from "react-app/src/utils/useLoad";
import OverlayHeader from "../video/overlay-header";
import OverlayDetails from "../video/overlay-details";

type ContractVideoProps = {
  celebrity: celebrityType & {
    videoUrl: string;
    videoPosterUrl: string;
    occasion: string;
  };
  className?: string;
  style?: object;
};

const ContractVideo = ({
  celebrity,
  style = {},
  className = ""
}: ContractVideoProps) => {
  const videoKey = `contract-video-${celebrity.videoUrl}`;
  const { videoRef, videoIsPlaying, togglePlay } = useVideoPlayer(videoKey, {
    onPlayVideo() {
      // TODO: conectar GTM
      console.log("onPlayVideo()");
      // GTM.tagManagerDataLayer("PLAY_MAIN_VIDEO_SECTION", {
      //   ...analyticsData,
      //   videoIsPlaying: true
      // });
    },
    onPauseVideo() {
      // TODO: conectar GTM
      console.log("onPauseVideo()");
      // GTM.tagManagerDataLayer("PAUSE_MAIN_VIDEO_SECTION", {
      //   ...analyticsData,
      //   videoIsPlaying: false
      // });
    }
  });
  const [videoIsLoaded, onVideoLoadedData] = useLoad(videoRef);
  const [videoIsMuted, setVideoIsMuted] = useState(true);
  const toggleVideoIsMuted = () => {
    setVideoIsMuted((videoIsMuted) => !videoIsMuted);
  };
  return (
    <div
      className={styles.ContractVideo}
      onMouseEnter={!videoIsPlaying ? togglePlay : undefined}
      onMouseLeave={videoIsPlaying ? togglePlay : undefined}
    >
      <div className={styles.ContractVideoMedia}>
        <section onClick={togglePlay} className={styles.ContractVideoPlayer}>
          <Maybe it={!videoIsLoaded}>
            <img
              src={celebrity.videoPosterUrl}
              alt={`Poster de vídeo de famoso`}
              className={styles.VideoPoster}
            ></img>
          </Maybe>
          <video
            muted={videoIsMuted}
            ref={videoRef}
            onLoadedData={onVideoLoadedData}
            src={"/assets/testing.mp4"}
            preload="none"
            className={styles.VideoElement}
          ></video>
        </section>
        <section className={styles.ContractVideoOverlay}>
          <div className={styles.ContractVideoControls}>
            <OverlayHeader
              IsMuted={videoIsMuted}
              isPlaying={videoIsPlaying}
              onToggleAudio={toggleVideoIsMuted}
              onTogglePlay={togglePlay}
            />
          </div>
          <OverlayDetails
            ocassion={celebrity.occasion}
            onLikevideo={() => {
              console.log("video like it");
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default ContractVideo;
