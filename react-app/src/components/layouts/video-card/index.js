import React from "react";
import "./styles.scss";

const VideoCardLayout = () => {
  return (
    <div className="VideoCardLayout">
      <div className="video-card">
        <header className="text-right">
          <span className="video-card__category">
            <img src="/assets/img/gift.svg" className="mr-1" />
            Cumpleaños
          </span>
        </header>
        <footer className="d-flex align-items-center px-2">
          <img
            className="video-card__celebrity-photo"
            src="/assets/img/avatar-blank.png"
          />
          <h3 className="video-card__celebrity-full-name">Vanessa Guzmán</h3>
          <img src="/assets/img/filled-heart.svg" />
        </footer>
      </div>
    </div>
  );
};

export { VideoCardLayout };
