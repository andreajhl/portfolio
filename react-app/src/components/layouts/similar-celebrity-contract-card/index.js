import React, { useState, useRef, useEffect } from "react";
import "./styles.scss";
import { contractOperations } from "../../../state/ducks/contracts";
import { ProfilePicture } from "../profile-picture";
import { CountryFlag } from "../../containers/celebrity-country-flag";
import { connect } from "react-redux";
import * as GTM from "../../../state/utils/gtm";

const SimilarCelebrityContractCardLayout = ({
  similarContract,
  currentVideoPlaying,
  playVideo
}) => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const videoRef = useRef();

  const analyticsData = {
    ...similarContract,
    widget: "SimilarCelebrityContractCardLayout",
    path: window.location.pathname
  };

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
      GTM.tagManagerDataLayer("PLAY_SIMILAR_CELEBRITY_CONTRACT_CARD", {
        ...analyticsData,
        videoIsPlaying: true
      });
      playVideo({
        contract_reference: similarContract.contractReference
      });
    } else {
      GTM.tagManagerDataLayer("PAUSE_SIMILAR_CELEBRITY_CONTRACT_CARD", {
        ...analyticsData,
        videoIsPlaying: false
      });
      playVideo({
        contract_reference: null
      });
    }
  };

  useEffect(() => {
    if (currentVideoPlaying === similarContract.contractReference) {
      playContractVideo();
    } else {
      pauseContractVideo();
    }
  }, [currentVideoPlaying, similarContract.contractReference]);

  const registerSimilarCelebrityContractCardHover = () => {
    GTM.tagManagerDataLayer(
      "HOVER_SIMILAR_CELEBRITY_CONTRACT_CARD",
      analyticsData
    );
  };

  return (
    <div
      className="SimilarCelebrityContractCardLayout mr-2 card f-card f-rounded hover cursor-pointer"
      onMouseOver={registerSimilarCelebrityContractCardHover}
    >
      <div className="video">
        <video
          ref={videoRef}
          poster={similarContract.contractPosterUrl}
          controls={false}
          playsInline
          preload="metadata"
          src={similarContract.contractMediaUrl + "#t=0.5"}
        />
      </div>
      <div className="body px-3 py-3 justify-content-between d-flex align-items-center">
        <ProfilePicture avatar={similarContract.celebrityAvatar} width="44px" />
        <div
          className="SimilarCelebrityContractCardLayout__info"
          onClick={() => {}}
        >
          <h5 className="text-with-ellipsis SimilarCelebrityContractCardLayout__celebrity-name mb-0">
            {similarContract.celebrityFullName}
          </h5>
          <div className="d-flex align-items-center">
            <CountryFlag countryCode={similarContract.countryCode} />
            <span className="ml-3 mt-1 CelebrityDetails__category">
              {similarContract.categoryTitle}
            </span>
          </div>
          <h6 className="text-with-ellipsis SimilarCelebrityContractCardLayout__delivery-to mb-0">
            Para: {similarContract.contractDeliveryTo}
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
