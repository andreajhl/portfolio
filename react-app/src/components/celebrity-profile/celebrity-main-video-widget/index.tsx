import { celebrityType } from "desktop-app/types/celebrityType";
import OptimizedImage from "../../common/helpers/optimized-image";
import classes from "classnames";
import styles from "./styles.module.scss";
import useVideoPlayer from "react-app/src/utils/useVideoPlayer";
import dynamic from "next/dynamic";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ReactNode, useState } from "react";
import OverlayHeader from "desktop-app/components/common/cards/video/overlay-header";
import { usePreloadVideo } from "lib/hooks/usePreloadVideo";
import { ProgressCircle } from "desktop-app/components/common/progress-circle";
import { analytics } from "react-app/src/state/utils/gtm";

const AnimatedPopup = dynamic<{
  trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element);
  children: ReactNode | ((closePopup: () => void) => ReactNode);
  modal?: boolean;
  onOpen?: () => any;
  onClose?: () => any;
  disabled: boolean;
}>(() =>
  import("desktop-app/components/common/animated-popup").then(
    (mod) => mod.AnimatedPopup
  )
);

type AvatarProps = {
  width: number;
  height: number;
  className?: string;
};

type CelebrityMainVideoWidgetProps = {
  celebrity: celebrityType;
  className?: string;
  avatarProps: AvatarProps;
};

function CelebrityMainVideoWidget({
  celebrity,
  className = "",
  avatarProps: { className: avatarClassName = "", ...avatarProps },
}: CelebrityMainVideoWidgetProps) {
  const {
    videoRef,
    playVideo,
    pauseVideo,
    togglePlay,
    videoIsPlaying,
  } = useVideoPlayer(celebrity.mainVideo || "NO_MAIN_VIDEO_KEY");
  const [videoIsMuted, setVideoIsMuted] = useState(false);
  const toggleVideoIsMuted = () => {
    setVideoIsMuted((videoIsMuted) => !videoIsMuted);
  };
  const [animationIsFinished, setAnimationIsFinished] = useState(false);

  const mainVideoIsReady = usePreloadVideo(celebrity.mainVideo);
  const hasMainVideo = Boolean(celebrity.mainVideo);

  function autoPlayVideo() {
    analytics.track("MAIN_VIDEO_POPUP_OPEN", {
      widget: "CelebrityMainVideoWidget",
      celebrityUsername: celebrity.username,
      celebrityMainVideo: celebrity.mainVideo,
    });
    playVideo();
  }

  const celebrityAvatar = (
    <div
      className={classes(
        styles.CelebrityMainVideoWidget,
        mainVideoIsReady && styles.CelebrityMainVideoWidgetIsReady,
        !hasMainVideo && styles.CelebrityMainVideoWidgetNoVideo,
        className
      )}
      style={{ width: avatarProps.width + 24, height: avatarProps.height + 24 }}
    >
      <Maybe it={hasMainVideo}>
        <ProgressCircle
          width={avatarProps.width + avatarProps.width * 0.0725}
          height={avatarProps.height + avatarProps.height * 0.0725}
          isDone={mainVideoIsReady}
          onFinish={() => setAnimationIsFinished(true)}
        />
      </Maybe>
      <OptimizedImage
        placeholderSrc="/assets/img/avatar-blank.png"
        src={celebrity.avatar}
        className={classes(
          styles.CelebrityMainVideoWidgetAvatar,
          avatarClassName
        )}
        width={avatarProps.width}
        height={avatarProps.height}
      />
      <Maybe it={hasMainVideo}>
        <button
          type="button"
          className={classes(
            "btn",
            styles.CelebrityMainVideoWidgetButton,
            animationIsFinished && styles.CelebrityMainVideoWidgetButtonShow
          )}
        >
          <i className="fa fa-play text-primary" />
        </button>
      </Maybe>
    </div>
  );

  return (
    <Maybe it={hasMainVideo} orElse={celebrityAvatar}>
      <AnimatedPopup
        disabled={!mainVideoIsReady}
        trigger={celebrityAvatar}
        onOpen={autoPlayVideo}
        onClose={pauseVideo}
        modal
      >
        {(closePopup) => (
          <>
            <button
              type="button"
              className={"btn " + styles.CelebrityMainVideoWidgetCloseButton}
              onClick={closePopup}
            >
              <i className="fa fa-times" />
            </button>
            <div className={styles.CelebrityMainVideoWidgetVideoContainer}>
              <video
                ref={videoRef}
                src={celebrity.mainVideo}
                preload="metadata"
                onClick={togglePlay}
                muted={videoIsMuted}
              />
              <div className={styles.CelebrityMainVideoWidgetVideoOverlay}>
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
    </Maybe>
  );
}

export { CelebrityMainVideoWidget };
