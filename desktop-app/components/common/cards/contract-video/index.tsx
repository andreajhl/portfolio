import { CSSProperties } from "react";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ContractVideoType } from "desktop-app/types/contractVideoType";
import useVideoPlayer from "react-app/src/utils/useVideoPlayer";
import useLoad from "react-app/src/utils/useLoad";
import OverlayHeader from "../video/overlay-header";
import OverlayDetails from "../video/overlay-details";
import { toggleAudio } from "react-app/src/state/ducks/celebrity-sections/actions";
import { RootState } from "react-app/src/state/store";
import { connect, ConnectedProps } from "react-redux";
import { useContractLike } from "lib/hooks/useContractLike";
import useTrackContractVideoView from "lib/hooks/useTrackContractVideoView";

const mapStateToProps = ({ celebritySections }: RootState) => ({
  isAudioActive: celebritySections.audioReducer.active,
});

const mapDispatchToProps = { toggleAudio };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ContractVideoProps = {
  className?: string;
  style?: CSSProperties;
  contract_reference;
} & ContractVideoType &
  PropsFromRedux;

function ContractVideo({
  videoUrl,
  videoPosterUrl,
  occasion,
  contract_reference,
  isAudioActive,
  toggleAudio,
}: ContractVideoProps) {
  const { isFavorite, toggleFavorite } = useContractLike(contract_reference);
  const videoKey = `contract-video-${videoUrl}`;
  const { videoRef, videoIsPlaying, togglePlay } = useVideoPlayer(videoKey);
  const [videoIsLoaded, onVideoLoadedData] = useLoad(videoRef);

  const trackView = useTrackContractVideoView({
    widget: "ContractVideo",
    occasion,
    contractReference: contract_reference,
    videoUrl,
  });

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
            />
          </Maybe>
          <video
            muted={!isAudioActive}
            ref={videoRef}
            onLoadedData={onVideoLoadedData}
            src={videoUrl}
            preload="none"
            className={styles.VideoElement}
            onTimeUpdate={trackView}
          />
        </section>
        <section className={styles.ContractVideoOverlay}>
          <div className={styles.ContractVideoControls}>
            <OverlayHeader
              IsMuted={!isAudioActive}
              isPlaying={videoIsPlaying}
              onToggleAudio={toggleAudio}
              onTogglePlay={togglePlay}
            />
          </div>
          <OverlayDetails
            displayLikeButton={contract_reference}
            isLiked={isFavorite}
            ocassion={occasion}
            onLikevideo={toggleFavorite}
          />
        </section>
      </div>
    </div>
  );
}

const _ContractVideo = connector(ContractVideo);

export { _ContractVideo as ContractVideo };
