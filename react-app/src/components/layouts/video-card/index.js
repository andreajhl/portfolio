import React, { useState, useRef, useEffect } from "react";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import { setPlayingVideo } from "../../../state/ducks/celebrity-sections/actions";
import { connect } from "react-redux";

const VideoCardLayout = ({
  celebrity,
  videoKey,
  currentVideoKey,
  setPlayingVideo
}) => {
  const videoRef = useRef();
  const [videoIsLoaded, setVideoIsLoaded] = useState(false);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

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
      playVideo();
    } else {
      pauseVideo();
    }
  };

  useEffect(() => {
    if (currentVideoKey && currentVideoKey !== videoKey) pauseVideo();
    return () => {
      if (currentVideoKey === videoKey) setPlayingVideo(null);
    };
  }, [currentVideoKey]);

  return (
    <div className="VideoCardLayout">
      <div className="video-card">
        <section className="video-card__media">
          {!videoIsLoaded ? (
            <img
              className="video-card__poster"
              src={celebrity.videoPosterUrl || "/assets/img/avatar-blank.png"}
              alt={`Poster de vídeo de ${celebrity.fullName}`}
              onClick={playVideo}
            />
          ) : null}
          <video
            className="video-card__video"
            style={{ opacity: videoIsLoaded ? 1 : 0 }}
            src={celebrity.videoUrl}
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
            <span className="video-card__category d-flex align-items-center">
              {celebrity.occasion}
            </span>
          </header>
          <footer className="d-flex align-items-center px-2 video-card__footer">
            <NavLink
              className="d-flex align-items-center video-card__celebrity-profile-link"
              to={celebrity.username}
            >
              <img
                className="video-card__celebrity-photo"
                src={celebrity.avatar || "/assets/img/avatar-blank.png"}
              />
              <h3 className="video-card__celebrity-full-name">
                {celebrity.fullName}
              </h3>
            </NavLink>
            <CelebrityFavoriteButton
              celebrityId={celebrity.id}
              className="ml-auto"
            />
          </footer>
        </section>
      </div>
    </div>
  );
};

VideoCardLayout.defaultProps = {
  celebrity: {}
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
