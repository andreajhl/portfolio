import React, { useCallback, useState } from "react";
import useVideoPlayer from "react-app/src/utils/useVideoPlayer";
import Maybe from "../../helpers/maybe";
import {
  MutedIcon,
  PauseIcon,
  PlayIcon,
  VolumeIcon,
  FullScreenIcon,
} from "../../icons";
import VideoFooter from "../video/footer";
import useLoad from "react-app/src/utils/useLoad";
import styles from "./styles.module.scss";

import { FullScreenVideoPlayer } from "../video/full-screen-video-player";

type ViewerClientVideoProps = {
  avatar: string;
  fullName: string;
  username: string;
  videoUrl?: string;
  videoPosterUrl: string;
  previewMode?: boolean;
};

function ViewerClientVideo({
  avatar,
  fullName,
  username,
  videoUrl,
  videoPosterUrl,
  previewMode = false,
}: ViewerClientVideoProps) {
  const videoKey = `client-video-${videoUrl}`;
  const {
    videoRef,
    videoIsPlaying,
    playVideo,
    pauseVideo,
    togglePlay,
  } = useVideoPlayer(videoKey, {
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleVideoIsMuted = () => {
    console.log("toggle");
    setVideoIsMuted((videoIsMuted) => !videoIsMuted);
  };
  const toggleVideoFullScreen = () => {
    setModalIsOpen((fullScreen) => !fullScreen);
  };

  return (
    <>
      <div className={styles.ViewerClientVideoWrapper}>
        <div className={styles.ContractVideoMedia}>
          <section onClick={togglePlay} className={styles.ContractVideoPlayer}>
            <Maybe it={!videoIsLoaded}>
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
          </section>
          <section className={styles.ContractVideoOverlay}>
            <Maybe it={!videoIsPlaying}>
              <PlayIcon className={styles.CTAPlayIcon} onClick={togglePlay} />
            </Maybe>
            <Maybe it={videoIsPlaying}>
              <div className={styles.ContractVideoControls}>
                <VideoControls
                  onToggleFullScreen={toggleVideoFullScreen}
                  IsMuted={videoIsMuted}
                  isPlaying={videoIsPlaying}
                  onToggleAudio={toggleVideoIsMuted}
                  onTogglePlay={togglePlay}
                />
              </div>
            </Maybe>
          </section>
        </div>
        <div className={styles.CelebrityDetails}>
          <VideoFooter
            avatarURL={avatar}
            fullName={fullName}
            userName={username}
          />
        </div>
      </div>
      <FullScreenVideoPlayer
        onCloseFullScreen={toggleVideoFullScreen}
        videoUrl={videoUrl}
        isFullScreen={modalIsOpen}
      />
    </>
  );
}

export default ViewerClientVideo;

type VideoControlsProps = {
  isPlaying: boolean;
  IsMuted: boolean;
  onTogglePlay: () => void;
  onToggleAudio: () => void;
  onToggleFullScreen: () => void;
};

const VideoControls = (props: VideoControlsProps) => {
  const {
    isPlaying,
    IsMuted,
    onToggleAudio,
    onTogglePlay,
    onToggleFullScreen,
  } = props;
  return (
    <div className={styles.OverlayControls}>
      {isPlaying ? (
        <PauseIcon className={styles.PauseIcon} onClick={onTogglePlay} />
      ) : null}
      {!IsMuted ? (
        <VolumeIcon className={styles.VolumenIcon} onClick={onToggleAudio} />
      ) : (
        <MutedIcon className={styles.MutedIcon} onClick={onToggleAudio} />
      )}
      <FullScreenIcon
        onClick={onToggleFullScreen}
        className={styles.ToggleFullScreen}
      ></FullScreenIcon>
    </div>
  );
};
