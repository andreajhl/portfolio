import React, { useRef, useState, useEffect } from "react";
import { Resizable, ResizableBox } from "react-resizable";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import "./styles.scss";
import "react-resizable/css/styles.css";

const CelebrityMainvVideoSection = ({
  mainVideoUrl,
  playVideo,
  currentVideoPlaying
}) => {
  const mainVideoReference = "mainVideo " + mainVideoUrl;
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [videoIsMuted, setVideoIsMuted] = useState(true);
  const videoRef = useRef();

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
        contract_reference: mainVideoReference
      });
    } else {
      playVideo({
        contract_reference: null
      });
    }
  };

  useEffect(() => {
    if (currentVideoPlaying === mainVideoReference) {
      playContractVideo();
    } else {
      pauseContractVideo();
    }
  }, [currentVideoPlaying, mainVideoReference]);

  const autoPlayMainVideo = (event) => {
    const userHasGoodInternet = navigator?.connection?.effectiveType === "4g";

    // const videoIsVisible =
    //   getComputedStyle(
    //     event.target.closest(
    //       `.profile-${deviceType === "desktop" ? "lg" : "sm"}`
    //     )
    //   ).display !== "none";

    if (userHasGoodInternet) {
      playVideo({
        contract_reference: "mainVideo " + mainVideoUrl
      });
    }
  };

  const windowWidth = window.innerWidth;

  return mainVideoUrl ? (
    <ResizableBox
      width={windowWidth}
      height={252}
      minConstraints={[windowWidth, 252]}
      maxConstraints={[windowWidth, 445]}
      axis="y"
      handle={
        <img
          src="assets/img/resize-handle.svg"
          className="handle-icon cursor-pointer"
        />
      }
    >
      <section className="CelebrityMainvVideoSection">
        <div className="CelebrityMainvVideoSection__buttons">
          <i
            className={`fa fa-2x fa-volume-${
              videoIsMuted ? "mute" : "up"
            } volume-icon cursor-pointer`}
            onClick={toggleVideoIsMuted}
          />
        </div>
        <video
          className="CelebrityMainvVideoSection__video"
          ref={videoRef}
          controls={false}
          playsInline
          onClick={togglePlay}
          preload="metadata"
          muted={videoIsMuted}
          onCanPlay={autoPlayMainVideo}
        >
          <source src={mainVideoUrl + "#t=0.5"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </ResizableBox>
  ) : null;
};

const mapStateToProps = ({ contracts }) => ({
  currentVideoPlaying: contracts.playVideoReducer.contract_reference
});

// mapStateToProps
const mapDispatchToProps = {
  playVideo: contractOperations.playVideo
};

const _CelebrityMainvVideoSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityMainvVideoSection);

export { _CelebrityMainvVideoSection as CelebrityMainvVideoSection };
