import React, { useRef, useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import fullscreen from "fscreen";
import * as GTM from "../../../state/utils/gtm";
import "./styles.scss";

const VideoSlideLayout = ({
  videoUrl,
  videoReference,
  autoPlayOnCanPlay,
  videoIsMuted,
  setVideoIsMuted,
  autoPlayVideo,
  setPlayingVideo,
  currentVideoPlaying
}) => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [videoIsFullscreen, setVideoIsFullscreen] = useState(false);
  const videoRef = useRef();
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

  const playVideo = useCallback(() => {
    videoRef.current.play();
    setVideoIsPlaying(true);
    setPlayingVideo({ contract_reference: videoReference });
  }, [setPlayingVideo, videoReference]);

  const pauseVideo = useCallback(() => {
    videoRef.current.pause();
    setVideoIsPlaying(false);
  }, []);

  const togglePlay = () => {
    if (!videoIsPlaying) {
      GTM.tagManagerDataLayer("PLAY_VIDEO_SLIDE", {
        ...analyticsData,
        videoIsPlaying: true
      });
      playVideo();
    } else {
      GTM.tagManagerDataLayer("PAUSE_VIDEO_SLIDE", {
        ...analyticsData,
        videoIsPlaying: false
      });
      pauseVideo();
    }
  };

  useEffect(() => {
    if (currentVideoPlaying !== videoReference) pauseVideo();
    return () => {
      if (currentVideoPlaying === videoReference)
        setPlayingVideo({ contract_reference: null });
    };
  }, [currentVideoPlaying, videoReference, pauseVideo, setPlayingVideo]);

  const autoPlayMainVideo = (event) => {
    if (!autoPlayOnCanPlay) return;
    playVideoWhenHasGoodConnection();
  };

  const playVideoWhenHasGoodConnection = useCallback(() => {
    const userHasGoodInternet = navigator?.connection?.effectiveType === "4g";

    if (userHasGoodInternet) {
      playVideo();
    }
  }, [playVideo]);

  useEffect(() => {
    if (!autoPlayVideo) return;
    playVideoWhenHasGoodConnection();
  }, [autoPlayVideo, playVideoWhenHasGoodConnection]);

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
              videoIsPlaying ? "pause" : "play"
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
      <video
        className="VideoSlideLayout__video"
        ref={videoRef}
        controls={false}
        playsInline
        onClick={togglePlay}
        preload="metadata"
        muted={videoIsMuted}
        onCanPlay={autoPlayMainVideo}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

VideoSlideLayout.defaultProps = {
  isMutedDefault: true,
  autoPlay: true
};

const mapStateToProps = ({ contracts }) => ({
  currentVideoPlaying: contracts.playVideoReducer.contract_reference
});

// mapStateToProps
const mapDispatchToProps = {
  setPlayingVideo: contractOperations.playVideo
};

const _VideoSlideLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoSlideLayout);

export { _VideoSlideLayout as VideoSlideLayout };
