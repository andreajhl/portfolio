import React, { useState, useRef, useEffect } from "react";
import "./styles.scss";
import { contractOperations } from "../../../state/ducks/contracts";
import { ProfilePicture } from "../../containers/profile-picture";
import { CountryFlag } from "../../containers/celebrity-country-flag";
import { connect } from "react-redux";

const SimilarCelebrityContractCardLayout = ({
  similarCelebrityContract,
  currentVideoPlaying,
  playVideo
}) => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const videoRef = useRef();

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
        contract_reference: similarCelebrityContract.reference
      });
    } else {
      playVideo({
        contract_reference: null
      });
    }
  };

  useEffect(() => {
    if (currentVideoPlaying === similarCelebrityContract.reference) {
      playContractVideo();
    } else {
      pauseContractVideo();
    }
  }, [currentVideoPlaying, similarCelebrityContract.reference, videoIsPlaying]);

  const getVideoPoster = (videoURL) => {
    const posterURL = videoURL.includes("watermark")
      ? videoURL.replace(".mp4", ".jpg").replace("watermark", "poster")
      : "";

    return (
      <video
        ref={videoRef}
        poster={posterURL}
        controls={false}
        playsInline
        preload="metadata"
        src={videoURL + "#t=0.5"}
      />
    );
  };

  return (
    <div className="CelebrityPublicContractCardLayout mr-2 card f-card f-rounded hover cursor-pointer">
      <div className="video">
        {getVideoPoster(
          similarCelebrityContract.videoUrl ||
            "https://dqb0851cl2gjs.cloudfront.net/main-videos/70/famosos-videos-personalizados-giuliomottola-crf-video-watermark480.mp4"
        )}
      </div>
      <div className="body px-3 py-3 justify-content-between d-flex align-items-center">
        <ProfilePicture
          avatar={similarCelebrityContract.celebrityData.avatar}
          width="44px"
        />
        <div
          className="CelebrityPublicContractCardLayout__info"
          onClick={() => {}}
        >
          <h5 className="text-with-ellipsis CelebrityPublicContractCardLayout__celebrity-name mb-0">
            {similarCelebrityContract.celebrityData.fullName}
          </h5>
          <div className="d-flex align-items-center">
            <CountryFlag
              countryCode={similarCelebrityContract.celebrityData.countryCode}
            />
            <span className="ml-3 mt-1 CelebrityDetails__category">
              {similarCelebrityContract.celebrityData.categoryTitle}
            </span>
          </div>
          <h6 className="text-with-ellipsis CelebrityPublicContractCardLayout__delivery-to mb-0">
            Para: {similarCelebrityContract.deliveryTo}
          </h6>
        </div>
        <i
          className={`fa fa-2x play-pause fa-${
            videoIsPlaying ? "pause" : "play"
          }`}
          onClick={togglePlay}
        />
      </div>
    </div>
  );
};

// Set defaultProps
SimilarCelebrityContractCardLayout.defaultProps = {
  similarCelebrityContract: {}
};

// mapStateToProps
const mapStateToProps = ({ contracts }) => ({
  currentVideoPlaying: contracts.playVideoReducer.contract_reference
});

// mapStateToProps
const mapDispatchToProps = {
  playVideo: contractOperations.playVideo
};

// Export Class
const _SimilarCelebrityContractCardLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimilarCelebrityContractCardLayout);
export { _SimilarCelebrityContractCardLayout as SimilarCelebrityContractCardLayout };
