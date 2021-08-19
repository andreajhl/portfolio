import React, { useEffect, useState } from "react";
import getWindow from "react-app/src/utils/getWindow";
import * as GTM from "../../../state/utils/gtm";
import useLoad from "../../../utils/useLoad";
import useVideoPlayer from "../../../utils/useVideoPlayer";
import classes from "classnames";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import { LikeButton } from "desktop-app/components/common/button/like";
import { useContractLike } from "lib/hooks/useContractLike";
import { ShareVideoButton } from "desktop-app/components/common/button/share-video";

function VideoSlideLayout({
  videoUrl,
  videoReference,
  shouldLoadPoster,
  videoIsMuted,
  setVideoIsMuted,
  autoPlayVideo,
  setSlideshowIsPlaying,
  slideshowIsPlaying,
  preload,
  videoPosterUrl,
  showFullscreenToggler,
  videoIsFullscreen,
  toggleFullscreen,
  classNameVideoSlideButtons,
  classNameSlideLayoutVideo,
  onEndVideo,
  shouldLoop,
  videoOverlayHeader,
  videoOverlayFooter,
  videoOccasion = "",
  contractReference = "",
}) {
  const { isFavorite, toggleFavorite } = useContractLike(contractReference);
  const analyticsData = {
    widget: "VideoSlideLayout",
    path: getWindow().location.pathname,
    videoUrl,
    videoReference,
    videoIsFullscreen,
    videoIsMuted,
    slideshowIsPlaying,
    isFavorite,
  };
  const { videoRef, videoIsPlaying, playVideo, togglePlay } = useVideoPlayer(
    videoReference,
    {
      onPlayVideo() {
        GTM.tagManagerDataLayer("PLAY_VIDEO_SLIDE", {
          ...analyticsData,
          videoIsPlaying: true,
        });
        setSlideshowIsPlaying(true);
      },
      onPauseVideo() {
        GTM.tagManagerDataLayer("PAUSE_VIDEO_SLIDE", {
          ...analyticsData,
          videoIsPlaying: false,
        });
        setSlideshowIsPlaying(false);
      },
    }
  );

  const [videoIsLoaded, onVideoLoadedData] = useLoad(videoRef);

  const toggleVideoIsMuted = () => {
    GTM.tagManagerDataLayer(`${videoIsMuted ? "UN" : ""}MUTE_VIDEO_SLIDE`, {
      ...analyticsData,
      videoIsMuted: !videoIsMuted,
    });
    setVideoIsMuted((videoIsMuted) => !videoIsMuted);
  };

  // const playVideoWhenHasGoodConnection = useCallback(() => {
  //   setIsPlayingVideo(true);
  //   playVideo();
  // }, [playVideo, setIsPlayingVideo]);
  useEffect(() => {
    if (!autoPlayVideo) return;
    setSlideshowIsPlaying(true);
    playVideo();
  }, [autoPlayVideo]);
  const handleEndVideo = () => {
    onEndVideo();
  };

  function FullscreenToggler({ className, ...props }) {
    return (
      <button
        type="button"
        className={classes("btn", styles.ActionButton, className)}
        onClick={toggleFullscreen}
        {...props}
      >
        <i
          className={classes(
            "fa fullscreen-icon cursor-pointer",
            videoIsFullscreen ? "fa-compress" : "fa-expand"
          )}
        />
      </button>
    );
  }

  function PlayToggler({ className, ...props }) {
    return (
      <button
        type="button"
        className={classes("btn", styles.ActionButton, className)}
        onClick={togglePlay}
        {...props}
      >
        <i
          className={classes(
            "fa",
            styles.TogglePlayIcon,
            videoIsPlaying || slideshowIsPlaying ? "fa-pause" : "fa-play"
          )}
        />
      </button>
    );
  }

  function MuteToggler({ className, ...props }) {
    return (
      <button
        type="button"
        className={classes("btn", styles.ActionButton, className)}
        onClick={toggleVideoIsMuted}
        {...props}
      >
        <i
          className={classes(
            `fa fa-volume-${videoIsMuted ? "mute" : "up"}`,
            styles.VolumenIcon
          )}
        />
      </button>
    );
  }

  function LikeToggler({ className, ...props }) {
    return (
      <button
        type="button"
        className={classes("btn", styles.ActionButton, className)}
        onClick={toggleFavorite}
        {...props}
      >
        <LikeButton
          isFavoriteClassName={styles.IsFavoriteIcon}
          className={styles.LikeButtonIcon}
          isFavorite={isFavorite}
        />
      </button>
    );
  }

  function ShareButton({ className, ...props }) {
    return (
      <ShareVideoButton
        buttonClassName={classes(
          "btn",
          styles.ActionButton,
          styles.ShareButton,
          className
        )}
        contractReference={contractReference}
        {...props}
      >
        <i className="fa fa-share-alt" />
      </ShareVideoButton>
    );
  }

  const components = {
    MuteToggler,
    PlayToggler,
    FullscreenToggler,
    LikeToggler,
    ShareButton,
  };

  const videoDetails = {
    occasion: videoOccasion,
    reference: contractReference,
  };

  return (
    <section className="VideoSlideLayout">
      <div
        className={classes(
          "VideoSlideLayout__overlay",
          classNameVideoSlideButtons
        )}
      >
        {videoOverlayHeader?.(components, videoDetails) || null}
        {videoOverlayFooter?.(components, videoDetails) || null}
      </div>
      <div className="VideoSlideLayout__media-container">
        {shouldLoadPoster && preload === "none" && !videoIsLoaded ? (
          <img
            className="VideoSlideLayout__poster"
            src={videoPosterUrl || "/assets/img/avatar-blank.png"}
            alt={`Poster de vídeo de famoso`}
            onClick={togglePlay}
          />
        ) : null}
        <video
          className={classes(
            "VideoSlideLayout__video",
            classNameSlideLayoutVideo
          )}
          ref={videoRef}
          controls={false}
          playsInline
          onClick={togglePlay}
          preload={preload}
          muted={videoIsMuted}
          src={videoUrl}
          onEnded={handleEndVideo}
          onLoadedData={onVideoLoadedData}
          loop={shouldLoop}
        >
          <FormattedMessage defaultMessage="Tu navegador no soporta la reproducción de video." />
        </video>
      </div>
    </section>
  );
}

VideoSlideLayout.defaultProps = {
  shouldLoadPoster: true,
  videoIsMuted: true,
  setVideoIsMuted: () => {},
  autoPlayVideo: false,
  setIsPlayingVideo: () => {},
  isPlayingVideo: false,
  preload: "none",
  classNameVideoSlideButtons: "",
  classNameSlideLayoutVideo: "",
  onEndVideo: () => {},
  shouldLoop: false,
};

export { VideoSlideLayout };
