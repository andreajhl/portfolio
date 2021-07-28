import { useState } from "react";
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
import classNames from "classnames/bind";
import { FullScreenVideoPlayer } from "../video/full-screen-video-player";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  videoPosterAlt: {
    defaultMessage: "Poster de vídeo de famoso",
  },
});

let cx = classNames.bind(styles);

type ViewerClientVideoProps = {
  avatar: string;
  fullName: string;
  username: string;
  videoUrl?: string;
  videoPosterUrl: string;
  previewMode?: boolean;
  onTimeUpdate?: (event: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
};

const REF_WIDTH = 353;
const REF_HEIGHT = 470;
const TOLERANCE = 0.4;
const MAX_REF_RATIO_FOR_PORTRAIT_MODE =
  REF_WIDTH / REF_HEIGHT + (REF_WIDTH / REF_HEIGHT) * TOLERANCE;

function ViewerClientVideo({
  avatar,
  fullName,
  username,
  videoUrl,
  videoPosterUrl,
  previewMode = false,
  onTimeUpdate,
}: ViewerClientVideoProps) {
  const videoKey = `client-video-${videoUrl}`;
  const { videoRef, videoIsPlaying, togglePlay } = useVideoPlayer(videoKey);
  const [videoIsLoaded, onVideoLoadedData] = useLoad(videoRef);
  const [videoIsMuted, setVideoIsMuted] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { formatMessage } = useIntl();

  const toggleVideoIsMuted = () => {
    setVideoIsMuted((videoIsMuted) => !videoIsMuted);
  };

  const toggleVideoFullScreen = () => {
    setModalIsOpen((fullScreen) => !fullScreen);
    togglePlay();
  };

  const [landscapeMode, setLandscapeMode] = useState(false);

  const handleTogglePlay = () => {
    if (previewMode) return;
    togglePlay();
  };

  const getAspectRatio = () => {
    const videoElement: HTMLVideoElement = videoRef.current;
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    if (aspectRatio > MAX_REF_RATIO_FOR_PORTRAIT_MODE) {
      setLandscapeMode(true);
    }
  };

  const videoPosterAlt = formatMessage(messages.videoPosterAlt);

  return (
    <>
      <div className={styles.ViewerClientVideoWrapper}>
        <div className={styles.ContractVideoMedia}>
          <section
            onClick={togglePlay}
            className={cx({
              ContractVideoPlayer: true,
            })}
          >
            <Maybe it={previewMode || !videoIsLoaded}>
              <img
                src={videoPosterUrl}
                alt={videoPosterAlt}
                className={styles.VideoPoster}
              />
            </Maybe>
            <video
              muted={videoIsMuted}
              ref={videoRef}
              loop
              onLoadedData={onVideoLoadedData}
              src={videoUrl}
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={getAspectRatio}
              preload="metadata"
              className={cx({
                ContractVideoLandscape: landscapeMode,
                VideoElement: true,
                HideVideo: previewMode,
              })}
            />
          </section>
          <section className={styles.ContractVideoOverlay}>
            <Maybe it={!videoIsPlaying}>
              <PlayIcon
                className={styles.CTAPlayIcon}
                onClick={handleTogglePlay}
              />
            </Maybe>
            <Maybe it={videoIsPlaying}>
              <div className={styles.ContractVideoControls}>
                <VideoControls
                  onToggleFullScreen={toggleVideoFullScreen}
                  IsMuted={videoIsMuted}
                  isPlaying={videoIsPlaying}
                  onToggleAudio={toggleVideoIsMuted}
                  onTogglePlay={handleTogglePlay}
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
