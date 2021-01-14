import React, { useState } from "react";
import useLoad from "../../../utils/useLoad";
import useVideoPlayer from "../../../utils/useVideoPlayer";
import * as GTM from "../../../state/utils/gtm";
import "./styles.scss";

const CelebrityMainVideoSection = ({ mainVideoUrl, videoPosterUrl }) => {
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

  return (
    <section className="CelebrityMainvVideoSection container p-0">
      <div className="CelebrityMainvVideoSection__buttons">
        <i
          className={`fa fa-volume-${
            videoIsMuted ? "mute" : "up"
          } volume-icon cursor-pointer`}
          onClick={toggleVideoIsMuted}
        />
      </div>
      <div className="CelebrityMainvVideoSection__media-container">
        {!videoIsLoaded ? (
          <img
            className="CelebrityMainvVideoSection__poster"
            src={videoPosterUrl || "/assets/img/avatar-blank.png"}
            alt={`Poster de vídeo de famoso`}
            onClick={playVideo}
          />
        ) : null}
        <video
          className="CelebrityMainvVideoSection__video"
          ref={videoRef}
          controls={false}
          playsInline
          onClick={togglePlay}
          preload="metadata"
          muted={videoIsMuted}
          src={mainVideoUrl}
          onLoadedData={onVideoLoadedData}
          // onCanPlay={autoPlayMainVideo}
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export { CelebrityMainVideoSection };
