import React, { useEffect } from "react";
import * as GTM from "../../../state/utils/gtm";
import useLoad from "../../../utils/useLoad";
import useVideoPlayer from "../../../utils/useVideoPlayer";
import "./styles.scss";

const VideoSlideLayout = ({
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
  classNameVideoSlideButtons
}) => {
  const analyticsData = {
    widget: "VideoSlideLayout",
    path: window.location.pathname,
    videoUrl,
    videoReference,
    videoIsFullscreen,
    videoIsMuted,
    slideshowIsPlaying
  };
  const [videoIsLoaded, onVideoLoadedData] = useLoad();
  const { videoRef, videoIsPlaying, playVideo, togglePlay } = useVideoPlayer(
    videoReference,
    {
      onPlayVideo() {
        GTM.tagManagerDataLayer("PLAY_VIDEO_SLIDE", {
          ...analyticsData,
          videoIsPlaying: true
        });
        setSlideshowIsPlaying(true);
      },
      onPauseVideo() {
        GTM.tagManagerDataLayer("PAUSE_VIDEO_SLIDE", {
          ...analyticsData,
          videoIsPlaying: false
        });
        setSlideshowIsPlaying(false);
      }
    }
  );

  const toggleVideoIsMuted = () => {
    GTM.tagManagerDataLayer(`${videoIsMuted ? "UN" : ""}MUTE_VIDEO_SLIDE`, {
      ...analyticsData,
      videoIsMuted: !videoIsMuted
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

  return (
    <section className='VideoSlideLayout'>
      <div
        className={`VideoSlideLayout__buttons  ${
          classNameVideoSlideButtons ? classNameVideoSlideButtons : ''
        }`}
      >
        <div className={`d-flex align-items-center justify-content-end`}>
          <i
            className={`fa fa-2x fa-volume-${
              videoIsMuted ? 'mute' : 'up'
            } volume-icon cursor-pointer`}
            onClick={toggleVideoIsMuted}
          />
          <i
            className={`fa fa-${
              videoIsPlaying || slideshowIsPlaying ? 'pause' : 'play'
            } play-pause cursor-pointer`}
            onClick={togglePlay}
          />
          {showFullscreenToggler ? (
            <i
              className={`fa fa-${
                videoIsFullscreen ? 'compress' : 'expand'
              } fullscreen-icon cursor-pointer`}
              onClick={toggleFullscreen}
            />
          ) : null}
        </div>
      </div>
      <div className='VideoSlideLayout__media-container'>
        {shouldLoadPoster && preload === 'none' && !videoIsLoaded ? (
          <img
            className='VideoSlideLayout__poster'
            src={videoPosterUrl || '/assets/img/avatar-blank.png'}
            alt={`Poster de vídeo de famoso`}
            onClick={togglePlay}
          />
        ) : null}
        <video
          className='VideoSlideLayout__video'
          ref={videoRef}
          controls={false}
          playsInline
          onClick={togglePlay}
          preload={preload}
          muted={videoIsMuted}
          src={videoUrl}
          onLoadedData={onVideoLoadedData}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

VideoSlideLayout.defaultProps = {
  shouldLoadPoster: true,
  videoIsMuted: true,
  setVideoIsMuted: () => {},
  autoPlayVideo: false,
  setIsPlayingVideo: () => {},
  isPlayingVideo: false,
  preload: "none",
  classNameVideoSlideButtons: ""
};

export { VideoSlideLayout };
