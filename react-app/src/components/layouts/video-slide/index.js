import React, { useRef, useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import fullscreen from "fscreen";
import "./styles.scss";

const VideoSlideLayout = ({
  videoUrl,
  videoReference,
  isMutedDefault,
  autoPlayOnCanPlay,
  autoPlayVideo,
  playVideo,
  currentVideoPlaying
}) => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [videoIsMuted, setVideoIsMuted] = useState(isMutedDefault);
  const [videoIsFullscreen, setVideoIsFullscreen] = useState(false);
  const videoRef = useRef();
  const sectionRef = useRef();

  const toggleVideoIsMuted = () =>
    setVideoIsMuted((videoIsMuted) => !videoIsMuted);

  const playContractVideo = () => {
    videoRef.current.play();
    setVideoIsPlaying(true);
  };

  const pauseContractVideo = () => {
    setVideoIsPlaying(false);
    videoRef.current.pause();
  };

  const togglePlay = () => {
    if (!videoIsPlaying) {
      playVideo({
        contract_reference: videoReference
      });
    } else {
      playVideo({
        contract_reference: null
      });
    }
  };

  useEffect(() => {
    if (currentVideoPlaying === videoReference) {
      playContractVideo();
    } else {
      pauseContractVideo();
    }
  }, [currentVideoPlaying, videoReference]);

  const autoPlayMainVideo = (event) => {
    if (!autoPlayOnCanPlay) return;
    playVideoWhenHasGoodConnection();
  };

  const playVideoWhenHasGoodConnection = useCallback(() => {
    const userHasGoodInternet = navigator?.connection?.effectiveType === "4g";

    if (userHasGoodInternet) {
      playVideo({
        contract_reference: videoReference
      });
    }
  }, [playVideo, videoReference]);

  useEffect(() => {
    if (!autoPlayVideo) return;
    playVideoWhenHasGoodConnection();
  }, [autoPlayVideo, playVideoWhenHasGoodConnection]);

  const toggleFullscreen = () => {
    const sectionElement = sectionRef.current;
    if (fullscreen.fullscreenElement === sectionElement) {
      setVideoIsFullscreen(false);
      fullscreen.exitFullscreen();
    } else {
      setVideoIsFullscreen(true);
      fullscreen.requestFullscreen(sectionElement);
    }
  };

  return (
    <section className="VideoSlideLayout" ref={sectionRef}>
      <div className="VideoSlideLayout__buttons">
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
  playVideo: contractOperations.playVideo
};

const _VideoSlideLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoSlideLayout);

export { _VideoSlideLayout as VideoSlideLayout };
