import React, { useRef, useState, useEffect } from "react";
import fullscreen from "fscreen";
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
  setIsPlayingVideo,
  isPlayingVideo,
  preload,
  videoPosterUrl
}) => {
  const [videoIsLoaded, onVideoLoadedData] = useLoad();
  const { videoRef, videoIsPlaying, playVideo, togglePlay } = useVideoPlayer(
    videoReference,
    {
      onPlayVideo() {
        GTM.tagManagerDataLayer("PLAY_VIDEO_SLIDE", {
          ...analyticsData,
          videoIsPlaying: true
        });
        setIsPlayingVideo(true);
      },
      onPauseVideo() {
        GTM.tagManagerDataLayer("PAUSE_VIDEO_SLIDE", {
          ...analyticsData,
          videoIsPlaying: false
        });
        setIsPlayingVideo(false);
      }
    }
  );

  const [videoIsFullscreen, setVideoIsFullscreen] = useState(false);
  const sectionRef = useRef();

  const analyticsData = {
    widget: "VideoSlideLayout",
    path: window.location.pathname,
    videoUrl,
    videoReference,
    videoIsFullscreen,
    videoIsMuted,
    videoIsPlaying
  };

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
    setIsPlayingVideo(true);
    playVideo();
  }, [autoPlayVideo]);

  const exitFullscreen = () => {
    setVideoIsFullscreen(false);
    fullscreen.exitFullscreen();
    GTM.tagManagerDataLayer("EXIT_FULLSCREEN_VIDEO_SLIDE", {
      ...analyticsData,
      videoIsFullscreen: false
    });
  };

  const enterFullscreen = (sectionElement) => {
    setVideoIsFullscreen(true);
    fullscreen.requestFullscreen(sectionElement);
    GTM.tagManagerDataLayer("ENTER_FULLSCREEN_VIDEO_SLIDE", {
      ...analyticsData,
      videoIsFullscreen: true
    });
  };

  const toggleFullscreen = () => {
    const sectionElement = sectionRef.current;
    if (fullscreen.fullscreenElement === sectionElement) {
      exitFullscreen();
    } else {
      enterFullscreen(sectionElement);
    }
  };

  return (
    <section className="VideoSlideLayout" ref={sectionRef}>
      <div className="VideoSlideLayout__buttons">
        <div className="d-flex align-items-center justify-content-end">
          <i
            className={`fa fa-2x fa-volume-${
              videoIsMuted ? "mute" : "up"
            } volume-icon cursor-pointer`}
            onClick={toggleVideoIsMuted}
          />
          <i
            className={`fa fa-${
              videoIsPlaying || isPlayingVideo ? "pause" : "play"
            } play-pause cursor-pointer`}
            onClick={togglePlay}
          />
          {fullscreen.fullscreenEnabled ? (
            <i
              className={`fa fa-${
                videoIsFullscreen ? "compress" : "expand"
              } fullscreen-icon cursor-pointer`}
              onClick={toggleFullscreen}
            />
          ) : null}
        </div>
      </div>
      <div className="VideoSlideLayout__media-container">
        {shouldLoadPoster && preload === "none" && !videoIsLoaded ? (
          <img
            className="VideoSlideLayout__poster"
            src={videoPosterUrl || "/assets/img/avatar-blank.png"}
            alt={`Poster de vídeo de famoso`}
            onClick={playVideo}
          />
        ) : null}
        <video
          className="VideoSlideLayout__video"
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
  preload: "none"
};

export { VideoSlideLayout };
