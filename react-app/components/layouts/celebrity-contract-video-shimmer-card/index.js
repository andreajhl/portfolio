import React from "react";

const CelebrityContractVideoShimmerCardLayout = () => {
  return (
    <div className="CelebrityContractVideoShimmerCardLayout">
      <div className="video-section"></div>
      <div className="body px-4 py-3 justify-content-between d-flex">
        <div className="title">
          <div className="line w-25 mr-2"></div>
          <div className="line w-75"></div>
        </div>
        <i className="fa play-pause fa-play"></i>
      </div>
    </div>
  );
};

export { CelebrityContractVideoShimmerCardLayout };
