import React, { useEffect, useState } from "react";
import useLoad from "../../../utils/useLoad";
import useVideoPlayer from "../../../utils/useVideoPlayer";
import * as GTM from "../../../state/utils/gtm";

const CelebrityMainVideoSection = ({ mainVideoUrl, videoPosterUrl }) => {
  const [IsFinished, setIsFinished] = useState(false);
  const mainVideoReference = "mainVideo " + mainVideoUrl;
  const [videoIsLoaded, onVideoLoadedData] = useLoad();
  const analyticsData = {
    widget: "CelebrityMainVideoSection",
    path: window.location.pathname,
    videoIsLoaded,
    mainVideoUrl
  };
  const { videoRef, playVideo, togglePlay } = useVideoPlayer(
    mainVideoReference,
    {
      onPlayVideo() {
        GTM.tagManagerDataLayer("PLAY_MAIN_VIDEO_SECTION", {
          ...analyticsData,
          videoIsPlaying: true
        });
      },
      onPauseVideo() {
        GTM.tagManagerDataLayer("PAUSE_MAIN_VIDEO_SECTION", {
          ...analyticsData,
          videoIsPlaying: false
        });
      }
    }
  );
  const [videoIsMuted, setVideoIsMuted] = useState(true);

  const toggleVideoIsMuted = () =>
    setVideoIsMuted((videoIsMuted) => !videoIsMuted);

  // const autoPlayMainVideo = (event) => {
  //   const userHasGoodInternet = navigator?.connection?.effectiveType === "4g";

  //   if (userHasGoodInternet) {
  //     playVideo({
  //       contract_reference: mainVideoReference
  //     });
  //   }
  // };

  useEffect(() => {
    if (!videoIsLoaded) return;
    playVideo();
  }, [videoIsLoaded]);

  const showRestartButton = () => {
    setIsFinished(true);
    togglePlay();
  };

  const hideRestartButton = () => {
    const { currentTime, duration } = videoRef.current;
    if (currentTime >= duration || IsFinished === false) return;
    setIsFinished(false);
  };

  return (
    <section className="CelebrityMainVideoSection container p-0">
      <div
        className={`CelebrityMainVideoSection__buttons ${
          IsFinished ? "h-100" : ""
        }`}
      >
        {IsFinished ? (
          <i
            className={`fa fa-undo-alt restart-icon cursor-pointer`}
            onClick={togglePlay}
          />
        ) : null}
        <i
          className={`fa fa-volume-${
            videoIsMuted ? "mute" : "up"
          } volume-icon cursor-pointer`}
          onClick={toggleVideoIsMuted}
        />
      </div>
      <div className="CelebrityMainVideoSection__media-container">
        {!videoIsLoaded ? (
          <img
            className="CelebrityMainVideoSection__poster"
            src={videoPosterUrl || "/assets/img/avatar-blank.png"}
            alt={`Poster de vídeo de famoso`}
            onClick={playVideo}
          />
        ) : null}
        <video
          className="CelebrityMainVideoSection__video"
          ref={videoRef}
          controls={false}
          playsInline
          onClick={togglePlay}
          preload="metadata"
          src={mainVideoUrl}
          muted={videoIsMuted}
          autoPlay
          onEnded={showRestartButton}
          onTimeUpdate={hideRestartButton}
          onLoadedData={onVideoLoadedData}
        ></video>
      </div>
    </section>
  );
};

export { CelebrityMainVideoSection };
