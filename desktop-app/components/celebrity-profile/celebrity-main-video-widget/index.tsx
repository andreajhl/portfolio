import { celebrityType } from "desktop-app/types/celebrityType";
import OptimizedImage from "../../common/helpers/optimized-image";
import classes from "classnames";
import styles from "./styles.module.scss";
import useVideoPlayer from "react-app/src/utils/useVideoPlayer";
import { AnimatedPopup } from "desktop-app/components/common/animated-popup";

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
  return (
    <div
      className={classes(styles.CelebrityMainVideoWidget, className)}
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
    </div>
  );
}

export { CelebrityMainVideoWidget };
