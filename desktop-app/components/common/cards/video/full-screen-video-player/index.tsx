import styles from "./styles.module.scss";
import useVideoPlayer from "react-app/src/utils/useVideoPlayer";
import dynamic from "next/dynamic";
import { ReactNode, useState } from "react";
import OverlayHeader from "desktop-app/components/common/cards/video/overlay-header";
import { usePreloadVideo } from "lib/hooks/usePreloadVideo";

const AnimatedPopup = dynamic<{
  children: ReactNode | ((closePopup: () => void) => ReactNode);
  modal?: boolean;
  onOpen?: () => any;
  onClose?: () => any;
  open: boolean;
  disabled: boolean;
}>(() =>
  import("desktop-app/components/common/animated-popup").then(
    (mod) => mod.AnimatedPopup
  )
);

type FullScreenVideoPlayerProps = {
  videoUrl;
  isFullScreen: boolean;
  onCloseFullScreen: () => void;
  loop?: boolean;
};

function FullScreenVideoPlayer({
  videoUrl,
  isFullScreen,
  loop = true,
  onCloseFullScreen,
}: FullScreenVideoPlayerProps) {
  const videoKey = `client-video-${videoUrl}`;
  const {
    videoRef,
    playVideo,
    pauseVideo,
    togglePlay,
    videoIsPlaying,
  } = useVideoPlayer(videoKey);
  const [videoIsMuted, setVideoIsMuted] = useState(false);
  const toggleVideoIsMuted = () => {
    setVideoIsMuted((videoIsMuted) => !videoIsMuted);
  };

  const handleCloseFullScreen = () => {
    onCloseFullScreen();
    pauseVideo();
  };

  const mainVideoIsReady = usePreloadVideo(videoUrl);

  return (
    <AnimatedPopup
      disabled={!mainVideoIsReady}
      open={isFullScreen}
      onOpen={playVideo}
      onClose={handleCloseFullScreen}
      modal
    >
      {(closePopup) => (
        <>
          <button
            type="button"
            className={"btn " + styles.FullScreenVideoPlayerCloseButton}
            onClick={closePopup}
          >
            <i className="fa fa-times" />
          </button>
          <div className={styles.FullScreenVideoPlayerVideoContainer}>
            <video
              ref={videoRef}
              loop={loop}
              src={videoUrl}
              preload="metadata"
              onClick={togglePlay}
              muted={videoIsMuted}
            />
            <div className={styles.FullScreenVideoPlayerVideoOverlay}>
              <OverlayHeader
                IsMuted={videoIsMuted}
                isPlaying={videoIsPlaying}
                onToggleAudio={toggleVideoIsMuted}
                onTogglePlay={togglePlay}
              />
            </div>
          </div>
        </>
      )}
    </AnimatedPopup>
  );
}

export { FullScreenVideoPlayer };
