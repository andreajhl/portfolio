import React from "react";

const VideoShimmerCardLayout = () => {
  return (
    <div className="VideoShimmerCardLayout">
      <div className="video-shimmer-card">
        <header className="text-right">
          <span className="video-shimmer-card__category">
            <span className="video-shimmer-card__category-icon" />
          </span>
        </header>
        <footer className="d-flex align-items-center px-2">
          <div className="video-shimmer-card__celebrity-photo" />
          <div className="video-shimmer-card__celebrity-full-name">
            <div className="line mb-1 line-one"></div>
            <div className="line line-two"></div>
          </div>
          <img src="/assets/img/outlined-heart.svg" />
        </footer>
      </div>
    </div>
  );
};

export { VideoShimmerCardLayout };
