import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import { setPlayingVideo } from "../../../state/ducks/celebrity-sections/actions";
import { connect } from "react-redux";
import * as GTM from "../../../state/utils/gtm";
import hasDesiredAspectRatio from "../../../utils/hasDesiredAspectRatio";

const VideoCardLayout = ({
  celebrityId,
  celebrityAvatar,
  celebrityUsername,
  celebrityFullName,
  videoOccasion,
  videoUrl,
  videoPosterUrl,
  videoKey,
  footerSection,
  currentVideoKey,
  setPlayingVideo
}) => {
  const videoRef = useRef();
  const imageRef = useRef();
  const [videoIsLoaded, setVideoIsLoaded] = useState(false);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [posterIsLoaded, setPosterIsLoaded] = useState(false);
  const [
    shouldUseMediaAlternativeStyles,
    setShouldUseMediaAlternativeStyles
  ] = useState(false);

  const analyticsData = {
    widget: "VideoCardLayout",
    path: window.location.pathname,
    celebrityId,
    celebrityUsername,
    celebrityFullName,
    videoOccasion,
    videoUrl,
    videoPosterUrl,
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

  useEffect(() => {
    if (!posterIsLoaded) return;
    setShouldUseMediaAlternativeStyles(
      !hasDesiredAspectRatio(imageRef.current, "16:9")
    );
  }, [posterIsLoaded]);

  const registerVideoCardHover = () =>
    GTM.tagManagerDataLayer("HOVER_VIDEO_CARD", analyticsData);

  const registerCelebrityUsernameClick = () =>
    GTM.tagManagerDataLayer("CLICK_VIDEO_CARD_CELEBRITY_NAME", analyticsData);

  const registerCelebrityUsernameHover = () =>
    GTM.tagManagerDataLayer("HOVER_VIDEO_CARD_CELEBRITY_NAME", analyticsData);

  return (
    <div className="VideoCardLayout" onMouseOver={registerVideoCardHover}>
      <div className="video-card">
        <section
          className={`video-card__media ${
            shouldUseMediaAlternativeStyles
              ? "video-card__media-alternative"
              : ""
          }`}
        >
          {!videoIsLoaded ? (
            <img
              className="video-card__poster"
              src={videoPosterUrl || "/assets/img/avatar-blank.png"}
              alt={`Poster de vídeo de ${celebrityFullName}`}
              onClick={playVideo}
              ref={imageRef}
              onLoad={() => setPosterIsLoaded(true)}
            />
          ) : null}
          <video
            className="video-card__video"
            style={{ opacity: videoIsLoaded ? 1 : 0 }}
            src={videoUrl}
            preload="none"
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
            {videoOccasion ? (
              <span className="video-card__category d-flex align-items-center">
                {videoOccasion}
              </span>
            ) : null}
          </header>
          <footer className="d-flex align-items-center px-2 video-card__footer">
            <NavLink
              className="d-flex align-items-center video-card__celebrity-profile-link"
              to={celebrityUsername}
              onClick={registerCelebrityUsernameClick}
              onMouseOver={registerCelebrityUsernameHover}
            >
              {footerSection || (
                <>
                  <img
                    className="video-card__celebrity-photo"
                    src={celebrityAvatar || "/assets/img/avatar-blank.png"}
                    alt={`Foto de Perfil de ${celebrityFullName || "famoso"}`}
                  />
                  <h3 className="video-card__celebrity-full-name">
                    {celebrityFullName}
                  </h3>
                </>
              )}
            </NavLink>
            <CelebrityFavoriteButton
              celebrityId={celebrityId}
              className="ml-auto"
            />
          </footer>
        </section>
      </div>
    </div>
  );
};

VideoCardLayout.defaultProps = {
  celebrity: {},
  celebrityAvatar: null,
  videoOccasion: null,
  videoPosterUrl: null,
  linkPath: null
};

VideoCardLayout.propTypes = {
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

const _VideoCardLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoCardLayout);

export { _VideoCardLayout as VideoCardLayout };
