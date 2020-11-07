import React from "react";
import "./styles.scss";
import { NavLink } from "react-router-dom";

const VideoCardLayout = ({ celebrity }) => {
  return (
    <div className="VideoCardLayout">
      <NavLink
        to={celebrity.username}
        className="video-card"
        style={{
          background: `linear-gradient(0deg, #292929 0%, rgba(126, 126, 126, 0) 100%), url(${
            celebrity.mainVideoPosterUrl ||
            celebrity.avatar ||
            "/assets/img/avatar-blank.png"
          }) center`
        }}
      >
        <header className="text-right">
          <span className="video-card__category">
            <i className="fa fa-gift video-card__category-icon" />
            {celebrity.title}
          </span>
        </header>
        <footer className="d-flex align-items-center px-2">
          <img
            className="video-card__celebrity-photo"
            src={celebrity.avatar || "/assets/img/avatar-blank.png"}
          />
          <h3 className="video-card__celebrity-full-name">
            {celebrity.fullName}
          </h3>
          <img src="/assets/img/outlined-heart.svg" />
        </footer>
      </NavLink>
    </div>
  );
};

VideoCardLayout.defaultProps = {
  celebrity: {}
};

export { VideoCardLayout };
