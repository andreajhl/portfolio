import { celebrityType } from "desktop-app/types/celebrityType";
import OptimizedImage from "../../common/helpers/optimized-image";
import classes from "classnames";
import styles from "./styles.module.scss";
import useVideoPlayer from "react-app/src/utils/useVideoPlayer";
import dynamic from "next/dynamic";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { PopupProps } from "reactjs-popup/dist/types";

const AnimatedPopup = dynamic<PopupProps>(() =>
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
    celebrity.mainVideo
  );

  const hasMainVideo = Boolean(celebrity.mainVideo);

  return (
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
        <AnimatedPopup
          trigger={
            <button
              type="button"
              className={"btn " + styles.CelebrityMainVideoWidgetButton}
            >
              <i className="fa fa-play text-primary" />
            </button>
          }
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
    </div>
  );
}

export { CelebrityMainVideoWidget };
