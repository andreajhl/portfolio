import { CSSProperties, useEffect } from "react";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ContractVideoType } from "desktop-app/types/contractVideoType";
import { useState } from "react";
import useVideoPlayer from "react-app/src/utils/useVideoPlayer";
import useLoad from "react-app/src/utils/useLoad";
import OverlayHeader from "../video/overlay-header";
import OverlayDetails from "../video/overlay-details";
import { saveContractLike } from "react-app/src/state/ducks/account/actions";
import { fetchStatusContractLike } from "react-app/src/state/ducks/hiring/actions";
import { useAuth0 } from "@auth0/auth0-react";

type ContractVideoProps = {
  className?: string;
  style?: CSSProperties;
  contract_reference;
} & ContractVideoType;

function ContractVideo({
  videoUrl,
  videoPosterUrl,
  occasion,
  style,
  className = "",
  contract_reference,
}: ContractVideoProps) {
  // TODO: agregar initial state response de backend
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthenticated } = useAuth0();
  const videoKey = `contract-video-${videoUrl}`;
  useEffect(() => {
    if (!isAuthenticated || !contract_reference) return;
    fetchStatusContractLike(contract_reference).then((res) => {
      if (res.markedByMe) setIsLiked(true);
    });
  }, [isAuthenticated, contract_reference]);

  const { videoRef, videoIsPlaying, togglePlay } = useVideoPlayer(videoKey, {
    onPlayVideo() {
      // TODO: conectar GTM
      console.log("onPlayVideo()");
      // GTM.tagManagerDataLayer("PLAY_MAIN_VIDEO_SECTION", {
      //   ...analyticsData,
      //   videoIsPlaying: true
      // });
    },
    onPauseVideo() {
      // TODO: conectar GTM
      console.log("onPauseVideo()");
      // GTM.tagManagerDataLayer("PAUSE_MAIN_VIDEO_SECTION", {
      //   ...analyticsData,
      //   videoIsPlaying: false
      // });
    },
  });
  const [videoIsLoaded, onVideoLoadedData] = useLoad(videoRef);
  const [videoIsMuted, setVideoIsMuted] = useState(true);
  const toggleVideoIsMuted = () => {
    setVideoIsMuted((videoIsMuted) => !videoIsMuted);
  };
  const toggleLikeContract = () => {
    saveContractLike(contract_reference).then((response) => {
      setIsLiked(response.liked);
    });
  };

  return (
    <div
      className={styles.ContractVideo}
      onMouseEnter={!videoIsPlaying ? togglePlay : undefined}
      onMouseLeave={videoIsPlaying ? togglePlay : undefined}
    >
      <div className={styles.ContractVideoMedia}>
        <section onClick={togglePlay} className={styles.ContractVideoPlayer}>
          <Maybe it={!videoIsLoaded}>
            <img
              src={videoPosterUrl}
              alt={`Poster de vídeo de famoso`}
              className={styles.VideoPoster}
            ></img>
          </Maybe>
          <video
            muted={videoIsMuted}
            ref={videoRef}
            onLoadedData={onVideoLoadedData}
            src={videoUrl}
            preload="none"
            className={styles.VideoElement}
          ></video>
        </section>
        <section className={styles.ContractVideoOverlay}>
          <div className={styles.ContractVideoControls}>
            <OverlayHeader
              IsMuted={videoIsMuted}
              isPlaying={videoIsPlaying}
              onToggleAudio={toggleVideoIsMuted}
              onTogglePlay={togglePlay}
            />
          </div>
          <OverlayDetails
            displayLikeButton={contract_reference}
            isLiked={isLiked}
            ocassion={occasion}
            onLikevideo={toggleLikeContract}
          />
        </section>
      </div>
    </div>
  );
}

export default ContractVideo;
