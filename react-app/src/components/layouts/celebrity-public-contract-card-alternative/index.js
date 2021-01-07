import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import { setPlayingVideo } from "../../../state/ducks/celebrity-sections/actions";
import { connect } from "react-redux";
import * as GTM from "../../../state/utils/gtm";
import hasDesiredAspectRatio from "../../../utils/hasDesiredAspectRatio";
import { HIRING_PREVIEW } from "../../../routing/Paths";

const CelebrityPublicContractCardAlternativeLayout = ({
  publicContract,
  videoKey,
  currentVideoKey,
  setPlayingVideo
}) => {
  const videoRef = useRef();
  const [videoIsLoaded, setVideoIsLoaded] = useState(false);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  // const imageRef = useRef();
  /* const [posterIsLoaded, setPosterIsLoaded] = useState(false);
  const [
    shouldUseMediaAlternativeStyles,
    setShouldUseMediaAlternativeStyles
  ] = useState(false); */

  const analyticsData = {
    widget: "CelebrityPublicContractCardAlternativeLayout",
    path: window.location.pathname,
    ...publicContract,
    videoKey
  };

  const playVideo = () => {
    videoRef.current.play();
    setVideoIsPlaying(true);
    setPlayingVideo(videoKey);
  };

  const pauseVideo = () => {
    videoRef.current.pause();
    setVideoIsPlaying(false);
    setPlayingVideo(null);
  };

  const togglePlay = () => {
    if (!videoIsPlaying) {
      GTM.tagManagerDataLayer("PAUSE_VIDEO_CARD", analyticsData);
      playVideo();
    } else {
      GTM.tagManagerDataLayer("PLAY_VIDEO_CARD", analyticsData);
      pauseVideo();
    }
  };

  useEffect(() => {
    if (currentVideoKey && currentVideoKey !== videoKey) pauseVideo();
    return () => {
      if (currentVideoKey === videoKey) setPlayingVideo(null);
    };
  }, [currentVideoKey]);

  // useEffect(() => {
  //   if (!posterIsLoaded) return;
  //   setShouldUseMediaAlternativeStyles(
  //     !hasDesiredAspectRatio(imageRef.current, "16:9")
  //   );
  // }, [posterIsLoaded]);

  const registerVideoCardHover = () =>
    GTM.tagManagerDataLayer(
      "HOVER_CELEBRITY_PUBLIC_CONTRACT_CARD_ALTERNATIVE",
      analyticsData
    );

  const registerCelebrityUsernameClick = () =>
    GTM.tagManagerDataLayer(
      "CLICK_CELEBRITY_PUBLIC_CONTRACT_CARD_ALTERNATIVE_CELEBRITY_NAME",
      analyticsData
    );

  const registerCelebrityUsernameHover = () =>
    GTM.tagManagerDataLayer(
      "HOVER_CELEBRITY_PUBLIC_CONTRACT_CARD_ALTERNATIVE_CELEBRITY_NAME",
      analyticsData
    );

  return (
    <div
      className="CelebrityPublicContractCardAlternativeLayout"
      onMouseOver={registerVideoCardHover}
    >
      <div className="video-card">
        <section className={`video-card__media`}>
          <video
            className="video-card__video"
            src={publicContract.contract_media}
            preload="metadata"
            playsInline
            onClick={togglePlay}
            onLoadedData={() => setVideoIsLoaded(true)}
            ref={videoRef}
          />
        </section>
        <section className="video-card__overlay">
          <header className="d-flex justify-content-between align-items-center">
            <i
              className={`fa fa-2x text-white fa-${
                videoIsPlaying ? "pause" : "play"
              } ml-2 mt-2`}
              onClick={togglePlay}
            />
          </header>
          <footer className="d-flex align-items-center px-2 video-card__footer">
            <NavLink
              className="d-flex align-items-center video-card__celebrity-profile-link"
              to={HIRING_PREVIEW.replace(
                ":contract_reference",
                publicContract.contract_reference
              )}
              onClick={registerCelebrityUsernameClick}
              onMouseOver={registerCelebrityUsernameHover}
            >
              <h6 className="video-card__delivery-to text-with-ellipsis">
                Para: {publicContract.contract_delivery_to.toLowerCase()}
              </h6>
            </NavLink>
          </footer>
        </section>
      </div>
    </div>
  );
};

CelebrityPublicContractCardAlternativeLayout.defaultProps = {
  celebrity: {},
  celebrityAvatar: null,
  videoOccasion: null,
  videoPosterUrl: null,
  linkPath: null
};

CelebrityPublicContractCardAlternativeLayout.propTypes = {
  celebrityId: PropTypes.number.isRequired,
  celebrityAvatar: PropTypes.string,
  celebrityUsername: PropTypes.string.isRequired,
  celebrityFullName: PropTypes.string.isRequired,
  videoOccasion: PropTypes.string,
  videoUrl: PropTypes.string.isRequired,
  videoPosterUrl: PropTypes.string,
  videoKey: PropTypes.string.isRequired
};

const mapStateToProps = ({ celebritySections }) => ({
  currentVideoKey: celebritySections.playVideoReducer
});

const mapDispatchToProps = {
  setPlayingVideo
};

const _CelebrityPublicContractCardAlternativeLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityPublicContractCardAlternativeLayout);

export { _CelebrityPublicContractCardAlternativeLayout as CelebrityPublicContractCardAlternativeLayout };
