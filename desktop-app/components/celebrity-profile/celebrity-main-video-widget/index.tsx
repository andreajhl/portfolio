import { celebrityType } from "desktop-app/types/celebrityType";
import OptimizedImage from "../../common/helpers/optimized-image";
import classes from "classnames";
import styles from "./styles.module.scss";
import useVideoPlayer from "react-app/src/utils/useVideoPlayer";
import dynamic from "next/dynamic";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ReactNode } from "react";

const AnimatedPopup = dynamic<{
  trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element);
  children: ReactNode;
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
  const { videoRef, playVideo, pauseVideo, togglePlay } = useVideoPlayer(
    celebrity.mainVideo || "NO_MAIN_VIDEO_KEY"
  );

  const hasMainVideo = Boolean(celebrity.mainVideo);

  const celebrityAvatar = (
    <div
      className={classes(
        styles.CelebrityMainVideoWidget,
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
      <Maybe it={hasMainVideo}>
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
    <Maybe it={hasMainVideo} orElse={celebrityAvatar}>
      <AnimatedPopup
        trigger={celebrityAvatar}
        onOpen={playVideo}
        onClose={pauseVideo}
        modal
      >
        <div className={styles.CelebrityMainVideoWidgetVideoContainer}>
          <video
            ref={videoRef}
            src={celebrity.mainVideo}
            preload="metadata"
            onClick={togglePlay}
          />
        </div>
      </AnimatedPopup>
    </Maybe>
  );
}

export { CelebrityMainVideoWidget };
