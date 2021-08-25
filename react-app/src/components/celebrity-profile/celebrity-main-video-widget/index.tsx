import { celebrityType } from "desktop-app/types/celebrityType";
import OptimizedImage from "../../common/helpers/optimized-image";
import classes from "classnames";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useState } from "react";
import { usePreloadVideo } from "lib/hooks/usePreloadVideo";
import { ProgressCircle } from "desktop-app/components/common/progress-circle";
import { MainVideoWidgetSlideshow } from "../main-video-widget-slideshow";

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
  const [carouselIsOpen, setCarouselIsOpen] = useState(false);
  const [animationIsFinished, setAnimationIsFinished] = useState(false);

  const mainVideoIsReady = usePreloadVideo(celebrity.mainVideo);
  const hasMainVideo = Boolean(celebrity.mainVideo);

  function toggleCarouselIsOpen() {
    setCarouselIsOpen((carouselIsOpen) => !carouselIsOpen);
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
      onClick={toggleCarouselIsOpen}
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
    <>
      {celebrityAvatar}
      <Maybe it={hasMainVideo && carouselIsOpen}>
        <MainVideoWidgetSlideshow
          celebrity={celebrity}
          onFullscreenExit={toggleCarouselIsOpen}
        />
      </Maybe>
    </>
  );
}

export { CelebrityMainVideoWidget };
