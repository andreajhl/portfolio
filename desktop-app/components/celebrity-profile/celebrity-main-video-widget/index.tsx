import { celebrityType } from "desktop-app/types/celebrityType";
import OptimizedImage from "../../common/helpers/optimized-image";
import classes from "classnames";
import styles from "./styles.module.scss";
import useVideoPlayer from "react-app/src/utils/useVideoPlayer";
import dynamic from "next/dynamic";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ReactNode, useState } from "react";
import OverlayHeader from "desktop-app/components/common/cards/video/overlay-header";
import { usePreloadVideo } from "../../../../lib/hooks/usePreloadVideo";

const AnimatedPopup = dynamic<{
  trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element);
  children: ReactNode | ((closePopup: () => void) => ReactNode);
  modal?: boolean;
  onOpen?: () => any;
  onClose?: () => any;
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
  avatarProps: { className: avatarClassName = "", ...avatarProps }
}: CelebrityMainVideoWidgetProps) {
  const {
    videoRef,
    playVideo,
    pauseVideo,
    togglePlay,
    videoIsPlaying
  } = useVideoPlayer(celebrity.mainVideo || "NO_MAIN_VIDEO_KEY");
  const [videoIsMuted, setVideoIsMuted] = useState(false);
  const toggleVideoIsMuted = () => {
    setVideoIsMuted((videoIsMuted) => !videoIsMuted);
  };
  const isReady = usePreloadVideo(celebrity.mainVideo);

  const hasMainVideo = Boolean(celebrity.mainVideo);

  const celebrityAvatar = (
    <div
      className={classes(
        styles.CelebrityMainVideoWidget,
        isReady && styles.CelebrityMainVideoWidgetIsReady,
        !hasMainVideo && styles.CelebrityMainVideoWidgetNoVideo,
        className
      )}
      style={{ width: avatarProps.width, height: avatarProps.height }}
    >
      <OptimizedImage
        placeholderSrc="/assets/img/avatar-blank.png"
        src={celebrity.avatar}
        className={classes(
          styles.CelebrityMainVideoWidgetAvatar,
          avatarClassName
        )}
        width={avatarProps.width - 8}
        height={avatarProps.height - 8}
      />
      <Maybe it={hasMainVideo && isReady}>
        <button
          type="button"
          className={"btn " + styles.CelebrityMainVideoWidgetButton}
        >
          <i className="fa fa-play text-primary" />
        </button>
      </Maybe>
    </div>
  );

  return (
    <Maybe it={hasMainVideo && isReady} orElse={celebrityAvatar}>
      <AnimatedPopup
        trigger={celebrityAvatar}
        onOpen={playVideo}
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
